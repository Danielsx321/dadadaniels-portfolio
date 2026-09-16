# CLAUDE.md, dadadaniels-portfolio

Dada Daniels' portfolio site. Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, MDX content, pnpm, deployed on Vercel. Plan of record: `~/Desktop/master-claude-template/plans/2026-09-16-portfolio-rebuild-nextjs.md`.

Positioning: WordPress Developer is the core. Full Stack Developer and No-Code Developer are the other titles. Event Tech is its own standalone section.

## Hard rules

- **No em dashes or en dashes anywhere** (U+2014, U+2013): copy, metadata, alt text, code comments that render. `pnpm check:content` fails the build on them.
- **No unbacked numbers.** Every metric in a case study has a `source`. A case study with no confirmed result ships without a result. Never invent clients, dates, roles, reviews or stats.
- **Reviews are real.** Every entry in `src/content/reviews.ts` traces to a real Upwork contract and has a `source`.
- **Accuracy rules:** Hilaritas Suites was accessibility remediation, not a full build. The Cliff Residences was the original WordPress + Elementor + TranslatePress build; the live site has since been replaced by someone else, so it sits in Other work with `status: replaced` and no live link.
- **Never on the site:** NowTutors, the German 5,000+ registrant event (until a sanitised case study exists), Daughtry, template testimonials or template blog posts, "SEO" positioning, years-of-experience framing.
- **Copy voice:** Daniels' client voice, plain verbs, American spelling, one idea per paragraph. Not "only WordPress", not an event planner, not an SEO person.
- **Tokens by role.** Raw colour values live only in `src/app/globals.css` `@theme`. Components use role names (`canvas`, `surface`, `ink`, `ink-muted`, `line`, `accent`, `accent-soft`).
- Light theme only for now.

## Adding a case study

1. Screenshots: `pnpm capture <url> <slug>` writes to `public/work/<slug>/`.
2. Thumbnail: render `scripts/thumb.html` to `public/work/<slug>/thumb.png`.
3. Write `content/work/<slug>.mdx` with the frontmatter in `src/lib/schema.ts`. Body sections: `## The problem`, `## What I built`, optional `## Result`.
4. `pnpm check:content && pnpm build`, then open a PR. Daniels merges.

## Workflow

- Parts ship on branches `portfolio/part-N-name` with a Vercel preview; Claude opens the PR, Daniels merges.
- Env vars: see `.env.example`. Vercel and `.env.local` are separate stores; set both, and in Vercel set Production and Preview.
- Vercel Framework Preset must read "Next.js".
- This machine: Node fails TLS (npm installs, Google Fonts at build, Resend) with UNABLE_TO_GET_ISSUER_CERT_LOCALLY. Prefix commands with `NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem` (same fix as NowTutors). CI and Vercel are unaffected.
