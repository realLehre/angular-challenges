import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
});

const docs = defineCollection({
  schema: (ctx) =>
    docsSchema({
      extend: z.object({
        noCommentSection: z.boolean().optional().default(false),
        challengeNumber: z.union([z.number(), z.boolean()]).default(false),
        author: reference('authors').optional(),
        command: z.string().optional(),
        blogLink: z.string().optional(),
        videoLink: z
          .object({
            link: z.string(),
            alt: z.string(),
            flag: z.enum(['FR']).optional(),
          })
          .optional(),
      }),
    })(ctx),
});

const i18n = defineCollection({
  type: 'data',
  schema: i18nSchema({
    extend: z
      .object({
        'page.title.challenge': z.string(),
        'author.createdBy': z.string(),
        'buttons.star': z.string(),
        'buttons.sponsor': z.string(),
        'challenge.footer.note': z.string(),
        'challenge.footer.running': z.string(),
        'challenge.footer.start': z.string(),
        'challenge.footer.reminder': z.string(),
        'challenge.footer.communityAnswers': z.string(),
        'challenge.footer.authorAnswer': z.string(),
        'challenge.footer.blogPost': z.string(),
      })
      .partial(),
  }),
});

export const collections = {
  docs: docs,
  i18n: i18n,
  authors: authors,
};
