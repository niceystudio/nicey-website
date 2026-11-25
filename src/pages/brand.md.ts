/**
 * /brand.md: the design system as an agent reads it — the rules, every token, every component with its API and the
 * files that use it. Built from the same parse as the /brand page, so it can't drift from the code.
 */
import type { APIRoute } from 'astro';
import { tokens, type Group } from '../lib/design-tokens';
import { components, usedIn } from '../lib/design-components';

const titles: Record<Group, string> = {
  color: 'Colour',
  font: 'Font families',
  text: 'Type scale',
  radius: 'Radius',
  shadow: 'Shadow',
  spacing: 'Spacing',
  container: 'Container',
  ease: 'Easing',
};

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# Nicey design system',
    '',
    'Source of truth: `src/styles/global.css` (tokens) and `src/components/ui/` (components). Human view: /brand. Tokens as JSON: /tokens.json.',
    '',
    '## Rules for agents',
    '',
    '- Use a token for every colour, size, space, radius and shadow: `var(--token)` in CSS, or the Tailwind utility of the same name (`text-ink-2`, `bg-surface`, `p-md`). Never write a raw hex or px value the scale already has.',
    '- Use the components below instead of re-styling their classes. A call to action is always `<Button>`; a small label is always `<Label>`; a section always opens with `<SectionHead>`.',
    '- Square corners, one accent, mono for labels and buttons, the pixel face for headlines.',
    '- Changing a component or token changes every file listed under "Used in".',
    '',
    '## Components',
    '',
  ];
  for (const c of components) {
    const used = usedIn(c);
    lines.push(`### ${c.name}`, '', `\`${c.file}\` — ${c.what}`, '');
    for (const a of c.api) lines.push(`- ${a}`);
    if (c.classes) lines.push(`- classes: ${c.classes.map((x) => `\`.${x}\``).join(', ')}`);
    lines.push(`- used in ${used.length} files${used.length ? `: ${used.map((u) => `\`${u}\``).join(', ')}` : ''}`, '');
  }
  lines.push('## Tokens', '');
  for (const g of Object.keys(titles) as Group[]) {
    const list = tokens.filter((t) => t.group === g);
    if (!list.length) continue;
    lines.push(`### ${titles[g]}`, '', '| Token | Value | Dark | Note |', '| --- | --- | --- | --- |');
    for (const t of list) {
      const v = g === 'text' ? [t.value, t.lineHeight && `lh ${t.lineHeight}`, t.letterSpacing && `ls ${t.letterSpacing}`].filter(Boolean).join(' · ') : t.value;
      lines.push(`| \`${t.name}\` | ${v.replace(/\|/g, '\\|')} | ${t.dark ?? ''} | ${(t.note ?? '').replace(/\|/g, '\\|')} |`);
    }
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
