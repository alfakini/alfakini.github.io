import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const essays = defineCollection({
	loader: glob({
		base: './content/essays',
		pattern: '**/*.{md,mdx}',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			tags: z.array(z.string().min(1)).default([]),
			draft: z.boolean().default(false),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			lang: z.enum(['pt', 'en']).optional(),
		}),
});

export const collections = { essays };
