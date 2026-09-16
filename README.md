# Dada Daniels portfolio

WordPress Developer, Full Stack Developer, No-Code Developer. Event Tech systems.

Next.js 15, React 19, TypeScript, Tailwind v4, MDX. Hosted on Vercel.

## Run it

```bash
pnpm install
cp .env.example .env.local   # then fill in values
pnpm dev                     # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Local dev server |
| `pnpm build` | Runs the content guard, then a production build |
| `pnpm check:content` | Fails on em/en dashes, missing case study fields, metrics without a source, missing images |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm capture <url> <slug>` | Desktop and mobile screenshots of a live site into `public/work/<slug>/` |

## Content

- Case studies: `content/work/*.mdx` (schema in `src/lib/schema.ts`)
- Blog posts: `content/blog/*.mdx` (the blog stays hidden until the first post exists)
- Site copy: `src/content/site.ts`, `src/content/lanes.ts`, `src/content/reviews.ts`

## Deploy

Vercel GitHub integration. `main` deploys to production; every PR gets a preview. Framework Preset: Next.js. Environment variables: see `.env.example`, set for Production and Preview.
