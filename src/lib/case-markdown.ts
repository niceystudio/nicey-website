/**
 * A case study as the plain Markdown an agent reads.
 * Used by the page's Machine view and by the /work/<slug>.md twin, so both show the same text.
 */
import type { CaseStudy, ChapterBlock } from '../data/case-studies';

const table = (head: string[], rows: string[][]) =>
  [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');

function block(b: ChapterBlock): string {
  switch (b.kind) {
    case 'stats':
      return b.items.map((i) => `- **${i.value}** — ${i.label}: ${i.caption}${i.seenAt ? ` (${i.seenAt})` : ''}`).join('\n');
    case 'rows':
      return `**${b.title}**\n\n${table(['Item', 'Value'], b.rows.map((r) => [r.label, r.value]))}`;
    case 'map':
      return `**${b.title}**\n\n${table(['Figma', 'Code'], b.rows.map((r) => [`\`${r.from}\``, `\`${r.to}\``]))}`;
    case 'ramp':
      return `**${b.title}**\n\n${b.swatches.map((w) => `\`${w.step}\` #${w.hex}${w.feeds ? ' ←' : ''}`).join(' · ')}\n\n${b.note}`;
    case 'chain':
      return `**${b.title}**\n\n${b.links.map((l) => `- \`${l.from}\` → \`${l.token}\` (${l.state})`).join('\n')}`;
    case 'docs':
      return `**${b.title}**\n\n${b.items
        .map((d) => `- **${d.name}**: ${d.purpose} Use for ${d.useFor} Not for ${d.notFor} ${d.instead}.`)
        .join('\n')}`;
    case 'flow':
      return `**${b.title}**\n\n${b.steps.map((st) => `${st.n}. **${st.name}**: ${st.text}`).join('\n')}`;
    case 'checks':
      return `**${b.title}** · ${b.subject} · ${b.status}\n\n${b.items.map((i) => `- ${i.value} · ${i.label}`).join('\n')}`;
    case 'surfaces':
      return `**${b.title}**\n\n${b.items.map((i, k) => `${k + 1}. ${i.name} (${i.how.toLowerCase()})`).join('\n')}`;
    case 'graph':
      return `**${b.title}**\n\n${b.edges.map((e) => `- ${e.from} → ${e.to}: ${e.rules.join(', ')}`).join('\n')}`;
    case 'order':
      return `**${b.title}**\n\n${b.steps.map((st, k) => `${k + 1}. **${st.name}**: ${st.text}`).join('\n')}`;
    case 'everywhere':
      return `**${b.title}**\n\n${b.surfaces.map((x) => `- **${x.name}**: ${x.note}`).join('\n')}`;
    case 'bulk':
      return `**${b.title}**\n\n${b.outcomes.map((o) => `- **${o.label}**: ${o.title}${/[?.!]$/.test(o.title) ? '' : '.'} ${o.text} → ${o.cta}`).join('\n')}`;
    case 'audit':
      return `**${b.title}** · ${b.layers.toLocaleString('en')} component variants\n\n${table(['Property', 'Bound'], b.items.map((i) => [i.label, i.value]))}`;
    case 'meters':
      return `**${b.title}**\n\n${table(['Property', 'Bound'], b.items.map((i) => [i.label, i.value]))}`;
    case 'states':
      return `**${b.title}**\n\n${table(['State', 'Token', 'Example'], b.rows.map((r) => [r.state, `\`${r.token}\``, r.example]))}`;
    case 'compare':
      return table(['', 'Before', 'After', 'Note'], b.rows.map((r) => [r.label, r.before, r.after, r.note]));
    case 'images':
      return b.images.map((i) => `![${i.alt}](${i.src})`).join('\n');
  }
}

export function caseMarkdown(s: CaseStudy, url: string): string {
  const out: string[] = [];
  out.push(
    '---',
    `title: ${s.linkName} case study`,
    `client: ${s.name}`,
    `studio: Nicey`,
    `url: ${url}`,
    '---',
    '',
    `# ${s.name}: ${s.statement}`,
    '',
    `> ${s.kicker}`,
    '',
  );
  out.push(s.lede, '');
  out.push('## Facts', '', ...s.facts.map((f) => `- **${f.term}**: ${f.detail}`), '', ...(s.who ? [s.who, ''] : []));
  if (!s.proofViz && s.numbers.length) {
    out.push(`## ${s.numbersHeading}`, '', ...s.numbers.map((n) => `- **${n.value}** ${n.label}. ${n.meaning}`), '');
  }
  if (s.proofViz === 'surfaces') {
    out.push('## Before and after', '', '- Places that change a status: **8**, each with its own rules → **one status model**', '');
  }
  if (s.proofViz === 'names') {
    out.push('## Before and after', '', '- Code names on variables: **13 of 553 → 554 of 554**', '');
  }
  if (s.note) out.push(`## ${s.note.heading}`, '', s.note.text, '');
  if (s.chapters) out.push('## What we did, step by step', '');
  for (const c of s.chapters ?? []) {
    out.push(`### ${c.kicker}: ${c.heading}`, '', c.lede, '');
    for (const b of c.blocks) out.push(block(b), '');
    for (const p of c.proof ?? []) out.push(`> **${p.value}** ${p.caption}${p.seenAt ? ` (${p.seenAt})` : ''}`, '');
  }
  if (!s.chapters) out.push('## What we did', '', ...s.did.map((d, i) => `${i + 1}. ${d}`), '');
  if (s.decisions) {
    out.push(`## ${s.decisions.heading}`, '');
    s.decisions.items.forEach((d, k) => out.push(`### ${k + 1}. ${d.title}`, '', `**Problem:** ${d.problem}`, '', `**Solved:** ${d.solved}`, ''));
  }
  if (s.agentic) {
    out.push(`## ${s.agentic.kicker}: ${s.agentic.heading}`, '', ...s.agentic.items.map((i) => `- **${i.label}**: ${i.text}`), '', s.agentic.footnote, '');
  }
  out.push('## Working together', '', s.together.text, '', `- ${s.together.collect.label}: ${s.together.collect.text}`, '');
  out.push('## What changed for the team', '', s.changed.text, '', `- ${s.changed.collect.label}: ${s.changed.collect.text}`, '');
  out.push(`## ${s.cta.heading}`, '', s.cta.text, '', `→ ${s.cta.label}`, '');
  return out.join('\n');
}
