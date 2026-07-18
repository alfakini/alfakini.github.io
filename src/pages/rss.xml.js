import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { essayPath, getEssays } from '../lib/essays';

export async function GET(context) {
	const essays = await getEssays();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: essays.map((essay) => ({
			title: essay.data.title,
			description: essay.data.description,
			pubDate: essay.data.published_at,
			categories: essay.data.tags,
			link: essayPath(essay),
		})),
	});
}
