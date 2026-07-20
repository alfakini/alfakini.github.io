import { type CollectionEntry, getCollection } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n';
import { routeUrl } from '../i18n/routes';

export type Project = CollectionEntry<'projects'>;

/** Grouped translations mirror the essay convention: pt.md, pt-BR.md, or en.md. */
export function projectIdentity(entry: Project): { lang: Locale; slug: string } {
	const segments = entry.id.split('/');
	const filename = segments.at(-1) ?? '';

	if (segments.length === 1) return { lang: defaultLocale, slug: filename };

	if (filename !== 'pt' && filename !== 'pt-BR' && filename !== 'en') {
		throw new Error(`Grouped projects must use pt.md, pt-BR.md, or en.md: ${entry.id}`);
	}

	return { lang: filename === 'en' ? 'en' : 'pt-BR', slug: segments.slice(0, -1).join('/') };
}

function groupProjects(entries: Project[]): Map<string, Project[]> {
	const groups = new Map<string, Project[]>();

	for (const entry of entries) {
		const { slug } = projectIdentity(entry);
		const variants = groups.get(slug);

		if (variants) variants.push(entry);
		else groups.set(slug, [entry]);
	}

	return groups;
}

function selectProject(entries: Project[], lang: Locale): Project {
	return entries.find((entry) => projectIdentity(entry).lang === lang) ?? entries[0];
}

function assertProjectTranslations(groups: Map<string, Project[]>): void {
	for (const [slug, variants] of groups) {
		const portuguese: Project[] = [];
		const english: Project[] = [];

		for (const entry of variants) {
			(projectIdentity(entry).lang === 'en' ? english : portuguese).push(entry);
		}

		if (portuguese.length !== 1 || english.length > 1) {
			throw new Error(`Invalid project translations for ${slug}`);
		}

		if (english.length > 0) {
			const [pt, en] = [portuguese[0], english[0]];
			if (
				pt.data.start_at !== en.data.start_at ||
				pt.data.end_at !== en.data.end_at ||
				pt.data.category !== en.data.category ||
				pt.data.tags.length !== en.data.tags.length ||
				pt.data.tags.some((tag) => !en.data.tags.includes(tag))
			) {
				throw new Error(`Project metadata mismatch for ${slug}`);
			}
		}
	}
}

/**
 * Grouping and validation are identical for every route, so both run once per
 * build instead of once per locale page.
 */
const projectGroups = (async () => {
	const groups = groupProjects(await getCollection('projects'));
	assertProjectTranslations(groups);

	return groups;
})();

function compareProjects(a: Project, b: Project): number {
	const startOrder = b.data.start_at.localeCompare(a.data.start_at);
	if (startOrder !== 0) return startOrder;

	return projectIdentity(a).slug.localeCompare(projectIdentity(b).slug);
}

export async function getProjects(lang: Locale = defaultLocale): Promise<Project[]> {
	const groups = await projectGroups;

	return [...groups.values()].map((variants) => selectProject(variants, lang)).toSorted(compareProjects);
}

export function projectPath(entry: Project, lang: Locale): string {
	return routeUrl(lang, 'projects', projectIdentity(entry).slug);
}

export async function getProjectStaticPaths(lang: Locale) {
	const groups = await projectGroups;

	return [...groups.entries()].map(([slug, variants]) => ({
		params: { slug },
		props: { project: selectProject(variants, lang) },
	}));
}

/** Projects read by year; the frontmatter keeps whatever precision it declared. */
export function projectYear(value: string): string {
	return value.slice(0, 4);
}

export function groupProjectsByYear(entries: Project[]): { year: string; projects: Project[] }[] {
	const years: { year: string; projects: Project[] }[] = [];

	for (const entry of entries) {
		const year = projectYear(entry.data.start_at);
		const current = years.at(-1);

		if (current?.year === year) current.projects.push(entry);
		else years.push({ year, projects: [entry] });
	}

	return years;
}
