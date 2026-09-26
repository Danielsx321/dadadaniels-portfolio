# CLAUDE.md, dadadaniels-portfolio

Dada Daniels' portfolio site. Next.js 16.3 (App Router), React 19.3, TypeScript, Tailwind v4, MDX content, pnpm, deployed on Vercel. Plan of record: `~/Desktop/master-claude-template/plans/2026-09-16-portfolio-rebuild-nextjs.md`.

Positioning: WordPress Developer is the core. Full Stack Developer and No-Code Developer are the other titles. Event Tech is its own standalone section.

## Hard rules

- **No em dashes or en dashes anywhere** (U+2014, U+2013): copy, metadata, alt text, code comments that render. `pnpm check:content` fails the build on them.
- **No unbacked numbers.** Every metric in a case study has a `source`. A case study with no confirmed result ships without a result. Never invent clients, dates, roles, reviews or stats.
- **Reviews are real.** Every entry in `src/content/reviews.ts` traces to a real Upwork contract and has a `source`.
- **Accuracy rules:** Hilaritas Suites was a full build (2025), with accessibility fixes added in 2026 (corrected by Daniels 2026-09-23). The Cliff Residences was the original WordPress + Elementor + TranslatePress build; the live site has since been replaced by someone else, so it sits in Other work with `status: replaced` and no live link.
- **Never on the site:** NowTutors, the German 5,000+ registrant event (until a sanitised case study exists), Daughtry, template testimonials or template blog posts, "SEO" positioning, years-of-experience framing.
- **Copy voice:** Daniels' client voice, plain verbs, American spelling, one idea per paragraph. Not "only WordPress", not an event planner, not an SEO person.
- **Design of record:** `~/Desktop/master-claude-template/outputs/portfolio/mockup/home-v3.html` (approved 2026-09-17). Dark glass look, floating pill nav, single mint accent #4BFFA5, Inter Tight + Instrument Serif italic (`accent` utility) for one phrase per heading. Light mode is the approved translation of it (screenshots in `~/Desktop/master-claude-template/outputs/portfolio/light-mode/`, approved 2026-09-26).
- **Two themes, dark default.** `data-theme` on `<html>` is set before first paint by `src/components/theme/theme-script.tsx` (stored choice, else system setting); `theme-toggle.tsx` is the sun/moon button in the nav, the mobile panel and the `/w` header. Light values live in the `:root[data-theme="light"]` block of `globals.css`. Never use `dark:` variants; change the token instead.
- **Tokens by role, no raw colours outside `globals.css`** (enforced by `pnpm check:colours` in prebuild and CI). Role names: `canvas`, `surface`, `surface-raised`, `text`, `muted`, `subtle`, `mint`, `mint-ink`, `mint-deep`, `on-mint`, `glass`, `glass-line`, `spotlight`, `headline-end`, `danger`, and the bases `tint`, `veil`, `scrim`, `shade`, `glow` used with an opacity modifier (`bg-tint/4`, `bg-veil/60`) or `--alpha(var(--color-shade)/50%)` inside arbitrary shadows. A deliberate literal needs a `colour-ok: <reason>` comment on the line or the line above.
- **`mint` is a fill only** (buttons, badges, the scan bar), with `on-mint` text on it. Mint as text, icon or border uses `mint-ink` (#4BFFA5 in dark, #0A7A45 in light, because #4BFFA5 on a light surface is 1.3:1).
- **Motion:** hero content never starts at opacity 0 (protects LCP). Everything static under `prefers-reduced-motion`. No preloader, smooth-scroll library or custom cursor. The one loading indicator is `src/components/layout/nav-progress.tsx`: a small mint ring under the nav that appears only when a clicked internal link takes longer than 120 ms to load.
- **Confirmed roles:** SMG = full build. SmartPatrol = accessibility work only. PPTM = everything event related only. Tag and describe them that way.
- **Prices shown ("from"):** WordPress $250, Full Stack $1,000, No-Code $1,000, Event Tech $800.
- **No email address anywhere on the site.** Contact form and Cal.com only.

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
