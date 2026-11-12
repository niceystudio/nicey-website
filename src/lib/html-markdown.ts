/**
 * Our own rendered HTML → plain Markdown, for the homepage's machine view and /index.md.
 * Not a general converter: it reads the markup this site writes. It keeps what a screen reader
 * reads (headings, text, lists, links, sr-only labels) and drops decoration (aria-hidden,
 * svg, canvas, script, style, buttons that only drive UI).
 */
const SKIP = new Set(['script', 'style', 'svg', 'canvas', 'template', 'noscript', 'button', 'textarea', 'select']);
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'col', 'area', 'base', 'embed', 'track']);
const BLOCK = new Set([
  'p', 'div', 'section', 'article', 'header', 'footer', 'figure', 'figcaption', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'details', 'summary', 'table', 'tr', 'main', 'nav', 'aside', 'pre',
]);

const SPACED = new Set(['span', 'a', 'i', 'em', 'small', 'label', 'abbr', 'time', 'sup', 'sub', 'mark', 'q', 'cite', 'data', 'output', 'kbd']);

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

type Frame = { tag: string; skip: boolean; href?: string; start: number };

export function htmlToMarkdown(html: string, base: URL): string {
  const out: string[] = [];
  let buf = '';
  const stack: Frame[] = [];
  const skipping = () => stack.some((f) => f.skip);
  const flush = () => {
    const t = buf.replace(/[ \t\n]+/g, ' ').trim();
    if (t) out.push(t);
    buf = '';
  };
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[5] !== undefined) {
      if (!skipping()) buf += decode(m[5]);
      continue;
    }
    if (!m[2]) continue; // comment
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    if (!closing) {
      // a hidden tab panel is still content (only not shown yet), so it stays in the text
      const hidden =
        /\baria-hidden="true"|\bhidden(\s|=|$)|\bdata-md-skip\b/.test(attrs) &&
        !/\bclass="[^"]*sr-only/.test(attrs) &&
        !(/\brole="tabpanel"/.test(attrs) && !/\baria-hidden="true"/.test(attrs));
      // a labelled figure (a drawn illustration) is read as its label, not as its parts
      const figLabel = tag === 'figure' ? attrs.match(/\baria-label="([^"]*)"/)?.[1] : undefined;
      if (figLabel && !skipping()) {
        flush();
        out.push(`*${decode(figLabel)}*`);
      }
      const skip = SKIP.has(tag) || hidden || !!figLabel;
      if (VOID.has(tag) || m[4] === '/') {
        if (tag === 'br' && !skipping()) buf += ' ';
        continue;
      }
      if (BLOCK.has(tag) && !skipping()) flush();
      else if (SPACED.has(tag) && !skipping()) buf += ' ';
      const href = tag === 'a' ? attrs.match(/\bhref="([^"]*)"/)?.[1] : undefined;
      const frame: Frame = { tag, skip, href, start: buf.length };
      stack.push(frame);
      if (skipping()) continue;
      if (/^h[1-6]$/.test(tag)) buf += `${'#'.repeat(Number(tag[1]))} `;
      else if (tag === 'li') {
        const list = [...stack].reverse().find((f) => f.tag === 'ol' || f.tag === 'ul');
        // the site writes its own step numbers (01, Step 02…), so ordered lists stay plain bullets
        if (list) buf += '- ';
      } else if (tag === 'dt' || tag === 'strong' || tag === 'b') buf += '**';
      else if (tag === 'blockquote') buf += '> ';
      else if (tag === 'code') buf += '`';
    } else {
      // close the nearest matching frame
      let i = stack.length - 1;
      while (i >= 0 && stack[i].tag !== tag) i--;
      if (i < 0) continue;
      const wasSkipping = skipping();
      const frame = stack[i];
      stack.length = i;
      if (wasSkipping && (frame.skip || skipping())) {
        if (frame.skip && BLOCK.has(tag)) flush();
        continue;
      }
      if (tag === 'dt' || tag === 'strong' || tag === 'b') buf = buf.replace(/\s+$/, '') + '**';
      else if (tag === 'code') buf += '`';
      else if (tag === 'a' && frame.href && !frame.href.startsWith('#') && frame.href !== '') {
        const text = buf.slice(frame.start).replace(/\s+/g, ' ').trim();
        if (text) buf = `${buf.slice(0, frame.start)}[${text}](${new URL(frame.href, base).href})`;
      }
      if (BLOCK.has(tag)) flush();
      else if (SPACED.has(tag)) buf += ' ';
    }
  }
  flush();
  // tidy: drop empty markers, join, keep a blank line between blocks
  return out
    .filter((l) => !/^(-|\d+\.|#+|\*\*\*\*)$/.test(l))
    .map((l) => l.replace(/\*\*\s*\*\*/g, '').replace(/\s+([.,:;!?])/g, '$1'))
    .filter((l, k, a) => l !== a[k - 1])
    .join('\n\n');
}
