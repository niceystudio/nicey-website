/**
 * Direction A content changes for the case studies (Emir 19–20 Nov), applied only when a page is shown in A.
 * The shared data (case-studies.ts) and the live page are untouched.
 *  - QBench What we did: see qbenchChaptersA below (20 Nov second pass).
 *  - Everbreed before/after: everbreedAliasesDiff.
 * All numbers are the case study's own; new sentences are drafts for Emir/Goran.
 */
import type { CaseStudy } from './case-studies';

type Chapters = NonNullable<CaseStudy['chapters']>;

/**
 * What we did in A (Emir, 20 Nov — approved from the test). The story per step, with fewer results:
 *  01 Audit — the issues (unchanged).
 *  02 Source of truth — what it means and what was wrong: Figma and the code had drifted apart. A before/after table
 *     shows it as Figma vs code, before and after; the variable map and the coverage meters go; "Seen at QBench" stays.
 *  03 Tokens — the variable → CSS-name map moves here with a preview per token (colour chips, text colour, spacing,
 *     radius) and the alias chain with its two colours; the colour ramp goes.
 *  04 States, 05 Agents build — unchanged.
 * Copy is a draft from the case study's own facts; Goran + Predrag polish it.
 */
export function qbenchChaptersA(chapters: Chapters): Chapters {
  const [audit, oneFile, tokens, ...rest] = chapters;
  const chain = tokens.blocks.find((b) => b.kind === 'chain');
  return [
    {
      ...audit,
      blocks: [
        {
          kind: 'checks',
          title: 'Audit · the legacy library',
          subject: 'What the scripts found',
          status: 'Issues found',
          items: [
            { value: '1,071', label: 'references to libraries outside the Foundation' },
            { value: '11', label: 'external libraries the components depended on' },
            { value: '540', label: 'of 553 variables without a name developers can type' },
          ],
        },
      ] as Chapters[number]['blocks'],
      proof: undefined,
    },
    {
      ...oneFile,
      kicker: '02 · Source of truth',
      heading: 'Figma and the code had drifted apart.',
      lede: 'A source of truth is the one place both sides read from. Figma said one thing and the code another, so neither could be trusted. We made Figma carry what the code carries, so Figma can be that place.',
      blocks: [
        {
          kind: 'sync',
          title: 'Example · four variables, Figma and code',
          rows: [
            { figma: 'text/default', before: 'raw value', after: 'var(--text-default)' },
            { figma: 'surface/default', before: 'outside library', after: 'var(--surface-default)' },
            { figma: 'primitives/primary/600', before: 'no code name', after: 'var(--primary-600)' },
            { figma: 'spacing/4', before: 'raw value', after: 'var(--spacing-4)' },
          ],
        },
      ] as Chapters[number]['blocks'],
      proof: audit.proof,
    },
    {
      ...tokens,
      heading: 'Every token got the name developers type.',
      lede: 'Text, colour, spacing and radius tokens carry their CSS name, and component tokens alias down to the primitives.',
      // the same map and chain, with a preview per token: colour chips, the text colour, a spacing step, a corner.
      // Hexes: primary 600/800/900 are the ramp's own; text/default is the QBench UI text colour used in the mockups.
      blocks: [
        {
          kind: 'map',
          title: 'Figma variable → web code name',
          rows: [
            { from: 'text/default', to: 'var(--text-default)', swatch: { kind: 'text', hex: '1F2A3D' } },
            { from: 'surface/default', to: 'var(--surface-default)', swatch: { kind: 'color', hex: 'FFFFFF' } },
            { from: 'primitives/primary/600', to: 'var(--primary-600)', swatch: { kind: 'color', hex: '4074C7' } },
            { from: 'spacing/4', to: 'var(--spacing-4)', swatch: { kind: 'space' } },
            { from: 'radius/md', to: 'var(--radius-md)', swatch: { kind: 'radius' } },
          ],
        },
        chain && {
          ...chain,
          links: (chain as Extract<Chapters[number]['blocks'][number], { kind: 'chain' }>).links.map((l) => ({
            ...l,
            hex: l.from.endsWith('/800') ? '244D9E' : l.from.endsWith('/900') ? '23437B' : undefined,
          })),
        },
      ].filter(Boolean) as Chapters[number]['blocks'],
    },
    ...rest,
  ];
}

/**
 * Everbreed before/after in A (Emir, 20 Nov): the same terminal window as QBench (NamesDiff) instead of the 210 alias
 * blocks. Numbers and notes are the case study's own (210 hand-written aliases → 0; 302 tokens, each with $figmaId,
 * $property and $codeSyntax). Only Figma names are shown — the code names are still to confirm with Goran.
 */
export const everbreedAliasesDiff = {
  cap: 'Everbreed · utility config',
  title: 'hand-written token aliases',
  file: 'utility.config',
  tabs: ['before · by hand', 'after · from Figma'] as [string, string],
  cmd: 'list tokens --source',
  lines: [
    ['text/primary', 'alias, written by hand', '$figmaId · $codeSyntax'],
    ['surface/hover', 'alias, written by hand', '$figmaId · $codeSyntax'],
    ['border/selected/default', 'alias, written by hand', '$figmaId · $codeSyntax'],
  ] as [string, string, string][],
  before: {
    count: 210,
    live: '210 hand-written token aliases',
    note: 'Someone kept 210 aliases in the config by hand, and each one could drift from Figma.',
    more: '+ 207 more aliases · all by hand',
  },
  after: {
    count: 0,
    live: '0 hand-written token aliases: the config is generated from Figma',
    note: 'The config is generated from Figma now. Nobody writes an alias by hand.',
    more: '+ 299 more tokens · generated from Figma',
  },
};
