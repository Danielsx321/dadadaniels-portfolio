# Performance baseline, 18 September 2026

Measured before any change on branch `perf/audit`. Commit under test: `1a00ec6` (what production was serving on the day).

## How it was measured

Lighthouse 13 (performance category only), Chrome 153, headless. Mobile uses Lighthouse's default simulated phone (Moto G Power class, 4x CPU slowdown, slow 4G). Desktop uses the `desktop` preset. Three runs per page and device, medians reported.

The runs hit a local production build (`pnpm build && pnpm start`) on the same machine. Production itself could not be measured usefully from this Mac on the day: the connection was so slow that Lighthouse timed out with most scripts never arriving (see the note at the end). Lighthouse's simulated throttling is applied on top of whatever the real connection does, so the local server, which answers in about 5 ms, gives the clean comparison and the same conditions before and after each fix.

INP is a field metric and Lighthouse does not report it in the lab. Nothing on these pages runs on interaction beyond the nav toggle, the work filter and the contact form.

## Scores and metrics (local build, medians of 3)

| Page | Device | Score | LCP s | CLS | TBT ms | FCP s | Speed Index s | JS KB | Images KB | Total KB |
|---|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 85 | 3.8 | 0.000 | 232 | 1.2 | 3.1 | 167 | 160 | 441 |
| / | desktop | 99 | 0.9 | 0.000 | 9 | 0.3 | 0.7 | 181 | 288 | 599 |
| /work | mobile | 94 | 3.1 | 0.000 | 58 | 0.8 | 0.8 | 172 | 239 | 519 |
| /work | desktop | 100 | 0.7 | 0.000 | 5 | 0.2 | 0.2 | 187 | 192 | 515 |
| /wordpress | mobile | 95 | 2.9 | 0.000 | 79 | 0.8 | 0.8 | 167 | 121 | 389 |
| /wordpress | desktop | 100 | 0.6 | 0.000 | 8 | 0.2 | 0.3 | 181 | 96 | 400 |
| /event-tech | mobile | 96 | 2.7 | 0.051 | 50 | 0.8 | 0.8 | 167 | 90 | 358 |
| /event-tech | desktop | 100 | 0.6 | 0.056 | 0 | 0.2 | 0.2 | 181 | 95 | 398 |
| /contact | mobile | 97 | 2.6 | 0.000 | 56 | 0.8 | 0.8 | 159 | 3 | 257 |
| /contact | desktop | 100 | 0.6 | 0.000 | 0 | 0.2 | 0.2 | 181 | 1 | 299 |
| /work/smg-relief-network | mobile | 90 | 2.9 | 0.000 | 260 | 0.8 | 0.9 | 165 | 37 | 298 |
| /work/smg-relief-network | desktop | 100 | 0.6 | 0.000 | 0 | 0.2 | 0.2 | 187 | 72 | 377 |

KB columns are transfer size (compressed) as Lighthouse saw them.

## What the numbers say

- Desktop is already at 99 to 100 everywhere. The work is on mobile.
- The LCP element on every page is text (the hero heading or intro paragraph), never an image. Locally that text paints at first paint. The gap between FCP (0.8 to 1.2 s) and LCP (2.6 to 3.8 s) on mobile is Lighthouse's simulation charging the bytes that download before that paint (JavaScript, fonts, and on the home page four preloaded carousel images) against LCP.
- Home mobile is the weakest page: 4 carousel images are marked eager and get `<link rel="preload">` tags, so about 60 KB of images compete with fonts and CSS before the heading paints. TBT of 232 ms comes from one long task parsing the 137 KB HTML document (64 KB of it is the inline React data payload) and one from React hydration.
- /event-tech CLS 0.05: the big "10,000+" counter widens as it counts up from 0 and pushes the "+" and everything after it, 15 small shifts.
- Case study mobile TBT (260 ms) is React's hydration task. It varied 103 to 604 ms across runs, so treat it as noisy.
- The one render-blocking resource is the 10 KB stylesheet (about 160 ms in the simulation on every page).
- No third-party scripts load anywhere except Calendly on /contact, which is lazy.

## JavaScript shipped (production build, before)

Every route ships the same 10 scripts, 593 KB raw, about 180 KB compressed. Breakdown of the home page bundle:

| Chunk | Raw | Compressed | What it is |
|---|---|---|---|
| 1i1-nhwelmyup.js | 222 KB | 69 KB | React DOM |
| 03u0r_hd_d9xf.js | 130 KB | 34 KB | Next.js app router runtime |
| 0cz1d0mv5g_q7.js | 109 KB | 38 KB | Polyfills, served with `nomodule` so modern browsers skip it |
| 3rx04j-q_o4bz.js | 31 KB | 9 KB | Next.js shared runtime |
| 06f-kua6hdwxg.js | 28 KB | 7 KB | Site nav and contact form |
| 2ys5r46cgncsr.js | 24 KB | 8 KB | Home page components (carousel, particles, reveal, glow card, count-up, ticket) |
| 2ott254og1c-z.js, 04gi9tgnkp6gu.js, 3214hwz0gh69l.js | 14 + 14 + 6 KB | 6 + 3 + 2 KB | Next.js internals |
| turbopack-*.js | 10 KB | 4 KB | Module loader |

The site's own code is about 50 KB raw of the 593 KB. zod, gray-matter and next-mdx-remote stay on the server; none of them are in the browser bundle. Lighthouse flags 29 KB of unused code and 13 KB of legacy helpers inside React DOM itself, which is not something this project can change.

HTML sizes per route (uncompressed, includes the inline data payload): home 137 KB, /wordpress 77 KB, /event-tech 73 KB, /work 59 KB, case study 47 KB, /contact 39 KB. Home compresses to about 22 KB.

Fonts: Inter Tight variable (44 KB) and Instrument Serif italic (16 KB), latin subset, `font-display: swap`, both preloaded. Images are served through `next/image` as WebP; the largest originals are 1600 x 1000 JPEGs of 150 to 280 KB, delivered at 10 to 53 KB.

## Production run from this machine (for the record only)

One mobile run against https://dadadaniels.vercel.app before switching to the local build: score 55, FCP 9.5 s, LCP 9.6 s. The 18 KB HTML document alone took 7.3 s to arrive and Lighthouse warned "the page loaded too slowly to finish within the time limit". That is the connection, not the site: the same HTML arrives in 5 ms from the local server and in under a second from a normal connection. Re-run against production from a normal connection (or on pagespeed.web.dev) to get a real production number; the daily free quota on the PageSpeed API was already used up on the day.
