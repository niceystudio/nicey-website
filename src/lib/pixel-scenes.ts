/**
 * Pixel scenes: the brand grid used as illustration, not as background (27 Nov, after craft.wild.as).
 * The cells draw what a section says: drift becoming a system (How we work), findings becoming a score (Free audit),
 * a service acting itself out (What we help with), the hero answering the pointer, pixel type at the close.
 *
 * One shared loop for every scene on the page:
 *   - draws only scenes on screen, at most 30fps, and nothing while the tab is hidden
 *   - colours come from the theme tokens (--color-*), re-read on a theme flip or a "Change the style" pick
 *   - reduced motion: each scene draws its final, still frame once (and again on resize or theme change)
 *   - pointer effects are mouse and pen only, so touch scrolling is never caught
 *
 * Components: src/directions/a/PixelTrailA, PixelFlowA, PixelIconA, PixelAuditA, PixelMarqueeA.
 */
import { mulberry32, smooth } from './pixel-field';

export { mulberry32, smooth };

export type RGB = [number, number, number];

/** The palette a scene draws with, resolved from the current theme's tokens. */
export interface Colors {
  page: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  hot: string;
  /** soft pastels, as on the site */
  sage: string;
  lavender: string;
  peach: string;
  butter: string;
  mauve: string;
  /** the same pastels made stronger, for cells that must read as marks (drift, rejects) */
  sageDeep: string;
  lavenderDeep: string;
  peachDeep: string;
  butterDeep: string;
  mauveDeep: string;
  /** a faint ink, for tracks and guides */
  faint: string;
  dark: boolean;
}

let probe: HTMLElement | null = null;
/** Any CSS colour (hex, rgb, color-mix…) to [r, g, b], resolved by the browser. */
function resolve(value: string): RGB {
  if (!probe) {
    probe = document.createElement('i');
    probe.style.display = 'none';
    document.body.appendChild(probe);
  }
  probe.style.color = '';
  probe.style.color = value;
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0'];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

const rgb = (c: RGB, a = 1) => (a >= 1 ? `rgb(${c.map(Math.round).join(',')})` : `rgba(${c.map(Math.round).join(',')},${a})`);

function toHsl([r, g, b]: RGB): RGB {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}
function fromHsl([h, s, l]: RGB): RGB {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}
/** A pastel made to read as a mark: more saturated, and pushed away from the page (darker by day, lighter at night). */
function deepen(c: RGB, dark: boolean): RGB {
  const [h, s, l] = toHsl(c);
  return fromHsl([h, Math.min(1, s + 0.22), dark ? Math.min(0.72, l + 0.2) : Math.max(0.28, l - 0.22)]);
}

let colors: Colors | null = null;
export function readColors(): Colors {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string) => resolve(cs.getPropertyValue(`--color-${n}`).trim() || '#888');
  const page = v('page');
  const dark = toHsl(page)[2] < 0.4;
  const ink = v('ink');
  const p = { sage: v('sage'), lavender: v('lavender'), peach: v('peach'), butter: v('butter'), mauve: v('mauve') };
  colors = {
    page: rgb(page),
    surface: rgb(v('surface')),
    ink: rgb(ink),
    muted: rgb(v('muted')),
    accent: rgb(v('accent')),
    hot: rgb(v('hot')),
    sage: rgb(p.sage),
    lavender: rgb(p.lavender),
    peach: rgb(p.peach),
    butter: rgb(p.butter),
    mauve: rgb(p.mauve),
    sageDeep: rgb(deepen(p.sage, dark)),
    lavenderDeep: rgb(deepen(p.lavender, dark)),
    peachDeep: rgb(deepen(p.peach, dark)),
    butterDeep: rgb(deepen(p.butter, dark)),
    mauveDeep: rgb(deepen(p.mauve, dark)),
    faint: rgb(ink, dark ? 0.08 : 0.06),
    dark,
  };
  return colors;
}
export const getColors = (): Colors => colors ?? readColors();

/** Seeded 2D value noise on a 64×64 lattice (wraps). */
export function valueNoise(seed: number) {
  const r = mulberry32(seed);
  const lat = Float32Array.from({ length: 64 * 64 }, r);
  const g = (a: number, b: number) => lat[(a & 63) * 64 + (b & 63)];
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = smooth(x - xi), yf = smooth(y - yi);
    const a = g(xi, yi), b = g(xi + 1, yi), c = g(xi, yi + 1), d = g(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

export const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

/** One square cell with a 1px seam, snapped to whole px so it stays crisp. */
export function cell(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.fillRect(Math.round(x), Math.round(y), size - 1, size - 1);
}

export interface Scene {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** css px */
  W: number;
  H: number;
  /** pointer in canvas px; far away when it isn't over the host */
  px: number;
  py: number;
  inside: boolean;
  visible: boolean;
  /** performance.now() when the scene first came on screen (0 until then) */
  started: number;
  reduced: boolean;
  /** set by the scene or the engine: draw on the next tick even when idle */
  dirty: boolean;
}

export interface SceneSpec<S extends Scene = Scene> {
  /** (re)build the cells for the current size; called on mount, resize, theme change and when fonts load */
  layout?: (s: S, c: Colors) => void;
  /** draw one frame; t = seconds since the scene started (fixed under reduced motion). Return true to keep drawing. */
  draw: (s: S, c: Colors, t: number) => boolean;
  /** the element that takes the pointer (defaults to the canvas's parent) */
  host?: HTMLElement | null;
  onMove?: (s: S) => void;
  onStart?: (s: S) => void;
  /** how much of the scene must be on screen to start it */
  threshold?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const live: { s: Scene; spec: SceneSpec<any>; drawn: boolean }[] = [];
let looping = false;
let last = 0;

function frame(ms: number) {
  requestAnimationFrame(frame);
  if (document.hidden || ms - last < 33) return;
  last = ms;
  const c = getColors();
  const dpr = Math.min(2, devicePixelRatio || 1);
  for (const item of live) {
    const { s, spec } = item;
    // draw when something changed; offscreen, only the first frame (so a scene is never blank when it scrolls in)
    if (!s.W || !s.dirty || (!s.visible && item.drawn)) continue;
    const t = s.reduced ? 99 : s.started ? (ms - s.started) / 1000 : 0;
    s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const keep = spec.draw(s, c, t);
    item.drawn = true;
    s.dirty = !s.reduced && keep;
  }
}

function relayoutAll() {
  const c = readColors();
  for (const item of live) {
    item.spec.layout?.(item.s, c);
    item.s.dirty = true;
    item.drawn = false;
  }
}

let watching = false;
function watchTheme() {
  if (watching) return;
  watching = true;
  new MutationObserver(relayoutAll).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', relayoutAll);
  addEventListener('nicey:tokens', relayoutAll);
  document.fonts?.ready.then(relayoutAll);
}

/** Mount a scene on a canvas. Safe to call twice (the second call is ignored). */
export function mountScene<S extends Scene>(canvas: HTMLCanvasElement, spec: SceneSpec<S>, extra: Omit<S, keyof Scene>): S | null {
  if (canvas.dataset.ready) return null;
  canvas.dataset.ready = '1';
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const s = {
    canvas, ctx, W: 0, H: 0, px: -1e4, py: -1e4, inside: false, visible: false, started: 0,
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, dirty: true, ...extra,
  } as S;
  const item = { s, spec, drawn: false };
  live.push(item);
  watchTheme();

  const size = () => {
    const r = canvas.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    s.W = r.width;
    s.H = r.height;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    spec.layout?.(s, getColors());
    s.dirty = true;
    item.drawn = false;
  };
  new ResizeObserver(size).observe(canvas);
  size();

  new IntersectionObserver(
    (e) => {
      s.visible = e[0].isIntersecting;
      if (s.visible && !s.started) {
        s.started = performance.now();
        spec.onStart?.(s);
        s.dirty = true;
      }
      if (s.visible) s.dirty = true;
    },
    { threshold: spec.threshold ?? 0.3 },
  ).observe(canvas);

  if (!s.reduced) {
    const host = spec.host ?? canvas.parentElement ?? canvas;
    host.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType === 'touch') return;
        const r = canvas.getBoundingClientRect();
        s.px = e.clientX - r.left;
        s.py = e.clientY - r.top;
        s.inside = true;
        s.dirty = true;
        spec.onMove?.(s);
      },
      { passive: true },
    );
    host.addEventListener('pointerleave', () => {
      s.inside = false;
      s.px = s.py = -1e4;
      s.dirty = true;
    });
  }

  if (!looping) {
    looping = true;
    requestAnimationFrame(frame);
  }
  return s;
}

/** Push (x, y) away from the pointer within radius r by up to `force` px. */
export function repel(s: Scene, x: number, y: number, r: number, force: number): [number, number] {
  const dx = x - s.px, dy = y - s.py, d = Math.hypot(dx, dy);
  if (d >= r) return [x, y];
  const f = (1 - d / r) * force;
  return [x + (dx / (d || 1)) * f, y + (dy / (d || 1)) * f];
}
