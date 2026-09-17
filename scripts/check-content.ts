/**
 * Content guard. Fails the build when content breaks the site's rules:
 * - no em dashes or en dashes anywhere in content or source
 * - every case study matches the schema (metrics need a source, replaced sites need a note)
 * - every image a case study points at exists in public/
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import { caseStudySchema } from "../src/lib/schema";

const ROOT = process.cwd();
const problems: string[] = [];

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (/\.(mdx?|tsx?|json|css)$/.test(name)) out.push(full);
  }
  return out;
}

for (const dir of ["content", "src"]) {
  for (const file of walk(join(ROOT, dir))) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (line.includes("—")) problems.push(`${relative(ROOT, file)}:${i + 1} contains an em dash`);
        if (line.includes("–")) problems.push(`${relative(ROOT, file)}:${i + 1} contains an en dash`);
      });
  }
}

const workDir = join(ROOT, "content", "work");
for (const file of readdirSync(workDir).filter((f) => f.endsWith(".mdx"))) {
  const { data } = matter(readFileSync(join(workDir, file), "utf8"));
  const parsed = caseStudySchema.safeParse(data);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      problems.push(`content/work/${file}: ${issue.path.join(".") || "(root)"} ${issue.message}`);
    }
    continue;
  }
  const images = [parsed.data.thumb, parsed.data.hero, ...parsed.data.gallery.map((g) => g.src)].filter(Boolean) as string[];
  for (const src of images) {
    if (!existsSync(join(ROOT, "public", src))) problems.push(`content/work/${file}: image ${src} not found in public/`);
  }
}

if (problems.length) {
  console.error(`Content guard failed (${problems.length}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("Content guard passed.");
