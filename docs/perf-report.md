# Performance audit report, 19 September 2026

Branch `perf/audit`. Three changes kept, four tried and dropped. Baseline detail is in `docs/perf-baseline.md`.

## The short version

The site was already fast. Desktop scored 99 to 100 before and scores 100 now. No third-party scripts, no zod or MDX code in the browser, every page static, fonts set up correctly. There was no big win hiding in the code.

What the three kept changes do:

- **Pages are lighter.** Images are 30 to 36% smaller on every page that has them, and total page weight is down 11 to 16% on those pages.
- **The layout shift on /event-tech is gone.** CLS 0.051 to 0.000 on mobile and desktop.
- **The home page stops preloading four carousel images** ahead of the heading, fonts and CSS.

Lighthouse scores are level before and after, measured side by side. Treat them as "unchanged, already good" and the byte and layout-shift numbers as the real result.

## Before and after

Both versions of the site were built separately and measured side by side: Lighthouse 13, six pages, mobile and desktop, three runs each, alternating between the untouched site and the changed one so both face the same machine conditions (72 runs, no failures).

Weights are compressed transfer sizes. They and CLS do not depend on how busy the machine is, so those columns are exact. Scores, LCP and TBT do depend on it; see the note under the table.

| Page | Device | Score before | Score after | LCP before s | LCP after s | CLS before | CLS after | Images before KB | Images after KB | Page before KB | Page after KB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 90 | 90 | 3.6 | 3.4 | 0.000 | 0.000 | 160 | 103 | 441 | 384 |
| / | desktop | 99 | 100 | 0.8 | 0.8 | 0.000 | 0.000 | 288 | 185 | 599 | 496 |
| /work | mobile | 92 | 88 | 3.3 | 3.4 | 0.000 | 0.000 | 239 | 155 | 519 | 435 |
| /work | desktop | 100 | 100 | 0.7 | 0.7 | 0.000 | 0.000 | 192 | 122 | 516 | 447 |
| /wordpress | mobile | 94 | 94 | 2.9 | 2.9 | 0.000 | 0.000 | 121 | 80 | 389 | 347 |
| /wordpress | desktop | 100 | 100 | 0.6 | 0.6 | 0.000 | 0.000 | 96 | 62 | 400 | 366 |
| /event-tech | mobile | 88 | 95 | 2.9 | 2.8 | 0.051 | 0.000 | 90 | 58 | 358 | 325 |
| /event-tech | desktop | 100 | 100 | 0.7 | 0.7 | 0.048 | 0.000 | 95 | 60 | 398 | 363 |
| /contact | mobile | 96 | 87 | 2.6 | 2.8 | 0.000 | 0.000 | 3 | 2 | 257 | 257 |
| /contact | desktop | 100 | 98 | 0.7 | 0.7 | 0.000 | 0.000 | 1 | 1 | 299 | 299 |
| /work/smg-relief-network | mobile | 96 | 96 | 2.7 | 2.7 | 0.000 | 0.000 | 37 | 26 | 298 | 287 |
| /work/smg-relief-network | desktop | 100 | 100 | 0.7 | 0.6 | 0.000 | 0.000 | 72 | 52 | 377 | 356 |

JavaScript is unchanged at 159 to 187 KB compressed per page. About 90% of that is React and Next.js themselves; the site's own code is roughly 50 KB uncompressed.

### How to read the scores

The scores are level. The differences in either direction are noise from the machine, and the table shows how large that noise is: /contact has 2 KB of images and none of the touched components, so nothing about it changed, yet it moved 9 points on mobile.

Lighthouse records a CPU speed benchmark with every run. On this Mac it swung between 53 and 2,660 during the suite, and a third of the runs (12 on the untouched site, 13 on the changed one) happened while the processor was starved. Those runs show every kind of work taking about four times longer at once, on both versions equally, which is what a busy machine looks like and not what slower code looks like. The score, LCP and TBT columns above are medians of the runs with a benchmark of 1,000 or more; the /contact desktop row had no such run on the untouched side and uses all three.

An earlier side by side set on the home page during a quieter spell (5 runs each) agrees: 90 for the untouched site against 91 with the changes, LCP 3.6 s against 3.5 s.

The first baseline in `docs/perf-baseline.md` put home mobile at 85. That run was already under load; about 90 is the real figure.

## What changed and why

1. **Hero carousel images are no longer eager** (`src/components/home/hero-carousel.tsx`). Four of the eight cards were marked `loading="eager"`, and Next.js turns that into `<link rel="preload">` tags, so about 60 KB of thumbnails competed with the fonts and stylesheet before the heading could paint. They are lazy now. They still load straight away in practice because the carousel sits within the browser's lazy-load distance, and the drift only starts after the page is idle. Carousel, particles, nav and reveal animations all checked working after the change, with no console errors.
2. **The counters reserve their final width** (`src/components/motion/count-up.tsx`). The big "10,000+" on /event-tech grew wider as it counted up from 0 and pushed the "+" and the text beside it, 15 small shifts adding up to CLS 0.05. An invisible copy of the final number now sits in the same grid cell as the counting one, so nothing moves. The finished state is identical.
3. **AVIF ahead of WebP** (`next.config.ts`). `next/image` now serves AVIF to browsers that accept it and WebP to the rest. Same quality setting, 30 to 36% fewer bytes. Crops compared side by side look the same.

## Tried and dropped

- **Inlining the stylesheet** (`experimental.inlineCss`). It removes one render-blocking request, but it adds about 32 KB to every page load and the stylesheet stops being cached between pages. Mobile scores fell 1 to 2 points and LCP rose 0.2 to 0.3 s on five of six pages. Reverted.
- **Fixed width and height on the carousel images**, to cut the 15-entry `srcset` that `fill` produces. It did trim the home HTML from 136 to 129 KB, but with a 1x/2x `srcset` phones pick the 640 wide image for every card where `sizes` had picked 384. About 70 KB more images on mobile to save 0.6 KB of compressed HTML. Reverted.
- **Deferring the particle canvas setup by one frame**, on the theory that its canvas resize forced a layout for the carousel's width read. Lighthouse's forced-reflow time did not move (89 ms before, 88 ms after). Reverted.
- **Computing the carousel card width from the window width** instead of reading `offsetWidth`. Same result: forced reflow stayed at about 100 ms on both builds. Reverted. The reflow comes from somewhere else, most likely React's own hydration pass, and it is small.

## Pixel check

Full-page screenshots at 1440 px and 375 px of seven pages, before and after, compared pixel by pixel with motion reduced.

- After changes 1 and 2: twelve of fourteen screenshots identical. The rest differed by 0.001 to 0.06%. That is the mint button glow, which also differs between two screenshots of the same build, and carousel thumbnails resampled from a different source width.
- After AVIF: image areas differ by 0.1 to 4% of pixels, as expected from a different lossy format. Layout, text and spacing are identical, and the crops I compared by eye are indistinguishable.

No copy, prices, reviews or case study content were touched.

## Checks

`pnpm check:content`, `pnpm typecheck`, `pnpm lint` and `pnpm build` all pass.

## Needs your decision

1. **Measure production after merging.** Production could not be measured from this Mac: the connection took 7 s to deliver the 18 KB HTML, and the free PageSpeed API quota was used up. After the merge, run the six pages through pagespeed.web.dev on a normal connection. That is the number clients and Google see.
2. **AVIF on Vercel.** The first request for each image size is slower to encode than WebP; after that it is cached at the edge. AVIF and WebP variants both count toward Vercel's image optimization usage, so glance at the Usage tab after a week. If it is a concern, reverting is one line in `next.config.ts`.
3. **What would actually move the mobile score further** is shipping less framework JavaScript, and that means design decisions rather than tuning: for example dropping the client-side `Reveal` wrappers in favour of CSS scroll animations, so fewer components hydrate. Worth doing only if production numbers say mobile needs it. At 90 and above, I would leave it.
4. **Builds depend on reaching Google Fonts.** One build failed here when the connection dropped. Vercel and CI are not affected, but moving the two font files into the repo with `next/font/local` would make local builds work offline. Optional.
