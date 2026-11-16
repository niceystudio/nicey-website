/**
 * Browser helpers shared by the design directions: ordered (Bayer) dither and ASCII rendering
 * of real images, in the page's own colours. No invented data: they only redraw real screens.
 */

// 8×8 Bayer matrix, normalised to 0..1
export const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

export const hex = (s: string): [number, number, number] => {
  const m = s.trim().replace('#', '');
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};

export const cssColor = (name: string) => hex(getComputedStyle(document.documentElement).getPropertyValue(name));

export const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/**
 * "Ink" per pixel, 0..1, for a light product screenshot: its dark marks (text, borders, nav) are ink,
 * the grey app background becomes a light texture, white cards stay empty.
 */
export function inkMap(img: HTMLImageElement, cols: number, rows?: number, stretch = 2.4) {
  const W = cols;
  const H = rows ?? Math.round((cols * img.naturalHeight) / img.naturalWidth);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const o = c.getContext('2d', { willReadFrequently: true })!;
  o.drawImage(img, 0, 0, W, H);
  const px = o.getImageData(0, 0, W, H).data;
  const ink = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const l = 1 - (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
    ink[i] = Math.min(1, l * stretch);
  }
  return { ink, W, H };
}

/** ASCII lines from an ink map: denser glyphs for more ink */
export function asciiLines(ink: Float32Array, W: number, H: number, ramp = ' .:-=+*#%@') {
  const lines: string[] = [];
  for (let y = 0; y < H; y++) {
    let s = '';
    for (let x = 0; x < W; x++) s += ramp[Math.min(ramp.length - 1, Math.floor(ink[y * W + x] * ramp.length))];
    lines.push(s.replace(/\s+$/, ''));
  }
  return lines;
}
