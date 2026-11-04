/**
 * Pixel field generator — the brand pattern engine.
 *
 * Pure math, no DOM: every consumer (the hero canvas, thumbnail exports,
 * video renders, the playground) imports from here so the pattern has one
 * source of truth. The hero in PixelField.astro is the reference
 * implementation of the animated drift field; the static modes (ripple
 * rings, filled drops) share the same palette, noise, and feather.
 *
 * All spatial inputs are normalized 0..1 unless a name says px.
 */

/** [r, g, b, alpha] stop across the noise value range. */
export type Stop = [number, number, number, number];

export interface Palette {
  /** Page/frame background behind the cells. */
  bg: string;
  /** Evenly spaced stops mapped over the field value 0..1. */
  stops: Stop[];
}

/** Soft pastels on cream — matches the site hero. */
export const LIGHT_PALETTE: Palette = {
  bg: '#f3f0e9',
  stops: [
    [243, 240, 233, 0],
    [203, 218, 196, 0.4], // sage
    [217, 210, 239, 0.5], // lavender
    [246, 217, 196, 0.52], // peach
    [242, 230, 188, 0.46], // butter
    [216, 198, 224, 0.5], // soft mauve
  ],
};

/** After dark on the site: the same hues pulled down to deep tints on near-black. */
export const DARK_PALETTE: Palette = {
  bg: '#141410',
  stops: [
    [20, 20, 16, 0],
    [78, 101, 71, 0.34], // sage
    [88, 80, 132, 0.44], // lavender
    [126, 88, 64, 0.4], // peach
    [120, 104, 58, 0.36], // butter
    [104, 74, 110, 0.42], // soft mauve
  ],
};

/**
 * The export/cover dark: charcoal ground, indigo-led mids, amber ridges,
 * lavender glow peaks. Low end fully transparent so the dark ground
 * breathes; peaks glow instead of wash. Used by the Figma cover set.
 */
export const GLOW_DARK_PALETTE: Palette = {
  bg: '#1e1d18',
  stops: [
    [30, 29, 24, 0],
    [92, 116, 84, 0], // ghost sage
    [104, 94, 180, 0.24], // violet
    [146, 116, 186, 0.36], // mauve
    [205, 150, 98, 0.42], // amber
    [182, 162, 232, 0.62], // bright lavender
  ],
};

export const smooth = (t: number): number => t * t * (3 - 2 * t);

/** Deterministic PRNG — same seed, same field, same export. */
export function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface DriftOptions {
  /** Noise lattice size. The hero uses 10x5 for a ~2:1 canvas. */
  cols?: number;
  rows?: number;
  /** Multiplier on temporal drift; the hero uses 2. */
  driftSpeed?: number;
  /** Seed for a reproducible field; omit for a random one per call. */
  seed?: number;
}

export interface DriftField {
  cols: number;
  rows: number;
  /** Field value at normalized (x, y) and time t seconds. Roughly 0..1. */
  sample(x: number, y: number, t: number): number;
}

/**
 * Slow-drifting value noise: per-node random bias/phase/speed, bilinear
 * interpolation with smoothstep. `sample(x, y, 0)` of a seeded field is
 * the static variant used by thumbnails.
 */
export function createDrift(opts: DriftOptions = {}): DriftField {
  const cols = opts.cols ?? 10;
  const rows = opts.rows ?? 5;
  const driftSpeed = opts.driftSpeed ?? 2;
  const rand = opts.seed === undefined ? Math.random : mulberry32(opts.seed);

  const phase: number[] = [];
  const speed: number[] = [];
  const bias: number[] = [];
  for (let i = 0; i < cols * rows; i++) {
    phase.push(rand() * Math.PI * 2);
    speed.push(0.15 + rand() * 0.25);
    bias.push(rand() * 0.5);
  }

  const node = (cx: number, cy: number, t: number) => {
    const i = cy * cols + cx;
    return bias[i] + 0.5 * (0.5 + 0.5 * Math.sin(t * driftSpeed * speed[i] + phase[i]));
  };

  return {
    cols,
    rows,
    sample(x, y, t) {
      const gx = x * (cols - 1);
      const gy = y * (rows - 1);
      const x0 = Math.floor(gx);
      const y0 = Math.floor(gy);
      const x1 = Math.min(x0 + 1, cols - 1);
      const y1 = Math.min(y0 + 1, rows - 1);
      const tx = smooth(gx - x0);
      const ty = smooth(gy - y0);
      const top = node(x0, y0, t) + (node(x1, y0, t) - node(x0, y0, t)) * tx;
      const bot = node(x0, y1, t) + (node(x1, y1, t) - node(x0, y1, t)) * tx;
      return top + (bot - top) * ty;
    },
  };
}

/** Interpolate palette stops at value v (clamped 0..1). */
export function colorAt(stops: Stop[], v: number): Stop {
  const pos = Math.min(0.9999, Math.max(0, v)) * (stops.length - 1);
  const i = Math.floor(pos);
  const t = pos - i;
  const a = stops[i];
  const b = stops[i + 1];
  const mix = (x: number, y: number) => x + (y - x) * t;
  return [mix(a[0], b[0]) | 0, mix(a[1], b[1]) | 0, mix(a[2], b[2]) | 0, mix(a[3], b[3])];
}

/** CSS color for a stop, with the alpha formatting the hero has always used. */
export const cssColor = ([r, g, b, a]: Stop): string => `rgba(${r},${g},${b},${a.toFixed(3)})`;

export interface Ripple {
  /** Center in px, canvas space. */
  x: number;
  y: number;
  /** Emit time in seconds on the same clock passed to waveAt. */
  t0: number;
}

export interface RippleConstants {
  /** px/sec the ring expands. */
  speed: number;
  /** px thickness of the wave band. */
  width: number;
  /** sec until a ripple fully fades. */
  life: number;
}

/** The site hero's wave constants. */
export const HERO_RIPPLE: RippleConstants = { speed: 720, width: 115, life: 1.35 };

/**
 * Wave strength at a point in px, summed across live ripples (0..~1 each).
 * Callers scale it themselves (the hero lifts cells by 0.5x and letters
 * by ~17px).
 */
export function waveAt(
  ripples: readonly Ripple[],
  px: number,
  py: number,
  t: number,
  c: RippleConstants = HERO_RIPPLE,
): number {
  let w = 0;
  for (const r of ripples) {
    const e = t - r.t0;
    if (e < 0 || e > c.life) continue;
    const radius = e * c.speed;
    const band = Math.abs(Math.hypot(px - r.x, py - r.y) - radius);
    if (band < c.width) w += Math.cos((band / c.width) * (Math.PI / 2)) * (1 - e / c.life);
  }
  return w;
}

export interface FeatherSpec {
  /** Fractions of the frame over which cells dissolve at each edge. */
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** The export/thumbnail fade: 7% sides, crisp-ish top, heavy bottom. */
export const COVER_FEATHER: FeatherSpec = { left: 0.07, right: 0.07, top: 0.05, bottom: 0.22 };

/** Alpha multiplier 0..1 at normalized (nx, ny) for the given edge fade. */
export function feather(nx: number, ny: number, f: FeatherSpec = COVER_FEATHER): number {
  let m = 1;
  if (f.left && nx < f.left) m *= smooth(nx / f.left);
  if (f.right && nx > 1 - f.right) m *= smooth((1 - nx) / f.right);
  if (f.top && ny < f.top) m *= smooth(ny / f.top);
  if (f.bottom && ny > 1 - f.bottom) m *= smooth((1 - ny) / f.bottom);
  return m;
}

/* ------------------------------------------------------------------ *
 * Static pattern modes (validated in the Figma thumbnail set).
 * Each returns a field value to feed through colorAt(stops, v - shift);
 * the drift snapshot uses shift 0.18, same as the hero.
 * ------------------------------------------------------------------ */

/**
 * Water-drop rings: damped concentric crests around an epicenter.
 * `d` px from the epicenter; `warp` is (noise - 0.5) * 0.8 for organic
 * wobble; wavelength ~95px and decay ~780-950px at 1600px wide.
 */
export function ringCrest(d: number, wavelength: number, warp: number): number {
  const ring = Math.cos((d / wavelength + warp) * Math.PI * 2);
  return Math.pow(Math.max(0, ring), 1.3);
}

/**
 * Filled disc: ~full inside half the radius, smooth falloff to the rim.
 * Warp `d` by (1 + (noise - 0.5) * 0.3) before calling for wobbled edges.
 */
export function discFill(d: number, radius: number): number {
  const t = Math.min(1, Math.max(0, (d - 0.5 * radius) / (0.5 * radius)));
  return 1 - smooth(t);
}
