/**
 * "Change the style": the styles the floating switcher (src/components/ui/TokenSwitcher.astro) offers. A style is a
 * handful of token values (display face, accent, corners) that override the ones from src/styles/global.css on :root,
 * so every page, every component and /brand follow at once. No component is edited. The first style is the shipped
 * one (no override).
 *
 * 25 Nov: styles replaced the separate accent and corner pickers, and brought typography with them.
 */

export interface Style {
  id: string;
  label: string;
  /** one line on what the style is, shown under its name */
  note: string;
  /** --font-display: headlines, names, figures; with the weight, tracking and case that face reads best at */
  font: { name: string; stack: string; weight: number; tracking: string; case: 'none' | 'uppercase' };
  /** --color-accent on the light page (white text stays readable on it) and after dark (lighter, dark text on it) */
  accent: { light: string; dark: string };
  /** --radius-panel, --radius-code, --radius-chip, --radius-pill, --radius-swatch */
  radius: { panel: string; code: string; chip: string; pill: string; swatch: string };
}

export const styles: Style[] = [
  // 27 Nov (two worlds): the shipped style is sans for people, mono for machines (ref: contentarchitecture.dev)
  {
    id: 'studio',
    label: 'Studio',
    note: 'Sans, violet, square',
    font: { name: 'Geist Sans', stack: "'Geist Variable', 'Geist Fallback', ui-sans-serif, system-ui, sans-serif", weight: 500, tracking: '-0.035em', case: 'none' },
    accent: { light: '#6b5fbe', dark: '#a79bea' },
    radius: { panel: '0px', code: '0px', chip: '0px', pill: '0px', swatch: '0px' },
  },
  {
    id: 'terminal',
    label: 'Terminal',
    note: 'Pixel, violet, square',
    font: { name: 'Geist Pixel', stack: "'Geist Pixel', 'Geist Mono Variable', ui-monospace, monospace", weight: 400, tracking: '0', case: 'uppercase' },
    accent: { light: '#6b5fbe', dark: '#a79bea' },
    radius: { panel: '0px', code: '0px', chip: '0px', pill: '0px', swatch: '0px' },
  },
  {
    id: 'editorial',
    label: 'Editorial',
    note: 'Serif, green, soft',
    font: { name: 'Instrument Serif', stack: "'Instrument Serif', 'Iowan Old Style', Georgia, serif", weight: 400, tracking: '-0.01em', case: 'none' },
    accent: { light: '#2c7a57', dark: '#7fcfa6' },
    radius: { panel: '8px', code: '6px', chip: '4px', pill: '4px', swatch: '2px' },
  },
];

export const styleById = (id?: string | null): Style => styles.find((s) => s.id === id) ?? styles[0];

/** the CSS that applies one style: on :root, and the lighter accent after dark */
export const styleCss = (s: Style) =>
  `:root{--font-display:${s.font.stack};--display-weight:${s.font.weight};--display-tracking:${s.font.tracking};--display-case:${s.font.case};--color-accent:${s.accent.light};--color-accent-solid:${s.accent.light};` +
  `--radius-panel:${s.radius.panel};--radius-code:${s.radius.code};--radius-chip:${s.radius.chip};` +
  `--radius-pill:${s.radius.pill};--radius-swatch:${s.radius.swatch}}` +
  `:root[data-theme='dark']{--color-accent:${s.accent.dark}}`;

/** what goes in <style id="token-override">; empty for the shipped style */
export const overrideCss = (id?: string | null): string => {
  const s = styleById(id);
  return s.id === styles[0].id ? '' : styleCss(s);
};

export interface Edit {
  /** token name as the system writes it, e.g. font.display */
  token: string;
  from: string;
  to: string;
}

/**
 * What an agent would edit to go from one style to another: one row per token that really differs.
 * `dark` picks which accent value to show (the one on screen).
 */
export function edits(from: Style, to: Style, dark = false): Edit[] {
  const out: Edit[] = [];
  if (from.font.name !== to.font.name) out.push({ token: 'font.display', from: from.font.name, to: to.font.name });
  const a = (s: Style) => (dark ? s.accent.dark : s.accent.light);
  if (a(from) !== a(to)) out.push({ token: 'color.accent', from: a(from), to: a(to) });
  (Object.keys(to.radius) as (keyof Style['radius'])[]).forEach((k) => {
    if (from.radius[k] !== to.radius[k]) out.push({ token: `radius.${k}`, from: from.radius[k], to: to.radius[k] });
  });
  return out;
}

/** where a visitor's choice is remembered (this browser only) */
export const STORAGE_KEY = 'nicey-style';
/** fired on window after a change, with { style } — the band re-reads its rows on it */
export const CHANGE_EVENT = 'nicey:tokens';
