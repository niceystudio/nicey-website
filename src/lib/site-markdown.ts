/** The site index for agents, served at /llms.txt. (The homepage's machine view shows /index.md.) */

export function siteMarkdown(base: URL): string {
  const abs = (p: string) => new URL(p, base).href;
  return [
    '# Nicey Studio',
    '',
    '> A design systems studio. We build design systems that people and AI agents read the same way. Every project starts with a free, read-only audit of your Figma file.',
    '',
    '## Design directions (review)',
    '',
    ...['a', 'b', 'c', 'd', 'e'].map((d) => `- [Direction ${d.toUpperCase()}](${abs(`/lab/${d}`)})`),
    '',
    '## Studio',
    '',
    `- [Home](${abs('/index.md')}): the homepage as Markdown: services, how we work, work, FAQ`,
    `- [Free audit](${abs('/#audit')}): share your Figma file; get a score per pillar, the top findings, and what to fix first`,
    '',
  ].join('\n');
}
