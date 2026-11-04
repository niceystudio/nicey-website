/**
 * The QBench proof field: a unit chart drawn on <canvas>.
 *
 * Every cell is one real outside-library reference (1,071). In "After" a
 * measurement line sweeps the field, the references dissolve behind it,
 * and 141 of them (one per component) travel into a 12-wide accent block.
 * Ported from reference/explorations/nicey-proof-panel.html; palette and
 * noise come from pixel-field.ts.
 */
import {
  DARK_PALETTE,
  LIGHT_PALETTE,
  colorAt,
  createDrift,
  mulberry32,
  smooth,
  type Stop,
} from './pixel-field';

export const TOTAL = 1071;
export const KEEP = 141;
const BLOCK_COLS = 12;
const BLOCK_ROWS = Math.ceil(KEEP / BLOCK_COLS);
const DURATION = 2.8; // seconds for a full sweep
const AUTOPLAY_DELAY = 1000; // ms after the panel is half in view
const FPS_ACTIVE = 30;
const FPS_IDLE = 12;
const HOVER_RADIUS = 64;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const fmt = (n: number) => n.toLocaleString('en-US');

/** The silhouette the references sit under: a long rise, one bump, a short fall. */
function envelope(t: number): number {
  const rise = Math.pow(smooth(clamp(t / 0.8, 0, 1)), 1.5);
  const fall = 1 - 0.9 * smooth(clamp((t - 0.84) / 0.16, 0, 1));
  const bump = 0.14 * Math.exp(-(((t - 0.46) / 0.08) ** 2));
  const wob = 0.035 * Math.sin(t * 23 + 1.3) + 0.02 * Math.sin(t * 47);
  return clamp((0.05 + 0.95 * rise + bump + wob * rise) * fall, 0.02, 1);
}

interface Cell {
  c: number;
  r: number;
  h: number;
  x: number;
  y: number;
  /** per-cell offset so the dissolve reads as a ragged edge, not a wipe */
  j: number;
  keep: boolean;
  tx: number;
  ty: number;
}

interface Layout {
  W: number;
  H: number;
  x0: number;
  x1: number;
  top: number;
  bottom: number;
  cols: number;
  rows: number;
  pitch: number;
  size: number;
  blockX: number;
  blockTop: number;
  cells: Cell[];
}

/** Lay out exactly TOTAL cells under the envelope, as large as the box allows. */
export function layoutField(
  W: number,
  H: number,
  pad: { top: number; right: number; bottom: number; left: number },
): Layout | null {
  const fw = W - pad.left - pad.right;
  const fh = H - pad.top - pad.bottom;
  if (fw < 40 || fh < 40) return null;

  let pitch = 16;
  let cols = 0;
  let rows = 0;
  let env: number[] = [];
  for (; pitch >= 2; pitch--) {
    cols = Math.floor(fw / pitch);
    rows = Math.floor(fh / pitch);
    if (cols < BLOCK_COLS || rows < BLOCK_ROWS) continue;
    env = Array.from({ length: cols }, (_, c) => envelope(c / (cols - 1)));
    if (env.reduce((s, e) => s + Math.round(e * rows), 0) >= TOTAL) break;
  }
  if (!env.length) return null;
  const size = pitch >= 8 ? pitch - 2 : Math.max(1, pitch - 1);

  // scale the envelope so the column heights sum to exactly TOTAL
  let lo = 0;
  let hi = 1;
  const sum = (k: number) => env.reduce((s, e) => s + Math.round(e * rows * k), 0);
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (sum(m) < TOTAL) lo = m;
    else hi = m;
  }
  const heights = env.map((e) => Math.min(rows, Math.round(e * rows * hi)));
  let over = heights.reduce((s, h) => s + h, 0) - TOTAL;
  while (over > 0) {
    heights[heights.indexOf(Math.max(...heights))]--;
    over--;
  }
  while (over < 0) {
    // add to the shortest column that still has room
    let best = -1;
    for (let c = 0; c < cols; c++) if (heights[c] < rows && (best < 0 || heights[c] > heights[best])) best = c;
    if (best < 0) break;
    heights[best]++;
    over++;
  }

  const x0 = pad.left + Math.floor((fw - cols * pitch) / 2);
  const x1 = x0 + cols * pitch;
  const bottom = H - pad.bottom;
  const peak = heights.indexOf(Math.max(...heights));
  const bc0 = clamp(peak - BLOCK_COLS / 2, 0, cols - BLOCK_COLS);
  const blockX = x0 + bc0 * pitch;

  const jit = mulberry32(7);
  const cells: Cell[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < heights[c]; r++) {
      cells.push({
        c,
        r,
        h: heights[c],
        x: x0 + c * pitch,
        y: bottom - (r + 1) * pitch,
        j: jit() * 70,
        keep: false,
        tx: 0,
        ty: 0,
      });
    }
  }
  // 141 cells, spread evenly through the sweep, become the components
  for (let k = 0; k < KEEP; k++) {
    const cell = cells[Math.round(((k + 0.5) * TOTAL) / KEEP)];
    cell.keep = true;
    cell.tx = blockX + (k % BLOCK_COLS) * pitch;
    cell.ty = bottom - (Math.floor(k / BLOCK_COLS) + 1) * pitch;
  }

  return {
    W,
    H,
    x0,
    x1,
    top: pad.top,
    bottom,
    cols,
    rows,
    pitch,
    size,
    blockX,
    blockTop: bottom - BLOCK_ROWS * pitch,
    cells,
  };
}

const hexRgb = (h: string): [number, number, number] => {
  const v = h.trim().replace('#', '');
  const full = v.length === 3 ? v.replace(/./g, (x) => x + x) : v;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
};

export function mountProofField(root: HTMLElement): void {
  const box = root.querySelector<HTMLElement>('[data-field]');
  const canvas = root.querySelector<HTMLCanvasElement>('[data-field] canvas');
  const label = root.querySelector<HTMLElement>('[data-block-label]');
  const figure = root.querySelector<HTMLElement>('[data-figure]');
  const live = root.querySelector<HTMLElement>('[data-figure-live]');
  const note = root.querySelector<HTMLElement>('[data-note]');
  const readout = root.querySelector<HTMLElement>('[data-readout]');
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-state]'));
  const ctx = canvas?.getContext('2d');
  if (!box || !canvas || !ctx || !label || !figure || !live || !note || !readout) return;

  const html = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverQuery = window.matchMedia('(hover: hover)');
  let reduced = motionQuery.matches;

  const drift = createDrift({ seed: 0x2a });
  let L: Layout | null = null;
  let dpr = 1;
  let p = 0; // 0 = before, 1 = after
  let target = 0;
  let shown = TOTAL;
  let hover: { x: number; y: number } | null = null;
  let visible = false;
  let raf = 0;
  let lastDraw = 0;
  let played = false;
  let colours = { accent: [0, 0, 0] as number[], hot: '#000', stops: LIGHT_PALETTE.stops.slice(1) as Stop[] };

  const readColours = () => {
    const cs = getComputedStyle(html);
    const dark = html.dataset.theme === 'dark';
    colours = {
      accent: hexRgb(cs.getPropertyValue('--color-accent')),
      hot: cs.getPropertyValue('--color-hot').trim(),
      // skip stop 0 (the page colour) so every reference stays visible
      stops: (dark ? DARK_PALETTE : LIGHT_PALETTE).stops.slice(1),
    };
  };

  const clock = () => (reduced ? 4 : performance.now() / 1000);

  function build() {
    const rect = box!.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height);
    if (!W || !H) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas!.width = Math.round(W * dpr);
    canvas!.height = Math.round(H * dpr);
    const cs = getComputedStyle(box!);
    L = layoutField(W, H, {
      top: parseFloat(cs.paddingTop) || 0,
      right: parseFloat(cs.paddingRight) || 0,
      bottom: parseFloat(cs.paddingBottom) || 0,
      left: parseFloat(cs.paddingLeft) || 0,
    });
    placeLabel();
    draw(clock());
  }

  function placeLabel() {
    if (!L) return;
    const w = label!.offsetWidth;
    const left = Math.max(0, Math.min(L.blockX, L.W - w - 4));
    label!.style.left = `${left}px`;
    label!.style.bottom = `${L.H - L.blockTop + 12}px`;
  }

  function draw(t: number) {
    if (!L) return;
    const { cells, size, x0, x1, top, bottom, cols, rows } = L;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, L.W, L.H);

    // runs far enough past the last column that every cell, jitter included, finishes
    const span = x1 - x0 + 320;
    const sweep = x0 - 120 + easeInOutCubic(p) * span;
    const acc = colours.accent;
    const lift = hover && !reduced;
    let resolved = 0;

    for (const cell of cells) {
      const local = clamp((sweep - cell.x - cell.j) / 110, 0, 1);
      if (local >= 1) resolved++;
      let x = cell.x;
      let y = cell.y;
      let s = size;
      const v = drift.sample(cell.c / cols, cell.r / rows, t);
      const col = colorAt(colours.stops, v);
      let rgb = [col[0], col[1], col[2]];
      // column edges and the thin left tail sit quieter, like a halftone
      let a =
        (0.55 + 0.45 * clamp(cell.h / 22, 0, 1)) *
        smooth(clamp(Math.min(cell.c, cols - cell.c) / 5, 0.15, 1));
      if (cell.keep) {
        const m = smooth(local);
        x = lerp(cell.x, cell.tx, m);
        y = lerp(cell.y, cell.ty, m);
        rgb = rgb.map((c, i) => lerp(c, acc[i], m));
        a = lerp(a, 0.92, m);
      } else if (local > 0) {
        a *= 1 - local;
        s = size * (1 - 0.6 * local);
        if (a < 0.01) continue;
      }
      if (lift && hover) {
        const d = Math.hypot(x + size / 2 - hover.x, y + size / 2 - hover.y);
        if (d < HOVER_RADIUS) {
          const g = (1 - d / HOVER_RADIUS) ** 2;
          s += 4 * g;
          a = Math.min(1, a + 0.4 * g);
        }
      }
      ctx!.globalAlpha = a;
      ctx!.fillStyle = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
      const o = (size - s) / 2;
      ctx!.fillRect(x + o, y + o, s, s);
    }
    ctx!.globalAlpha = 1;

    // the sweep: one measurement line
    if (p > 0.001 && p < 0.999) {
      const x = Math.round(clamp(sweep, x0, x1)) + 0.5;
      ctx!.strokeStyle = colours.hot;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(x, Math.max(0, top - 40));
      ctx!.lineTo(x, bottom);
      ctx!.stroke();
    }

    const next = TOTAL - resolved;
    if (next !== shown) {
      shown = next;
      figure!.textContent = fmt(shown);
    }
  }

  function settle() {
    // announce once, at the end, not on every tick
    live!.textContent = fmt(shown);
    label!.classList.toggle('is-shown', target === 1 && p === 1);
  }

  function frame(ms: number) {
    raf = 0;
    if (!visible || reduced) return;
    const moving = p !== target;
    const interval = 1000 / (moving || hover ? FPS_ACTIVE : FPS_IDLE);
    if (ms - lastDraw >= interval - 1) {
      const dt = Math.min(0.1, (ms - lastDraw) / 1000);
      lastDraw = ms;
      if (moving) {
        const step = dt / DURATION;
        p = target > p ? Math.min(target, p + step) : Math.max(target, p - step);
      }
      draw(ms / 1000);
      if (moving && p === target) settle();
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!raf && visible && !reduced) {
      lastDraw = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  const NOTES = [note.dataset.before ?? '', note.dataset.after ?? ''];
  const READOUTS = [readout.dataset.before ?? '', readout.dataset.after ?? ''];
  let noteTimer = 0;

  function setTarget(s: 0 | 1) {
    if (s === target && p === s) return;
    target = s;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.state) === s)));
    readout!.textContent = READOUTS[s];
    label!.classList.remove('is-shown');
    window.clearTimeout(noteTimer);
    if (reduced) {
      note!.textContent = NOTES[s];
      p = s;
      draw(clock());
      settle();
      return;
    }
    note!.style.opacity = '0';
    noteTimer = window.setTimeout(() => {
      note!.textContent = NOTES[s];
      note!.style.opacity = '1';
    }, 200);
    start();
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      played = true; // a visitor's choice cancels the one-time autoplay
      setTarget(Number(b.dataset.state) === 1 ? 1 : 0);
    }),
  );

  // hover lift: pointer only, never touch
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || !hoverQuery.matches || reduced) return;
    const r = canvas.getBoundingClientRect();
    hover = { x: e.clientX - r.left, y: e.clientY - r.top };
    start();
  });
  canvas.addEventListener('pointerleave', () => {
    hover = null;
  });

  // play once, the first time the panel is at least half in view
  new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      visible = e.isIntersecting;
      if (visible) start();
      const halfIn = e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5;
      if (visible && halfIn && !played && !reduced) {
        played = true;
        window.setTimeout(() => {
          if (target === 0 && p === 0) setTarget(1);
        }, AUTOPLAY_DELAY);
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  ).observe(root);

  let resizeRaf = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(build);
  }).observe(box);

  // repaint on theme change
  new MutationObserver(() => {
    readColours();
    draw(clock());
  }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

  motionQuery.addEventListener('change', (e) => {
    reduced = e.matches;
    hover = null;
    if (reduced) {
      cancelAnimationFrame(raf);
      raf = 0;
      jumpToFinal();
    } else {
      start();
    }
  });

  /** Reduced motion: no sweep, no drift, no lift. Show the resolved state. */
  function jumpToFinal() {
    played = true;
    target = 1;
    p = 1;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.state) === 1)));
    note!.textContent = NOTES[1];
    readout!.textContent = READOUTS[1];
    draw(clock());
    settle();
  }

  readColours();
  build();
  if (reduced) jumpToFinal();
  document.fonts?.ready.then(build).catch(() => {});
}
