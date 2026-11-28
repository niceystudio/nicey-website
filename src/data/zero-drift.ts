/** Zero Drift: the five steps. Step headings updated 2026-11; other copy from the v3 canvas. */

export type Marker = 'sage' | 'lavender' | 'peach' | 'butter' | 'mauve';

export interface Step {
  id: 'drift' | 'audit' | 'system' | 'context' | 'proof';
  num: string;
  name: string;
  marker: Marker;
  heading: string;
  seeing: string;
  weDo: string;
  youGet: string;
}

export const steps: readonly Step[] = [
  {
    id: 'drift',
    num: '01',
    name: 'Drift',
    marker: 'sage',
    heading: 'We map where your product has drifted: colours, components, design vs. code.',
    seeing:
      'A colour class with no token behind it renders nothing, and the page still passes review. One purple ends up under eleven names.',
    weDo: 'Read the Figma file, the compiled CSS and the source, and list every value the product uses.',
    youGet: 'A drift map: what exists, what it should be, where design and code disagree.',
  },
  {
    id: 'audit',
    num: '02',
    name: 'Audit',
    marker: 'lavender',
    heading: 'A free audit scores five pillars and shows you what to fix first.',
    seeing: 'Something is off, but not where, or what to fix first.',
    weDo: 'Check what an agent needs: descriptions on components and tokens, bindings to semantic tokens, slots declared instead of inferred. With repo access, Figma tokens against compiled CSS and source.',
    youGet: 'A score per pillar, the findings, and a roadmap in days.',
  },
  {
    id: 'system',
    num: '03',
    name: 'System',
    marker: 'peach',
    heading: 'We turn every decision into named tokens and components, from Figma to code.',
    seeing: 'Teams rebuild the same button, and Figma properties drift from code props.',
    weDo: 'One token model, components built in Figma and code against it, IDs that survive renames, and code config generated from Figma instead of written by hand.',
    youGet: 'One source of truth, in light, dark and brand modes.',
  },
  {
    id: 'context',
    num: '04',
    name: 'Context',
    marker: 'butter',
    heading: 'We document it so developers and AI agents use it right without asking.',
    seeing: 'Agents ship screens that are almost on-brand, because the rules live in people’s heads.',
    weDo: 'A context file for every token and component: what it is, when to use it, what it must never do.',
    youGet: 'Documentation people and coding agents read the same way.',
  },
  {
    id: 'proof',
    num: '05',
    name: 'Proof',
    marker: 'mauve',
    heading: 'We ship it to production and stay on to keep it holding.',
    seeing: 'Systems that look finished in Figma and fall apart on the first real feature.',
    weDo: 'One real surface built through the system, gated on T1 blocking, T2 architectural and T3 minor defects. When a bug appears, we fix the model, not the screen.',
    youGet: 'A before and after report as the delivery document.',
  },
];

/** Tailwind background class per marker, spelled out so the scanner sees them. */
export const markerBg: Record<Marker, string> = {
  sage: 'bg-sage',
  lavender: 'bg-lavender',
  peach: 'bg-peach',
  butter: 'bg-butter',
  mauve: 'bg-mauve',
};
