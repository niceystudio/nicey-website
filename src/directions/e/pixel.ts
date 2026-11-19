/**
 * Direction E: build-time SVG textures and pixel marks (no runtime cost).
 * dessn.com paints its colour panels with torn, wavy two-tone strokes and decorates with flowers. Nicey's version
 * of that texture is made of square pixels: a two-tone wave field, ordered-dithered (Bayer 4×4), so the edge between
 * the tones breaks into pixels — the same pixel/dither language as the rest of the brand. The "flowers" become
 * small pixel marks (7×7) drawn from a few patterns.
 */

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

/** A seamless-ish pixel wave texture as a data URI (use as background-image, repeat). */
export function pixelWaves(base: string, light: string, opts: { cell?: number; w?: number; h?: number; seed?: number } = {}) {
  const cell = opts.cell ?? 8;
  const w = opts.w ?? 480;
  const h = opts.h ?? 480;
  const seed = opts.seed ?? 1;
  const cols = Math.round(w / cell);
  const rows = Math.round(h / cell);
  let rects = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // diagonal bands, bent by two sines (periodic over the tile so it repeats cleanly)
      const u = (x / cols) * Math.PI * 2;
      const v = (y / rows) * Math.PI * 2;
      const field = Math.sin(u * 2 + v * 3 + seed) * 0.55 + Math.sin(u * 3 - v * 2 + seed * 2.1) * 0.45;
      const t = (field + 1) / 2; // 0..1
      // keep the middle of the band crisp, dither only the edges
      const edge = Math.min(1, Math.max(0, (t - 0.42) / 0.22));
      if (edge > BAYER4[(y % 4) * 4 + (x % 4)]) rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${base}"/><g fill="${light}">${rects}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** 7×7 pixel marks (the stand-in for dessn's flowers): 1 = outer colour, 2 = centre colour. */
const MARKS: Record<string, string[]> = {
  bloom: ['0011100', '0111110', '1112111', '1122211', '1112111', '0111110', '0011100'],
  spark: ['0001000', '0001000', '0012100', '1122211', '0012100', '0001000', '0001000'],
  block: ['1111111', '1222221', '1211121', '1210121', '1211121', '1222221', '1111111'],
  stack: ['0000000', '1111111', '0000000', '1122211', '0000000', '1111111', '0000000'],
};

export function pixelMark(kind: keyof typeof MARKS, outer: string, centre: string, size = 28) {
  const rows = MARKS[kind];
  let r = '';
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c !== '0') r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c === '1' ? outer : centre}"/>`;
    }),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 7" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
