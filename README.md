# Nicey website

Nicey Studio's site: a design systems studio. Built with [Astro](https://astro.build) and Tailwind, static, deployed on Vercel.

## Run it

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # type check + production build
```

## Pages

| Address | File |
|---|---|
| `/` homepage | `src/pages/index.astro` → `src/directions/a/HomeA.astro` |
| `/work/<slug>` case studies | `src/pages/work/[slug].astro` → `src/components/case-study/CaseStudy.astro` |
| `/design-systems`, `/product-design` service pages | `src/pages/design-systems.astro`, `product-design.astro` → `src/directions/a/ServicePageA.astro` |
| `/work/<slug>.md`, `/index.md`, `/design-systems.md`, `/product-design.md` | Markdown copies of the pages, for agents |
| `/ai-ready.md` | the self-check prompt's checklist |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | generated in `src/pages` |

## Where to change things

- **Case study text and client facts:** `src/data/case-studies.ts` (each study's `client` holds the card, overview, challenge and result; lorem marks what is still to write). A study with `wip: true` has no page yet.
- **Links** (Book a call, Get a free audit, socials): `src/data/links.ts`
- **Homepage sections:** `src/directions/a/` (one file per section, e.g. `HeroA`, `ServicesA`, `ProcessA`)
- **Service pages:** `src/data/service-pages.ts` (hero, one section per included/ line, steps, FAQ). Photo and video spots are `MediaSlot` placeholders that name the suggested asset; swap each for the real file when it exists.
- **Articles at the bottom of a page** (after Book a call): `src/data/articles/` (`home.ts`, `design-systems.ts`, `product-design.ts`), rendered by `src/directions/a/ArticleA.astro`. Each H2 opens with a one- or two-sentence answer that stands on its own, for AI search.
- **Styles and tokens:** `src/styles/global.css`, direction A in `src/directions/a/a.css` and `a-case.css`

## Case-study films

Each case study has a short animated film in three scenes instead of the screens gallery.

- Files: `src/directions/a/FilmQBenchA.astro`, `FilmStatusA.astro`, `FilmEverbreedA.astro`; shared engine `src/lib/film.ts`, shared look `src/directions/a/film.css`
- `?scene=2` opens a film on its second scene; `?trace=1` records the cursor every 40 ms (for checking motion)
- The gallery is still in the code: remove `filmA` for a page in `src/pages/work/[slug].astro` to bring `ScreensBandA` back
