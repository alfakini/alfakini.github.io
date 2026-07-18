import { type CollectionEntry, getCollection } from 'astro:content';
import { defaultLocale, type Locale, locales } from './locale';

export type Essay = CollectionEntry<'essays'>;
export type EssayTag = { name: string; slug: string; count: number };

export function essayIdentity(entry: Essay): { lang: Locale; slug: string } {
	const segments = entry.id.replace(/\.(md|mdx)$/, '').split('/');
	const filename = segments.at(-1);
	const groupedLocale = locales.find((locale) => locale === filename);

	if (groupedLocale && segments.length > 1) {
		if (entry.data.lang && entry.data.lang !== groupedLocale) {
			throw new Error(`Language mismatch in ${entry.id}: filename and frontmatter disagree`);
		}

		return { lang: groupedLocale, slug: segments.slice(0, -1).join('/') };
	}

	return { lang: entry.data.lang ?? defaultLocale, slug: segments.join('/') };
}

export function essayPath(entry: Essay): string {
	const { lang, slug } = essayIdentity(entry);
	return lang === defaultLocale ? `/essays/${slug}/` : `/${lang}/essays/${slug}/`;
}

async function loadEssays(): Promise<Essay[]> {
	const entries = (await getCollection('essays')).filter(
		(entry) => !import.meta.env.PROD || entry.data.status === 'published',
	);
	assertUniqueEssayVariants(entries);
	return entries;
}

export async function getEssays(lang: Locale = defaultLocale): Promise<Essay[]> {
	return (await loadEssays())
		.filter((entry) => essayIdentity(entry).lang === lang)
		.toSorted((a, b) => b.data.published_at.valueOf() - a.data.published_at.valueOf());
}

export async function getEssayLanguages(): Promise<Map<string, Essay[]>> {
	const languages = new Map<string, Essay[]>();

	for (const entry of await loadEssays()) {
		const { slug } = essayIdentity(entry);
		languages.set(slug, [...(languages.get(slug) ?? []), entry]);
	}

	for (const available of languages.values()) {
		available.sort((a, b) => locales.indexOf(essayIdentity(a).lang) - locales.indexOf(essayIdentity(b).lang));
	}

	return languages;
}

function translationsFor(entry: Essay, entries: Essay[]): Essay[] {
	const { slug } = essayIdentity(entry);
	return entries
		.filter((candidate) => essayIdentity(candidate).slug === slug)
		.toSorted((a, b) => locales.indexOf(essayIdentity(a).lang) - locales.indexOf(essayIdentity(b).lang));
}

function assertUniqueEssayVariants(entries: Essay[]): void {
	const routes = new Map<string, string>();

	for (const entry of entries) {
		const path = essayPath(entry);
		const existing = routes.get(path);
		if (existing) {
			throw new Error(`Duplicate essay route ${path}: ${existing} and ${entry.id}`);
		}
		routes.set(path, entry.id);
	}
}

export async function getEssayStaticPaths(lang: Locale) {
	const entries = await loadEssays();

	return entries
		.filter((entry) => essayIdentity(entry).lang === lang)
		.map((essay) => ({
			params: { slug: essayIdentity(essay).slug },
			props: { essay, translations: translationsFor(essay, entries) },
		}));
}

export function tagSlug(tag: string): string {
	return tag
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function allTags(entries: Essay[]): EssayTag[] {
	const tags = new Map<string, { name: string; count: number }>();

	for (const entry of entries) {
		for (const name of entry.data.tags) {
			const slug = tagSlug(name);
			const current = tags.get(slug);
			if (current && current.name.toLocaleLowerCase('pt-BR') !== name.toLocaleLowerCase('pt-BR')) {
				throw new Error(`Tag slug collision for "${current.name}" and "${name}"`);
			}
			tags.set(slug, { name: current?.name ?? name, count: (current?.count ?? 0) + 1 });
		}
	}

	return [...tags.entries()]
		.map(([slug, value]) => ({ slug, ...value }))
		.toSorted((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
