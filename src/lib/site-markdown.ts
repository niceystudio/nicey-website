/** The site as an agent reads it: served at /llms.txt and shown as the homepage's machine view. */
import { caseStudies, caseHref } from '../data/case-studies';

export function siteMarkdown(base: URL): string {
  const abs = (p: string) => new URL(p, base).href;
  return [
    '# Nicey Studio',
    '',
    '> A design systems studio. We build design systems that people and AI agents read the same way. Every project starts with a free, read-only audit of your Figma file.',
    '',
    '## Case studies',
    '',
    ...caseStudies.map((c) => `- [${c.linkName}](${abs(`${caseHref(c.slug)}.md`)}): ${c.statement}`),
    '',
    '## Studio',
    '',
    `- [Home](${abs('/')}): services, how we work, FAQ`,
    `- [Free audit](${abs('/#audit')}): share your Figma file; get a score per pillar, the top findings, and what to fix first`,
    '',
  ].join('\n');
}
