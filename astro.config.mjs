import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeFootnoteAsides from './src/lib/rehype-footnote-asides.mjs';
import rehypeSemanticMarkdown from './src/lib/rehype-semantic-markdown.mjs';

export default defineConfig({
	site: 'https://alanfachini.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex, rehypeSemanticMarkdown, rehypeFootnoteAsides],
		}),
		shikiConfig: {
			theme: 'github-light',
		},
	},
});
