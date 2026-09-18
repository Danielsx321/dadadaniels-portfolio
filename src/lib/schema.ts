import { z } from "zod";

import { LANES } from "./lanes";

export { LANES, laneLabels, type Lane } from "./lanes";

const metric = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
  // Every number on the site must say where it comes from.
  source: z.string().min(3),
});

const imagePath = z.string().regex(/^\/work\/[a-z0-9-]+\.(jpg|png|webp)$/);

export const caseStudySchema = z
  .object({
    title: z.string().min(2),
    client: z.string().min(2),
    lane: z.enum(LANES),
    // Display label on cards, e.g. "Accessibility" for remediation work in the WordPress lane.
    tag: z.string().min(2),
    summary: z.string().min(20).max(180),
    role: z.string().min(3),
    stack: z.array(z.string()).min(1),
    liveUrl: z.url().optional(),
    status: z.enum(["live", "replaced"]).default("live"),
    statusNote: z.string().optional(),
    year: z.number().int().min(2018).max(2030).optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    metrics: z.array(metric).default([]),
    thumb: imagePath.optional(),
    hero: imagePath.optional(),
    gallery: z.array(z.object({ src: imagePath, alt: z.string().min(5) })).default([]),
  })
  .refine((d) => d.status !== "replaced" || Boolean(d.statusNote), {
    message: "statusNote is required when status is replaced",
    path: ["statusNote"],
  })
  .refine((d) => !d.featured || Boolean(d.thumb), {
    message: "featured case studies need a thumb image",
    path: ["thumb"],
  });

export type CaseStudyMeta = z.infer<typeof caseStudySchema>;
export type CaseStudy = CaseStudyMeta & { slug: string; body: string };
