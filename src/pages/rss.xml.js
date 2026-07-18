import rss from '@astrojs/rss';
import { SITE_DESCRIPTION_EN, SITE_TITLE } from '../consts';
import { essayPath, getEssayLanguages } from '../lib/essays';

export async function GET(context) {
	const translations = await getEssayLanguages();
	const essays = [...translations.values()]
		.map((entries) => {
			const published = entries.filter((entry) => entry.data.status === 'published');
			return (
				published.find((entry) => entry.data.locale === 'en') ??
				published.find((entry) => entry.data.locale === 'pt-BR')
			);
		})
		.filter(Boolean)
		.toSorted((a, b) => b.data.published_at.valueOf() - a.data.published_at.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION_EN,
		site: context.site,
		customData: '<language>en</language>',
		items: essays.map((essay) => ({
			title: essay.data.title,
			description: essay.data.description,
			pubDate: essay.data.published_at,
			categories: essay.data.tags,
			link: essayPath(essay),
		})),
	});
}
