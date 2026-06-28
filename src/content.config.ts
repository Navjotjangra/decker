import { glob, file } from 'astro/loaders';
import { defineCollection } from 'astro/content/config';
import { z } from 'astro/zod'

const projects = defineCollection({
    loader: glob({pattern: "src/content/projects/**/*.md"}),
    schema: z.object({
        id: z.number(),
        title: z.string().max(50),
        tools: z.preprocess(
            (val) => (Array.isArray(val) ? val : [val]),
            z.array(z.string())),
        year: z.string().max(4),
        liveSite: z.url().optional(),
        github: z.url().optional(),
        description: z.string().max(350),
        isFeatured: z.boolean(),
        isDraft: z.boolean(),
        inProgress: z.boolean().optional().default(false)
    })
});

const experience = defineCollection({
    loader: file("src/content/resume/experience.yaml"),
    schema: z.object({
        title: z.string().max(70),
        timeline: z.string().max(15),
        description: z.string().max(500),
        certificateUrl: z.string().url().optional(),
        certificateLabel: z.string().max(30).optional()
    })
})

const education = defineCollection({
    loader: file("src/content/resume/education.yaml"),
    schema: z.object({
        title: z.string().max(70),
        timeline: z.string().max(15),
        school: z.string().max(70)
    })
})

const skillsAndTools = defineCollection({
    loader: file("src/content/skills-and-tools/skillsAndTools.yaml"),
    schema: z.object({
        title: z.string().max(70),
        items: z.array(z.string())
    })
})


export const collections = { projects, experience, education, skillsAndTools };