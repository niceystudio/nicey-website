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
