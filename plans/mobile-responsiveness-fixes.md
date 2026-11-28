# Mobile responsiveness fixes — plan

Status: **plan only, no code yet.** Start after the open PRs (#13–#18) are merged into `master`; then re-check every item below on the live site and update this list before working.

Found on 28 Nov 2026 from phone screenshots (iPhone, nicey.studio) and a check of every live page at 390px wide.

## From the phone screenshots

| # | Where | Problem | Fix |
|---|---|---|---|
| 1 | Homepage · What we help with (phone visual) | The app screen inside the phone frame is cropped left and right: Continue button, back arrow and avatar are cut. | The frame and the video don't share the same proportions, so the video is scaled up and cropped (`object-fit: cover` on a padded frame). Make the screen fit the frame exactly, nothing cut. File: `src/directions/a/ServicesA.astro`. |
| 2 | Homepage · Free audit · What you get (report) | Tabs wrap ("fix first" drops to a second line); the scores (76, 34…) and the command line are cut on the right. | Tabs in one row, horizontally scrollable. Score rows narrower on phones so the numbers always show; the command line wraps. File: `src/directions/a/ReportA.astro`. |
| 3 | Homepage · Your agent · example run (Replay) | Title and Replay button are squeezed together; before the animation starts the box is empty and very tall. | Title left, Replay right on one line (smaller, with an icon); box height follows its content. Same pattern on QBench "Example · the same change, two ways": fix both. Files: `src/directions/a/SelfCheckA.astro`, `src/components/case-study/AgenticCompare.astro`. |
| 4 | QBench · Primitive / Semantic token / State | Token names break letter by letter (`pr im it iv es…`). | On phones the three columns stop sitting side by side: each row reads top to bottom like a card, names wrap normally. Horizontal scroll as a fallback for the long chain. File: `src/directions/a/FilmQBenchA.astro`. |
| 5 | Everbreed · phone visuals | Same cropping as #1. | Same fix as #1. File: `src/components/case-study/EverbreedProduct.astro`. |
| 6 | Everbreed · The same records, ready for the fair | The two desktop screenshots overlap and run off the right edge. | On phones show the same two images smaller, fitted to the screen, slightly offset. File: `src/components/case-study/EverbreedProduct.astro`. |
| 7 | Status workflows · Bulk | "In progress" wraps to two lines, "blocked by workflow" is squeezed, the dialog covers the table. | Status tags never wrap. On phones the table becomes a compact list (test number + name on top, status below); the dialog sits below the table. File: `src/directions/a/FilmStatusA.astro`. |

## Found in the page check

| # | Where | Problem |
|---|---|---|
| 8 | QBench · CAPA table | "In review" tag wraps to two lines (same fix as #7). |
| 9 | Homepage, Design systems, Product design · guide tables | 3-column tables are too tight; code names split (`violet.5` / `00`). On phones each row becomes a small card. |
| 10 | Every page | The floating square button bottom-right covers text (e.g. the "What working with Nicey" table). Smaller on phones, tucked to the edge, with space left under the content. |

## Checks before the PR
- Each fix compared at 375px and 390px, light and dark, and on desktop (desktop must not change).
- `astro build` and Lighthouse CI pass.

## Not mobile, but found on the way
- The three case study pages show **Lorem ipsum** in "About this project" (Headquarters, Founded, Company size, Result). Needs real facts; tracked in `plans/seo-update.md`.
