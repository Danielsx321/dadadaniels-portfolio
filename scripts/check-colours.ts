/**
 * Colour guard. Raw colours live in src/app/globals.css only; components use role tokens
 * (bg-canvas, text-mint-ink, bg-tint/4, --alpha(var(--color-shade)/50%) and so on).
 * Fails on hex values, rgb()/hsl() literals and Tailwind white/black utilities in src/app and
 * src/components. Share images in src/lib/og/ are exempt (rendered once, always dark).
 * A deliberate literal (the window-control dots, the QR ink) needs a "colour-ok: <reason>"
 * comment on the same line or the line above.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const problems: string[] = [];

const rules: [RegExp, string][] = [
  [/(?<![&\w])#[0-9a-fA-F]{3,8}\b/, "raw hex colour"],
  [/\b(rgba?|hsla?|oklch|oklab)\(/, "raw colour function"],
  [/(?<![\w-])(?:[a-z]+-)*(?:bg|text|border|from|via|to|fill|stroke|shadow|ring|outline|decoration|divide|caret|accent)-(?:white|black)\b/, "Tailwind white/black"],
];

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (/\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

for (const dir of ["src/app", "src/components"]) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes("colour-ok:") || (lines[i - 1] ?? "").includes("colour-ok:")) return;
      for (const [re, what] of rules) {
        if (re.test(line)) problems.push(`${relative(ROOT, file)}:${i + 1} ${what}: ${line.trim().slice(0, 90)}`);
      }
    });
  }
}

if (problems.length) {
  console.error(`Colour guard failed (${problems.length}). Use a token from globals.css:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("Colour guard passed.");
