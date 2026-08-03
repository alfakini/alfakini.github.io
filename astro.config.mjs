import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeFootnoteAsides from './src/lib/rehype-footnote-asides.mjs';
import rehypeSemanticMarkdown from './src/lib/rehype-semantic-markdown.mjs';

const latticeDarkContrast = {
	name: 'lattice-dark-contrast',
	span(node) {
		const style = node.properties.style;
		if (typeof style !== 'string') return;

		// Raise muted Poimandres tokens to AA contrast on the Lattice code surface.
		node.properties.style = style.replace(/(--shiki-dark:\s*)#(?:767c9d(?:b0)?|7390aa|506477)(?=;|$)/gi, '$1#929292');
	},
};

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
			themes: {
				light: 'github-light',
				dark: 'poimandres',
			},
			defaultColor: false,
			transformers: [latticeDarkContrast],
		},
	},
});
