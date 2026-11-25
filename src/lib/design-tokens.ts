/**
 * The design system's tokens, read from the one place they are defined: src/styles/global.css.
 * Nothing here holds a value of its own — the /brand page, /brand.md and /tokens.json all render from this parse,
 * so they can't drift from what the site actually uses.
 */
import css from '../styles/global.css?raw';

export type Group = 'color' | 'font' | 'text' | 'radius' | 'shadow' | 'spacing' | 'container' | 'ease';

export interface Token {
  /** e.g. --color-accent */
  name: string;
  group: Group;
  /** value as written in the light theme / @theme block */
  value: string;
  /** value under [data-theme='dark'], when it differs */
  dark?: string;
  /** the comment line(s) written above it in global.css */
  note?: string;
  /** --text-* only: line height, letter spacing, weight */
  lineHeight?: string;
  letterSpacing?: string;
  weight?: string;
}

const groups: Group[] = ['color', 'font', 'text', 'radius', 'shadow', 'spacing', 'container', 'ease'];

function block(source: string, start: string): string {
  const i = source.indexOf(start);
  if (i < 0) return '';
  let depth = 0;
  for (let k = source.indexOf('{', i); k < source.length; k++) {
    if (source[k] === '{') depth++;
    else if (source[k] === '}' && --depth === 0) return source.slice(source.indexOf('{', i) + 1, k);
  }
  return '';
}

/** `--name: value;` declarations in a block, with the comment written just above each */
function declarations(body: string): { name: string; value: string; note?: string }[] {
  const out: { name: string; value: string; note?: string }[] = [];
  let note: string[] = [];
  // multi-line values (shadows) are joined first
  const lines = body.replace(/,\s*\n\s*/g, ', ').split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    const c = line.match(/^\/\*\s*(.*?)\s*\*\/$/);
    if (c) {
      note.push(c[1]);
      continue;
    }
    const d = line.match(/^(--[a-z0-9-]+):\s*(.+?);(?:\s*\/\*\s*(.*?)\s*\*\/)?$/i);
    if (d) {
      // a comment describes the declaration right under it, not the whole run that follows
      out.push({ name: d[1], value: d[2], note: d[3] ?? (note.length ? note.join(' ') : undefined) });
      note = [];
      continue;
    }
    if (!line) note = [];
  }
  return out;
}

const theme = declarations(block(css, '@theme static'));
const dark = new Map(declarations(block(css, ":root[data-theme='dark']")).map((d) => [d.name, d.value]));

export const tokens: Token[] = [];
for (const d of theme) {
  if (d.value === 'initial') continue;
  const group = groups.find((g) => d.name.startsWith(`--${g}-`));
  if (!group) continue;
  // --text-x--line-height etc. belong to their --text-x token
  const sub = d.name.match(/^(--text-[a-z0-9-]+?)--(line-height|letter-spacing|font-weight)$/);
  if (sub) {
    const parent = tokens.find((t) => t.name === sub[1]);
    if (parent) {
      if (sub[2] === 'line-height') parent.lineHeight = d.value;
      if (sub[2] === 'letter-spacing') parent.letterSpacing = d.value;
      if (sub[2] === 'font-weight') parent.weight = d.value;
    }
    continue;
  }
  const dv = dark.get(d.name);
  tokens.push({ name: d.name, group, value: d.value, dark: dv && dv !== d.value ? dv : undefined, note: d.note });
}

export const byGroup = (g: Group) => tokens.filter((t) => t.group === g);

/** colour tokens sorted into the families the brand page shows */
export const colorFamilies: { title: string; note: string; match: RegExp }[] = [
  { title: 'Page and ink', note: 'Backgrounds, text, rules.', match: /^--color-(page|surface|ink|muted|on-ink|line|dashed|cell|rule|dim)/ },
  { title: 'Accent', note: 'One accent. Buttons, links, the system block, focus.', match: /^--color-(accent|on-accent|focus|hot)/ },
  { title: 'Pastels', note: 'Pixel fields and markers. Never text.', match: /^--color-(sage|lavender|peach|butter|mauve|stone)$/ },
  { title: 'Band', note: 'The dark band on case studies.', match: /^--color-(band|on-band)/ },
  { title: 'Terminal', note: 'The terminal window, the same in both themes.', match: /^--color-term/ },
];

/** the JSON agents fetch at /tokens.json (W3C design-tokens shape: $value / $type, dark in $extensions) */
export function tokensJson() {
  const typeOf: Record<Group, string> = {
    color: 'color',
    font: 'fontFamily',
    text: 'typography',
    radius: 'dimension',
    shadow: 'shadow',
    spacing: 'dimension',
    container: 'dimension',
    ease: 'cubicBezier',
  };
  const out: Record<string, Record<string, unknown>> = {};
  for (const t of tokens) {
    const key = t.name.replace(`--${t.group}-`, '');
    out[t.group] ??= {};
    out[t.group][key] = {
      $type: typeOf[t.group],
      $value:
        t.group === 'text'
          ? { fontSize: t.value, lineHeight: t.lineHeight, letterSpacing: t.letterSpacing, fontWeight: t.weight }
          : t.value,
      ...(t.note ? { $description: t.note } : {}),
      $extensions: { css: `var(${t.name})`, ...(t.dark ? { dark: t.dark } : {}) },
    };
  }
  return out;
}
