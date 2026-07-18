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
			status: z.enum(['draft', 'published']).default('draft'),
			published_at: z.coerce.date(),
			updated_at: z.coerce.date().optional(),
			hero_image: image().optional(),
			locale: z.enum(['pt-BR', 'en']),
			slug: z.string().min(1),
		}),
});

export const collections = { essays };
