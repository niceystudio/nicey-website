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
    what: 'The floating "Change one token" button, bottom right on every page. Pick an accent or a corner style and the whole site follows: it overrides --color-accent and the --radius-* tokens on :root. Choices live in src/data/token-presets.ts; the pick is remembered in the browser and applied before first paint.',
    api: ['no props: Base.astro renders it once per page', "fires 'nicey:tokens' on window after a change ({ accent, radius })"],
  },
  {
    name: 'PixelFieldA',
    file: 'src/directions/a/PixelFieldA.astro',
    what: 'The brand pattern: soft pastel cells that move slowly (drift, rippling rings, a breathing drop); cells under the cursor light up. Still under reduced motion.',
    api: ["mode: 'drift' | 'rings' | 'drop'", "fade: 'left' | 'edges' | 'none'", 'still: one frame, no motion', 'seed, cx, cy, cell'],
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
