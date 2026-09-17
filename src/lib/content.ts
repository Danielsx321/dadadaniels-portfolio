import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { caseStudySchema, type CaseStudy, type Lane } from "./schema";

const WORK_DIR = path.join(process.cwd(), "content", "work");

function load(): CaseStudy[] {
  return readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(path.join(WORK_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = caseStudySchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid case study ${file}: ${parsed.error.message}`);
      }
      return { ...parsed.data, slug: file.replace(/\.mdx$/, ""), body: content };
    })
    .sort((a, b) => a.order - b.order);
}

let cache: CaseStudy[] | null = null;
export function getCaseStudies(): CaseStudy[] {
  if (!cache || process.env.NODE_ENV === "development") cache = load();
  return cache;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}

export function getFeatured(): CaseStudy[] {
  return getCaseStudies().filter((c) => c.featured);
}

export function getByLane(lane: Lane): CaseStudy[] {
  return getCaseStudies().filter((c) => c.lane === lane);
}
