/**
 * The engine behind the case-study films (src/directions/a/Film*.astro): a chapter bar over one stage, scenes that
 * play one after another while the stage is on screen, a cursor that moves to elements and clicks.
 * Each scene gives `play` (the animation; it checks `ctx.live(id)` between steps so a newer run can take over),
 * `set` (jump to its start or finished state) and `dur` (seconds, for the chapter's fill bar — measured play length, keep in sync when a scene changes).
 * Reduced motion: every scene shows its finished state, the chapters switch scenes, no cursor.
 */
export interface FilmCtx {
  sleep: (ms: number) => Promise<void>;
  /** where `to` would put the cursor tip, relative to the stage */
  point: (el: Element, dx?: number, dy?: number) => { x: number; y: number };
  to: (el: Element, dx?: number, dy?: number) => Promise<void>;
  click: () => Promise<void>;
  hideCursor: () => void;
  live: (id: number) => boolean;
  name: (el: HTMLElement, text: string, flash?: boolean) => void;
}
export interface FilmScene {
  play: (ctx: FilmCtx, id: number) => Promise<void>;
  set: (done: boolean) => void;
  dur: number;
}

export function mountFilm(root: HTMLElement, scenesFor: (root: HTMLElement) => FilmScene[]) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = root.querySelector<HTMLElement>('.cw-stage')!;
  const cursor = root.querySelector<SVGElement>('.cw-cursor')!;
  const chs = Array.from(root.querySelectorAll<HTMLElement>('[data-cw-ch]'));
  const panes = Array.from(root.querySelectorAll<HTMLElement>('[data-cw-scene]'));
  const scenes = scenesFor(root);
  let run = 0;
  let visible = false;
  // ?scene=2 opens a film on its second scene (review links)
  let cur = Math.min(Math.max(Number(new URLSearchParams(location.search).get('scene')) - 1 || 0, 0), scenes.length - 1);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const ctx: FilmCtx = {
    sleep,
    live: (id) => id === run,
    hideCursor: () => cursor.classList.remove('is-shown'),
    point: (el, dx = 0.5, dy = 0.55) => {
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - s.left + r.width * dx, y: r.top - s.top + r.height * dy };
    },
    to: async (el, dx = 0.5, dy = 0.55) => {
      const { x, y } = ctx.point(el, dx, dy);
      // first move after the cursor was hidden: appear a short way off the target and glide in,
      // instead of flying in from the stage corner or from the last scene's spot
      if (!cursor.classList.contains('is-shown')) {
        cursor.style.transition = 'none';
        cursor.style.transform = `translate(${x + 56}px, ${y + 40}px)`;
        cursor.getBoundingClientRect();
        cursor.style.transition = '';
        cursor.classList.add('is-shown');
      }
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      await sleep(760);
    },
    click: async () => {
      cursor.classList.remove('is-click');
      cursor.getBoundingClientRect();
      cursor.classList.add('is-click');
      await sleep(240);
    },
    name: (el, text, flash = true) => {
      el.textContent = text;
      if (!flash) return;
      el.classList.add('is-live');
      setTimeout(() => el.classList.remove('is-live'), 1200);
    },
  };

  const show = (i: number) => {
    cur = i;
    panes.forEach((p, k) => (p.hidden = k !== i));
    chs.forEach((c, k) => {
      c.setAttribute('aria-selected', String(k === i));
      c.style.setProperty('--dur', `${scenes[k].dur}s`);
      c.classList.add('is-start');
    });
    if (!reduced) requestAnimationFrame(() => requestAnimationFrame(() => chs[i].classList.remove('is-start')));
    ctx.hideCursor();
  };

  if (reduced) {
    scenes.forEach((s) => s.set(true));
    show(cur);
    chs.forEach((c, i) => c.addEventListener('click', () => show(i)));
    return;
  }

  async function loop(start: number) {
    const id = ++run;
    let i = start;
    while (visible && id === run) {
      show(i);
      await scenes[i].play(ctx, id);
      if (id !== run) return;
      i = (i + 1) % scenes.length;
    }
  }
  chs.forEach((c, i) =>
    c.addEventListener('click', () => {
      if (visible) loop(i);
      else show(i);
    }),
  );
  new IntersectionObserver(
    (es) => {
      visible = es[0].isIntersecting;
      if (visible) loop(cur);
      else run++;
    },
    { threshold: 0.3 },
  ).observe(stage);
}
