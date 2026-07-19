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

/** Projects declare a year, optionally narrowed to a month. */
const yearMonth = z.string().regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/);

const projects = defineCollection({
	loader: glob({
		base: './content/projects',
		pattern: '**/*.{md,mdx}',
		generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
	}),
	schema: ({ image }) =>
		z
			.object({
				title: z.string().min(1),
				category: z.enum(['software', 'hardware', 'volunteer']),
				start_at: yearMonth,
				end_at: yearMonth.nullable(),
				summary: z.string().min(1),
				links: z
					.array(
						z.object({
							label: z.string().min(1),
							href: z.url({ protocol: /^https?$/ }),
						}),
					)
					.default([]),
				// The first image leads the entry; the rest become thumbnails.
				images: z.array(image()).default([]),
			})
			.refine(({ start_at, end_at }) => end_at === null || end_at >= start_at, {
				message: 'end_at must not precede start_at',
				path: ['end_at'],
			}),
});

export const collections = { essays, projects };
