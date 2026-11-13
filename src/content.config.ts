import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']),
    os: z.enum(['Linux', 'Windows', 'Other']),
    ip: z.string().optional(),
    tags: z.array(z.string()).default([]),
    completed: z.boolean().default(true),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writeups, blog, notes };
