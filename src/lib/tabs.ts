/**
 * Tab behaviour shared by every tab list on the site (Services, Chapters, Decisions, the audit report, the QBench
 * reader): which tab is selected, roving tabindex, and the keyboard (← → / ↑ ↓, Home, End). Each component keeps
 * only what it shows when a tab changes.
 */

/** mark tab `i` selected: aria-selected and a single tab stop */
export function selectTab(list: ArrayLike<HTMLElement>, i: number) {
  Array.from(list).forEach((t, k) => {
    t.setAttribute('aria-selected', String(k === i));
    t.tabIndex = k === i ? 0 : -1;
  });
}

/**
 * Arrow keys move between tabs (wrapping), Home/End jump to the ends. `go(i)` is called with the new index; focus
 * moves to that tab afterwards. `vertical` also accepts ↑ ↓ (a stacked list).
 */
export function tabKeys(list: ArrayLike<HTMLElement>, go: (i: number) => void, { vertical = false } = {}) {
  const tabs = Array.from(list);
  const n = tabs.length;
  tabs.forEach((t, i) =>
    t.addEventListener('keydown', (e) => {
      let to = -1;
      if (e.key === 'ArrowRight' || (vertical && e.key === 'ArrowDown')) to = (i + 1) % n;
      else if (e.key === 'ArrowLeft' || (vertical && e.key === 'ArrowUp')) to = (i - 1 + n) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to < 0) return;
      e.preventDefault();
      go(to);
      tabs[to].focus();
    }),
  );
}
