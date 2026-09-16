/**
 * Content guard. Fails the build when copy breaks the site's rules.
 * Part 1: dash scan only. Part 2 adds case study schema, metric sources and image checks.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["content", "src"];
const SCAN_EXT = /\.(mdx?|tsx?|json|css)$/;
const BANNED: Record<string, string> = {
  "—": "em dash",
  "–": "en dash",
};

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (SCAN_EXT.test(name)) out.push(full);
  }
  return out;
}

const problems: string[] = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const [char, name] of Object.entries(BANNED)) {
        if (line.includes(char)) {
          problems.push(`${relative(ROOT, file)}:${i + 1} contains an ${name}`);
        }
      }
    });
  }
}

if (problems.length) {
  console.error(`Content guard failed (${problems.length}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("Content guard passed.");
