import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { essayPath, getEssays } from '../lib/essays';

export async function GET(context) {
	const posts = await getEssays();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.published_at,
			categories: post.data.tags,
			link: essayPath(post),
		})),
	});
}
