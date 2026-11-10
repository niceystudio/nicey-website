/** /llms.txt: a plain index of the site for agents and AI search (llmstxt.org format). */
import type { APIRoute } from 'astro';
import { caseStudies, caseHref } from '../data/case-studies';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://nicey-website.vercel.app');
  const abs = (p: string) => new URL(p, base).href;
  const body = [
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
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
