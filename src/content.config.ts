import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['update', 'leistung', 'rechtsprechung', 'tipp', 'wartung', 'branche']),
    summary: z.string(),
    leistungen: z.array(z.string()).optional(),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { news };
