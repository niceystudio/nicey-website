/**
 * The component inventory. Usage is counted from the source at build time (every .astro file that imports the
 * component), so the /brand page and /brand.md always say where a change will land.
 */
const sources = import.meta.glob('/src/**/*.astro', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

export interface Component {
  name: string;
  /** path from the repo root */
  file: string;
  what: string;
  /** props an agent needs to know */
  api: string[];
  /** global classes it renders (so hand-written markup can be found and migrated) */
  classes?: string[];
}

export const components: Component[] = [
  {
    name: 'Button',
    file: 'src/components/ui/Button.astro',
    what: 'Every call to action. Square, mono, uppercase. Primary is the accent, secondary an outline.',
    api: [
      "variant: 'primary' | 'secondary' | 'on-band' | 'on-band-outline' (default primary)",
      "size: 'sm' | 'lg' (default lg)",
      'href: renders a link; without it a <button>',
    ],
    classes: ['pill', 'pill-ink', 'pill-outline', 'pill-sm', 'pill-lg'],
  },
  {
    name: 'Label',
    file: 'src/components/ui/Label.astro',
    what: 'Small text that names things: section captions, kickers, meta lines, control names.',
    api: ["variant: 'section' | 'caption' | 'meta' | 'mono'", "as: 'span' | 'p' | 'h2' | 'h3' | 'div'"],
    classes: ['caption', 'caption-sm', 'label-mono', 'a-path'],
  },
  {
    name: 'SectionHead',
    file: 'src/components/SectionHead.astro',
    what: 'The opener every section shares: a // caption and the h2.',
    api: ['id: the h2 id', 'caption: the label text', 'headingClass: e.g. a max width'],
  },
  {
    name: 'Terminal',
    file: 'src/components/ui/Terminal.astro',
    what: 'The dark window: three pixel lights, optional tabs and file name, a body in mono.',
    api: ['src: file name on the right', 'tabsLabel: accessible name of the tab list', 'slot "tabs": buttons with class term-tab'],
    classes: ['term', 'term-bar', 'term-tabs', 'term-tab', 'term-src', 'term-body', 'term-cursor'],
  },
  {
    name: 'Tabs',
    file: 'src/components/ui/Tabs.astro',
    what: 'A row of file tabs: mono, the open tab on the surface with an accent line on top. Behaviour (selection, ← → Home End) from src/lib/tabs.ts, shared by every tab list including the dark windows.',
    api: ['label: accessible name of the tab list', 'fill: tabs share the row (a fixed set of steps)', 'children: <button role="tab" class="tab">, optional <span class="tab-k"> above the name', 'script: selectTab(tabs, i) and tabKeys(tabs, go) from src/lib/tabs.ts'],
    classes: ['tabs', 'tabs--fill', 'tab', 'tab-k'],
  },
  {
    name: 'TokenSwitcher',
    file: 'src/components/ui/TokenSwitcher.astro',
    what: 'The floating "Change the style" button, bottom right on every page. Pick one of three styles (Terminal, Product, Editorial) and the whole site follows: each overrides --font-display, --color-accent and the --radius-* tokens on :root, and the panel logs the token edits like an agent would. Styles live in src/data/token-presets.ts; the pick is remembered in the browser and applied before first paint.',
    api: ['no props: Base.astro renders it once per page', "fires 'nicey:tokens' on window after a change ({ style })"],
  },
  {
    name: 'PixelFieldA',
    file: 'src/directions/a/PixelFieldA.astro',
    what: 'The brand pattern: soft pastel cells that move slowly (drift, rippling rings, a breathing drop); a click sends a ripple through it. Still, with no ripples, under reduced motion.',
    api: ["mode: 'drift' | 'rings' | 'drop'", "fade: 'left' | 'edges' | 'none'", 'still: one frame, no motion', 'seed, cx, cy, cell'],
  },
  {
    name: 'PixelTrailA',
    file: 'src/directions/a/PixelTrailA.astro',
    what: 'The homepage hero field: crisp pastel cells in slow bands; the pointer leaves an accent and hot trail through them. Fades out towards the headline. Still, with no trail, under reduced motion.',
    api: ['seed, cell', 'fills its positioned parent; listens for the pointer on the closest <section>'],
  },
  {
    name: 'PixelFlowA',
    file: 'src/directions/a/PixelFlowA.astro',
    what: 'How we work drawn in cells: scattered near-colours at Drift become one solid, bordered block at Proof. Hovering or focusing a step card (#step-<id>) lights its column.',
    api: ['no props: sits above the five step cards in HowA'],
  },
  {
    name: 'PixelIconA',
    file: 'src/directions/a/PixelIconA.astro',
    what: 'A small pixel icon that acts out a service: near-purples collapse into one token (system), parts assemble into a screen (screen). Assembles once on screen, loops while its card is hovered.',
    api: ["kind: 'system' | 'screen'", 'class'],
  },
  {
    name: 'PixelAuditA',
    file: 'src/directions/a/PixelAuditA.astro',
    what: 'The example audit score per pillar in cells: they pour into each track and the ones past the score fall out hot. Names and scores are real text; data from src/data/audit-sample.ts.',
    api: ['no props'],
  },
  {
    name: 'PixelMarqueeA',
    file: 'src/directions/a/PixelMarqueeA.astro',
    what: 'Words drawn in cells from the display face, on a slow loop; they scatter away from the pointer.',
    api: ['text', 'class'],
  },
  {
    name: 'Faq',
    file: 'src/components/Faq.astro',
    what: 'Questions as an accordion, with a section opener.',
    api: ['items, caption, heading, id'],
  },
];

/** files that import the component (excluding itself and the brand page) */
export function usedIn(c: Component): string[] {
  const base = c.file.split('/').pop()!;
  return Object.entries(sources)
    .filter(([path, src]) => !path.endsWith(c.file) && !path.endsWith('/pages/brand.astro') && src.includes(`/${base}'`))
    .map(([path]) => path.replace(/^\//, ''))
    .sort();
}
