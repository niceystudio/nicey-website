/**
 * Direction A content changes for the QBench case study (Emir 19 Nov), applied only when the page is shown in A.
 * The shared data (case-studies.ts) and the live page are untouched.
 *  - 01 Audit shows what the audit found (the problems), not the results.
 *  - 02 is about Figma carrying what the code carries, so Figma can be the source of truth; "one file" isn't the point.
 *    The coverage meters and the results (1,071 → 0, 99.5%) move here.
 * All numbers are the case study's own; new sentences are drafts for Emir/Goran.
 */
import type { CaseStudy } from './case-studies';

type Chapters = NonNullable<CaseStudy['chapters']>;

export function qbenchChaptersA(chapters: Chapters): Chapters {
  const [audit, oneFile, ...rest] = chapters;
  const coverage = audit.blocks.find((b) => b.kind === 'audit');
  const map = oneFile.blocks.find((b) => b.kind === 'map');
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
      heading: 'Figma carries what the code carries.',
      lede: 'Every variable got the name developers type in CSS and every value is bound to a token, so Figma and the codebase describe the same system, and Figma can be the source of truth.',
      blocks: [map, coverage].filter(Boolean) as Chapters[number]['blocks'],
      proof: audit.proof,
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
