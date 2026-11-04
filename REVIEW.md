# Review: Nicey homepage v3

Static Astro build of the v3 canvas (frames 09 and 09b), using the copies in `reference/`. I didn't open the live canvas.

```bash
npm install
npm run dev      # http://localhost:4321/ (static) and /story (interactive)
npm run build    # astro check + static build to dist/
```

The review switch ("Review: static | story", bottom right) shows in dev, or on any build with `?review`.

## What I verified, and how

| Check | Result | How |
|---|---|---|
| `npm run build` | 0 errors, 0 warnings, 0 hints | `astro check` + `astro build` |
| Lighthouse on `/` (production build, mobile preset) | Performance 100, Accessibility 100, Best practices 100. CLS 0, LCP 1.4 s, TBT 0 ms | `astro preview` + Lighthouse 12.6 headless |
| Proof field count | Exactly 1,071 cells and 141 kept cells at 5 field sizes (272×260 up to 1000×560), all inside the box | Called `layoutField()` in the browser |
| Proof field resolve | Ends on `0`. The live region updates once, at the end (`1,071` → `0`). The block label appears only when settled. Before plays it back to `1,071` | Sampled the figure every 250 ms during autoplay |
| Plays once on scroll | Starts after the panel is half in view plus a 1 s pause. It never replays, and a click on Before/After cancels it | Scrolled to the panel on a fresh load |
| Reduced motion | Loads already resolved (0, After pressed, block and label shown). Before/After switch instantly with no sweep, drift or lift | Stubbed `matchMedia` and remounted the field (the pane can't emulate the media query). The CSS reduced-motion rules I checked by reading |
| Themes | Day and night on `/` and `/story`. The toggle sets `aria-pressed`, the choice persists in `localStorage` and is applied before paint | Toggled, reloaded, checked `data-theme` |
| Widths | 1440, 768 and 320 on `/` and `/story`. No horizontal scroll (`scrollWidth === clientWidth`, no element past the viewport) | Screenshots plus a DOM overflow scan |
| Keyboard, whole page | Logical order: skip link → header → hero → Before/After → rail → … → footer → review switch. Every stop has a visible ring | Tab ×45 with a `focusin` log of each element's outline |
| Story tabs (APG) | ←/→ wrap around, Home/End jump to the ends, roving tabindex, `aria-controls`/`aria-labelledby`. Tab moves into the tabpanel, then Previous, then Next step. Next step works by Enter. At 320 the tabs scroll and the active tab scrolls into view | Real key presses |
| FAQ | Native `<details>`, the first one open, Enter toggles, +/− swaps, the ring draws inside the panel | Real key presses |
| Outline | One `<h1>`, one `<main>`, no skipped heading levels (24 headings) | DOM check |
| Contrast | All text pairs are at least 4.5:1 in both themes, and the focus ring is at least 3:1 on every background (see below) | Script over every token pair |

**Not verified:** real touch devices, a real screen reader (I only checked roles and labels in the DOM), Safari and Firefox, and the `prefers-reduced-motion` CSS in a real emulator. I didn't zoom to 200% separately: 200% at 1440 is a 720px layout and 200% on a 640px phone is 320px, and I checked both of those widths. The in-app pane throttled animation frames, so I judged motion timing from the code (2.8 s sweep, 30/12 fps), not by eye.

## Differences from the canvas, and why

1. **The coral `hot` token is `#BF441E`, not `#C4471F`.** The canvas value is 4.32:1 on the page and 4.44:1 on the work-row hover, under 4.5:1 for the 11px captions. `#BF441E` gives 4.54 and 4.67, and you can't see the difference. Night `#FF8A66` is unchanged.
2. **The big figures have a width cap.** The proof figure is `min(token, 36cqi)` and the step figures are `min(token, 19cqi)`. Without the cap, `1,071` and `1,071 → 0` overflow at 320px. Desktop sizes are unchanged.
3. **4 → 2 → 1 columns** for the stat row, "When to bring us in" and the process steps, set by the panel's width. The canvas uses `auto-fit`, which gives a 3 + 1 layout at 768 with an empty grey gap. At 1440 the result is identical.
4. **Unit charts wrap to fewer columns** when there isn't room, instead of overflowing. Step 02's 26-wide chart doesn't fit at 320. Same cells and same order.
5. **Mobile spacing.** Section rhythm is 128 / 96 / 72px (≥768 / <768 / <480). Panel cell padding is 40–44 → 28 → 24px. The hero top padding is 120 → 80px below 768. The canvas has no mobile frame, so these are my call.
6. **The Work section has no top padding.** Part 2 of the canvas starts with 128px on top because it's a separate frame. On the page, the process section's 128px bottom padding already provides that gap.
7. **The proof field sizes its cells to fit the box.** It doesn't use the canvas's fixed 64 columns (11–14px cells on desktop, 5px at 320). It has no on-canvas "x / 1,071 resolved" text and no bracket from the exploration, because the v3 canvas shows only the hot line and the HTML label.
8. **The Before/After buttons draw at 38px** as in the canvas, with an invisible 44px hit area.
9. **New elements the brief asked for**, none of them in the canvas:
   - the day/night toggle (an icon button named "Night theme" with `aria-pressed`)
   - the "Skip to content" link
   - the page `<title>` and meta description, taken from the h1 and the hero lede
10. **Night values the brief didn't list:**
    - `dashed` is `rgba(236,231,219,.34)`
    - `on-ink` (text on ink pills) is `#141410`
    - the closing band is `#0C0C09`, a step darker than the `#141410` page
    - the footer's focus ring turns cream, because accent on the day band is 2.93:1
11. **The story (`/story`):**
    - It keeps Story v2's "Previous" / "Next step" labels.
    - At the ends the buttons get `aria-disabled` rather than `disabled`, so focus isn't lost.
    - The swap is a 180ms fade-in of the new step rather than an overlapping crossfade.
    - The intro column isn't sticky.
    - The page is `noindex`, since it's a review variant.
    - `/story#step-system` opens that step.
12. **Rings inside panels** are drawn inward only on edge-to-edge rows (work rows, FAQ summaries, tabs, tabpanels). Text links inside cells keep the normal outward ring.
13. **The work-row arrow nudge** runs only when motion is allowed. The hover background still changes.

## Worth a look (not changed, your call)

- **The header at 320** wraps to four rows (wordmark / two links / two links / pill + toggle). That's the canvas's `flex-wrap` behaviour, kept on purpose, but a compact mobile header might be better.
- **Contrast below the guideline in the canvas itself:**
  - `muted #716E63` is 4.49:1 on the page. Today it's only used on surfaces (4.89:1).
  - The 302 quiet unit-chart cells are 1.43:1 against the card. The number is also in the caption and the `aria-label`, so no information is lost.
- **The field area after the sweep is mostly empty:** just the 141 block bottom right. That matches the canvas, but it reads quieter at 768, where the field is 380px tall.

## Open placeholders

- **Links:** every `#` lives in `src/data/links.ts`:
  - `home` (wordmark)
  - `bookCall` (hero and footer)
  - `startAudit` ("Get a free audit" in the process section)
  - `exploreDesignSystems`, `exploreProductDesign`
  - `work.qbench`, `work.everbreed`, `work.clerky`, `work.omnisafe`, `work.flyr`

  The in-page anchors `#audit`, `#services`, `#work` and `#how` are real.
- **Video:** `[Video intro, 60–90 s]` is a dashed slot in Services.
- **FLYR:** `[result to collect]` stays dashed in Work.

## Where things are

- Tokens and themes: `src/styles/global.css` (`@theme` for day, `[data-theme='dark']` for night). House patterns: `.panel`, `.grid-4`, `.caption`, `.pill`, `.chip`, `.units`.
- Proof field engine: `src/lib/proof-field.ts`, using `src/lib/pixel-field.ts`, a verbatim copy of `reference/pixel-field.ts`.
- Zero Drift: `src/data/zero-drift.ts` holds the copy, and `src/components/zero-drift/` holds the shared `ZeroDriftStep` plus the `Static` and `Story` variants.
- Both pages render `src/components/HomePage.astro` and differ only in `zeroDrift`.
