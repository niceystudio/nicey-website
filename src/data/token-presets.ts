/**
 * "Change one token": the choices the floating switcher (src/components/ui/TokenSwitcher.astro) offers. A choice
 * overrides the matching tokens from src/styles/global.css on :root, so every page, every component and /brand
 * follow at once. The first entry of each list is the shipped value (no override).
 */

export interface Accent {
  id: string;
  label: string;
  /** the accent on the light page; white text stays readable on it */
  light: string;
  /** the accent after dark: lighter, dark text on it */
  dark: string;
}

export interface Radius {
  id: string;
  label: string;
  /** --radius-panel, --radius-code, --radius-chip, --radius-pill, --radius-swatch */
  panel: string;
  code: string;
  chip: string;
  pill: string;
  swatch: string;
}

export const accents: Accent[] = [
  { id: 'violet', label: 'Violet', light: '#6b5fbe', dark: '#a79bea' },
  { id: 'blue', label: 'Blue', light: '#2f5fd0', dark: '#8fb0ff' },
  { id: 'green', label: 'Green', light: '#2c7a57', dark: '#7fcfa6' },
  { id: 'orange', label: 'Orange', light: '#b9541f', dark: '#f0a070' },
  { id: 'pink', label: 'Pink', light: '#b0407a', dark: '#ee8fc0' },
];

export const radii: Radius[] = [
  { id: 'sharp', label: 'Sharp', panel: '0px', code: '0px', chip: '0px', pill: '0px', swatch: '0px' },
  { id: 'soft', label: 'Soft', panel: '8px', code: '6px', chip: '4px', pill: '4px', swatch: '2px' },
  { id: 'round', label: 'Round', panel: '16px', code: '12px', chip: '999px', pill: '999px', swatch: '4px' },
];

/** the CSS that applies one accent: on :root, and the lighter one after dark */
export const accentCss = (a: Accent) =>
  `:root{--color-accent:${a.light};--color-accent-solid:${a.light}}:root[data-theme='dark']{--color-accent:${a.dark}}`;

/** the CSS that applies one corner style to every radius token */
export const radiusCss = (r: Radius) =>
  `:root{--radius-panel:${r.panel};--radius-code:${r.code};--radius-chip:${r.chip};--radius-pill:${r.pill};--radius-swatch:${r.swatch}}`;

/** what goes in <style id="token-override">; empty for the shipped defaults */
export function overrideCss(accentId?: string, radiusId?: string): string {
  const a = accents.find((x) => x.id === accentId);
  const r = radii.find((x) => x.id === radiusId);
  return (a && a.id !== accents[0].id ? accentCss(a) : '') + (r && r.id !== radii[0].id ? radiusCss(r) : '');
}

/** where a visitor's choice is remembered (this browser only) */
export const STORAGE_KEY = 'nicey-tokens';
/** fired on window after a change, with { accent, radius } — the band re-reads its rows on it */
export const CHANGE_EVENT = 'nicey:tokens';
