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
	i18n: {
		locales: ['pt-BR', 'en'],
		defaultLocale: 'pt-BR',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'pt-BR',
				locales: {
					'pt-BR': 'pt-BR',
					en: 'en',
				},
			},
		}),
	],
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
