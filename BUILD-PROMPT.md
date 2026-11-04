# Build prompt: Nicey homepage v3

Paste everything below the line into a new Claude Code session opened in `C:\Users\gbaba\Documents\Projects\nicey\nicey-web-v2`.

---

Build the Nicey studio homepage (v3) as a production-quality Astro site in this folder. The design is final and lives in `reference/`. Your job is to turn it into clean, componentised code that matches it exactly, then add the two things the canvas can't show: a canvas-drawn proof field and a night theme.

## Read first

- `reference/canvas/home-v3-part1.dc.html`: hero, proof panel, "When to bring us in", Zero Drift (static), services, process. **Source of truth for layout, copy, type sizes, spacing and colours.**
- `reference/canvas/home-v3-part2.dc.html`: work, FAQ, closing footer. Same rules.
- `reference/canvas/story-v2.dc.html`: the *behaviour* of the interactive Zero Drift story (step nav, Previous/Next, one stage per step). Its *look* is old v2: do not copy its styling.
- `reference/explorations/nicey-proof-panel.html`: the canvas implementation of the proof field to port (envelope, sweep, counter, hover lift, drift).
- `reference/pixel-field.ts`: the brand field engine (palettes, value noise, `mulberry32`). Import from your copy of it rather than re-deriving the maths.
- The `.dc.html` files are a canvas-editor format: ignore `<x-dc>`, `<helmet>`, `<sc-for>`, `<sc-if>` and `{{holes}}`. Read them as plain HTML plus inline styles. The live canvas is https://claude.ai/artifact/8pqfbQxnuoSdRzDFHfpn3u (frames 09 and 09b). If it differs from `reference/`, ask before following it.

## Stack

- Astro (latest stable), TypeScript strict, Tailwind CSS v4 with tokens in `@theme`. No UI kit, no animation library, no React unless a component truly needs it (it shouldn't).
- Fonts: `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`, self-hosted woff2. Weights used: 400, 500 (600 only for the wordmark).
- Static output. Run `git init` and commit in logical steps. Do not push or deploy.

## Design tokens

Define every value once as a token and use only tokens in components. No hex values in markup.

**Colour, day** (from the canvas):
- page `#F3F0E9`, surface/card `#FBFAF6`, surface-hover `#F6F3EC`, ink `#26251F`, ink-2 `#4D4A40`, muted `#716E63`
- line `rgba(38,37,31,.10)`, line-strong `rgba(38,37,31,.20)`, dashed `rgba(38,37,31,.30)`, cell-quiet `rgba(38,37,31,.18)`
- accent `#6B5FBE` (resolved/token), hot `#C4471F` (client tags, drift, "missing", measurement line only)
- pastel markers: sage `#CBDAC4`, lavender `#D9D2EF`, peach `#F6D9C4`, butter `#F2E6BC`, mauve `#D8C6E0`

**Colour, night** (start from the babarogic night palette, then check every pair):
- page `#141410`, surface `#1D1C16`, surface-hover `#24231C`, ink `#ECE7DB`, ink-2 `#B6B1A3`, muted `#8F8C81`
- line `rgba(236,231,219,.13)`, line-strong `rgba(236,231,219,.26)`, cell-quiet `rgba(236,231,219,.16)`
- accent `#A79BEA`, hot `#FF8A66`
- pastels: sage `#3D4A37`, lavender `#3A3556`, peach `#4A3A2C`, butter `#4A4229`, mauve `#463A4C`
- Field palette: `DARK_PALETTE` from `pixel-field.ts`.
- The closing footer is a dark ink band with cream text in day. At night, make it a step darker than the page (not the same colour) so it still reads as the closing band.

**Type scale** (named by use; take the exact values from the canvas):
display-figure, h1, h2, h3-step, h3-card, figure-step, stat, title, body-lg, body, label, caption (Geist Mono, 11–12px, uppercase, +0.08em).
- Headings are weight 500 with negative tracking.
- Every changing or comparable number uses `tabular-nums`.
- Headings get `text-wrap: balance` and descriptions `text-wrap: pretty`.

**Shape and space:**
- Panel radius 16, inner chips 6–8, pills 999.
- Section rhythm 128px (scale down on mobile), container 1200px with 24px gutters.
- **The panel pattern** is the house style. Build it as one component used everywhere: a 1px line-coloured gap between cells, a 1px border, radius 16, `overflow: hidden`, cells on the surface colour.

## Page structure

Keep the copy exactly as in `reference/`. Build each item below as its own component.

1. **Header:** wordmark, nav (Design systems, Product design, Work, How we work), "Free audit" pill, and a day/night toggle. Add a skip link as the first focusable element.
2. **Hero:** as in the canvas.
3. **Proof panel (QBench):**
   - Copy column: tag, live figure, label, note that swaps with the state, Before/After segmented control, readout.
   - Field column: a `<canvas>` (spec below).
   - Stat row underneath: 302 / 8 / 16 / 0, label at the top, number at the bottom.
4. **When to bring us in:** four cells in one panel. Unit charts are real DOM grids (53 hot cells in 01, 302 quiet cells in 03). Cards 02 and 04 have none.
5. **Zero Drift:** two variants (see below).
6. **Services:** two panel cells (primary and alongside). The video slot stays a dashed placeholder.
7. **Process:** four-cell panel with the sage "Free" marker on steps 1–2, plus the CTA.
8. **Work:** list panel with one row link per client (name + meta, figure + coral caption, description, arrow). FLYR keeps the dashed `[result to collect]`.
9. **FAQ:** native `<details>` rows in a panel, numbered, with a +/− indicator. The first one is open.
10. **Closing footer:** caption, headline, sub-line, two CTAs.

All `href="#"` links stay placeholders. Collect them in one `links.ts` so they're easy to fill in later.

## Proof field (canvas)

Port it from `nicey-proof-panel.html`; the numbers are data, not decoration.
- **Cell count:** exactly **1,071** cells (QBench outside-library references) under the envelope. Fit the cell size so all of them fit the field box at every width, and keep the column heights summing to 1,071.
- **Colour:** each cell takes its colour from the brand field (noise sampled through the current theme's palette, skipping stop 0). Add a slow idle drift at a low frame rate.
- **Resolve:** in **After**, a hot-colour sweep line crosses the field. Cells dissolve behind it, and the big figure counts down to exactly **0**.
  - **141** cells, spread evenly through the sweep, travel into a 12-wide accent block under the peak.
  - Label the block "141 components / one semantic token system". Draw that label in HTML positioned over the canvas, not canvas text, so it stays crisp and translatable.
- **Reverse:** **Before** plays it backwards.
- **Auto-play:** once, the first time the panel is at least 50% in view, after a short pause. Never again after that.
- **Hover:** cells near the pointer lift. Pointer only, nothing on touch.
- **Performance:**
  - DPR-aware, capped at 2.
  - Pauses offscreen (IntersectionObserver) and repaints on resize and on theme change.
  - 30fps while animating or hovered, about 12fps idle.
- **Reduced motion:** jump straight to the final state, with no sweep, no drift and no lift. The counter shows the final number.
- **Accessibility:**
  - The canvas has `role="img"` and an `aria-label` that states the data.
  - The live figure sits in a polite live region, updated at the end of the animation, not on every tick.
  - Before/After are real buttons with `aria-pressed`.

## Zero Drift: build both, for review

Same content, two components, switchable at review time:
- `/`: **static**, as in the canvas. A sticky rail on the left with five anchor links (pastel marker + number + name). Five step cells in one panel, each with "You're seeing / We do / You get" and the figure block.
- `/story`: the **interactive story**, with Story v2's behaviour in v3's design.
  - One panel holds a step nav (five tabs, a pastel marker each, the active one underlined in ink) and the active step's content. That content uses exactly the v3 step layout: caption, h3, illustration, three-part `dl`, figure block with the hot "Seen at" caption.
  - Previous / Next buttons are ink pills, with Next filled.
  - Use the APG tabs pattern: arrow keys move between tabs, Home/End jump to the ends, with roving tabindex and `aria-controls`.
  - Content swaps with a short opacity crossfade (≤200ms), and none under reduced motion.
  - On mobile the tabs scroll horizontally, with the next tab peeking past the edge.
- Everything else on `/story` is identical to `/`. Share the components; don't duplicate the page.
- Add a small fixed "Review: static | story" switch, shown only in dev or behind `?review`, so I can flip between them.

## Night theme

- Default to `prefers-color-scheme`. A header toggle with an accessible name overrides it, and the choice persists in `localStorage` wrapped in try/catch.
- Apply the theme before first paint with an inline script in `<head>`, so there's no flash.
- Switch with transitions suppressed for one frame, so the whole page doesn't crossfade.
- Every token has a night value. Recheck all text and focus-ring contrast pairs in both themes (4.5:1 for text, including 11px captions; 3:1 for UI).

## Rules

- No invented numbers or copy. Anything missing stays a dashed `[placeholder]`.
- Accessibility:
  - `:focus-visible` rings on everything interactive. Inside clipped panels, use a negative `outline-offset` so the ring isn't cut off.
  - 44px minimum touch targets.
  - One `<h1>`, a heading outline that nests properly, and a `<main>` landmark.
  - Decorative squares and chips are `aria-hidden`.
- Responsive:
  - Works at 320px with no horizontal scroll and at 200% zoom.
  - Panels stack, the proof field moves under the copy, and stat cells wrap to 2 then 1 columns.
  - Breakpoints follow the content.
- Hover effects only under `@media (hover: hover)`.
- Every motion is opt-in via `prefers-reduced-motion: no-preference`.
- Transitions list exact properties, never `all`.
- Performance: Lighthouse performance and accessibility of at least 95 on `/`, with no layout shift from fonts or the counter.

## Done means

1. `npm run build` passes with zero TypeScript or Astro errors.
2. You ran the dev server and checked `/` and `/story` in the browser:
   - day and night
   - at 320, 768 and 1440 wide
   - keyboard-only through the whole page, including the story tabs and the FAQ
   - with reduced motion emulated
3. The proof field ends on exactly 0 with a 141-cell block, and plays once on scroll.
4. A short `REVIEW.md` lists:
   - what you verified, and how
   - anything that doesn't match the canvas, and why
   - the open placeholders (links, video, FLYR result)
5. Commits are local only.

Ask me before you change copy, add sections, or drift from the canvas design.
