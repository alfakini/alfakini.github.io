import { type CollectionEntry, getCollection } from 'astro:content';
import { defaultLocale, type Locale, locales } from '../i18n';
import { routeUrl } from '../i18n/routes';

export type Essay = CollectionEntry<'essays'>;
export type EssayTag = { name: string; slug: string; count: number };

export function essayIdentity(entry: Essay): { lang: Locale; slug: string } {
	const sourcePath = entry.filePath ?? entry.id;
	const segments = sourcePath.replace(/\.(md|mdx)$/, '').split('/');
	const filename = segments.at(-1);
	const groupedLocale = filename === 'pt' ? 'pt-BR' : locales.find((locale) => locale === filename);

	if (groupedLocale && segments.length > 1) {
		if (entry.data.locale !== groupedLocale) {
			throw new Error(`Language mismatch in ${entry.id}: filename and frontmatter disagree`);
		}

		return { lang: groupedLocale, slug: entry.data.slug };
	}

	return { lang: entry.data.locale, slug: entry.data.slug };
}

export function essayPath(entry: Essay): string {
	const { lang, slug } = essayIdentity(entry);
	return routeUrl(lang, 'essays', slug);
}

async function loadEssays(): Promise<Essay[]> {
	const entries = (await getCollection('essays')).filter(
		(entry) => !import.meta.env.PROD || entry.data.status === 'published',
	);
	assertEssayTranslations(entries);
	return entries;
}

export async function getEssays(lang: Locale = defaultLocale): Promise<Essay[]> {
	return [...groupEssays(await loadEssays()).values()]
		.map((entries) => selectEssay(entries, lang))
		.toSorted((a, b) => b.data.published_at.valueOf() - a.data.published_at.valueOf());
}

export async function getEssayLanguages(): Promise<Map<string, Essay[]>> {
	const languages = groupEssays(await loadEssays());

	for (const available of languages.values()) {
		available.sort((a, b) => locales.indexOf(essayIdentity(a).lang) - locales.indexOf(essayIdentity(b).lang));
	}

	return languages;
}

function groupEssays(entries: Essay[]): Map<string, Essay[]> {
	const groups = new Map<string, Essay[]>();

	for (const entry of entries) {
		const { slug } = essayIdentity(entry);
		groups.set(slug, [...(groups.get(slug) ?? []), entry]);
	}

	return groups;
}

function selectEssay(entries: Essay[], lang: Locale): Essay {
	return entries.find((entry) => essayIdentity(entry).lang === lang) ?? entries[0];
}

function assertEssayTranslations(entries: Essay[]): void {
	const variants = new Map<string, Essay[]>();

	for (const entry of entries) {
		const identity = essayIdentity(entry);
		const sourcePath = entry.filePath ?? entry.id;
		if (identity.lang === 'en' && !/(?:^|[/\\])en\.mdx?$/.test(sourcePath)) {
			throw new Error(`English essays must use a grouped filename: ${sourcePath}`);
		}
		variants.set(identity.slug, [...(variants.get(identity.slug) ?? []), entry]);
	}

	for (const [slug, entriesForSlug] of variants) {
		const portuguese = entriesForSlug.find((entry) => essayIdentity(entry).lang === 'pt-BR');
		const english = entriesForSlug.find((entry) => essayIdentity(entry).lang === 'en');
		if (
			entriesForSlug.length > 2 ||
			entriesForSlug.filter((entry) => essayIdentity(entry).lang === 'pt-BR').length > 1 ||
			entriesForSlug.filter((entry) => essayIdentity(entry).lang === 'en').length > 1
		) {
			throw new Error(`Duplicate translation for ${slug}`);
		}
		if (!portuguese || !english) continue;
		const portugueseTags = new Set(portuguese.data.tags);
		const englishTags = new Set(english.data.tags);
		if (portugueseTags.size !== englishTags.size || [...portugueseTags].some((tag) => !englishTags.has(tag))) {
			throw new Error(`Tag mismatch for ${slug}`);
		}
	}
}

export async function getEssayStaticPaths(lang: Locale) {
	const entries = await loadEssays();

	return [...groupEssays(entries).entries()].map(([slug, variants]) => ({
		params: { slug },
		props: { essay: selectEssay(variants, lang) },
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
