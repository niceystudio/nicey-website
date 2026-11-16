/**
 * Rows for the Work list. The homepage shows the mixed list; each practice
 * page shows its own. Copy comes from the v3 canvas and the case studies.
 */
import { caseHref } from './case-studies';

export interface WorkRow {
  name: string;
  meta: string;
  href: string;
  /** null keeps the dashed placeholder: the figure isn't collected yet */
  figure: { value: string; to?: string } | null;
  caption: string;
  description: string;
}

const rows = {
  qbench: {
    name: 'QBench',
    meta: 'Design system + product · LIMS',
    href: caseHref('qbench-design-system'),
    figure: { value: '1,071', to: '0' },
    caption: 'Outside-library references',
    description:
      'Years without a designer, consolidated into one semantic token system. Plus one status model for eight entry points, compliance steps included, shipped as an MVP.',
  },
  qbenchSystem: {
    name: 'QBench',
    meta: 'Design system · LIMS',
    href: caseHref('qbench-design-system'),
    figure: { value: '1,071', to: '0' },
    caption: 'Outside-library references',
    description: 'Years without a designer, consolidated into one semantic token system.',
  },
  qbenchStatus: {
    name: 'QBench',
    meta: 'Product design · LIMS',
    href: caseHref('qbench-status-workflows'),
    figure: { value: '8', to: '1' },
    caption: 'Status entry points on one model',
    description: 'One status model for eight entry points, compliance steps included, shipped as an MVP.',
  },
  everbreed: {
    name: 'Everbreed',
    meta: 'Design system · Agtech',
    href: caseHref('everbreed'),
    figure: { value: '302' },
    caption: 'Variables made machine-readable',
    description:
      'A mature Figma library made machine-readable: IDs, scopes and code names on 302 variables, so the code config can come from Figma. In progress.',
  },
  clerky: {
    name: 'Clerky',
    meta: 'Design system · Legal tech',
    href: caseHref('clerky'),
    figure: { value: '0 T1' },
    caption: 'Defects at the pilot gate',
    description:
      'Three-tier tokens, AI-context docs on every component and token, and a zero-T1 defect gate. Validated at pilot scale on the Documents App.',
  },
  omnisafe: {
    name: 'Omnisafe',
    meta: 'Product design · Insurance',
    href: caseHref('omnisafe'),
    figure: { value: '16' },
    caption: 'Modules tested before build',
    description: 'Sixteen modules, tested end to end with real employees before engineering began.',
  },
  flyr: {
    name: 'FLYR',
    meta: 'Product design · Hospitality',
    href: caseHref('flyr'),
    figure: null,
    caption: 'One business result',
    description: 'Group Quotation MVP shipped, so hotels can see whether a group booking makes money.',
  },
} satisfies Record<string, WorkRow>;

export const workRows = {
  home: [rows.qbench, rows.everbreed, rows.clerky, rows.omnisafe, rows.flyr],
  systems: [rows.qbenchSystem, rows.everbreed, rows.clerky],
  product: [rows.qbenchStatus, rows.omnisafe, rows.flyr],
} satisfies Record<string, WorkRow[]>;
