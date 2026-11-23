/**
 * Direction A · QBench status workflows "See it work": the five steps and (later) their real product screens.
 * `src` is empty → the window shows a placeholder. 23 Nov (Emir): the cleanest designed screens, not the whole flow —
 * the test page was only a platform screenshot and the bulk table didn't line up. Source screens:
 * Figma "Design System v1.0" › Status Workflows (bGZgiGgcB8HYiVtdsmUm4a): 1700:18362 admin, 1865:24615 test page,
 * 3061:47310 editor with rules, 2215:27607 any-status rule, 1531:18503 version history; modals on the design's own
 * blurred page + 54% overlay: required fields = export copy 11878:72849 (rows aligned, originals untouched), signature 2355:35447.
 */
export type StatusStep = {
  n: string;
  role: 'Admin' | 'Lab user';
  title: string;
  text: string;
  /** real screen, e.g. /work/qbench/status/01.jpg — empty = placeholder */
  src: string;
  alt: string;
};

export const statusSteps: StatusStep[] = [
  {
    n: '01',
    role: 'Admin',
    title: 'Draw the workflow',
    text: 'Statuses, the moves between them, and the rules each move needs.',
    src: '/work/qbench/status/01-draw.webp',
    alt: 'QBench workflow editor: statuses on the left, the graph in the middle, and the move’s rules on the right with Require fields on',
  },
  {
    n: '02',
    role: 'Admin',
    title: 'Any status rule',
    text: 'One switch lets every status move into this one.',
    src: '/work/qbench/status/02-any-status.webp',
    alt: 'Workflow editor: Scheduled to Start reachable from any status, shown with an ANY STATUS tag',
  },
  {
    n: '03',
    role: 'Admin',
    title: 'Draft, then publish',
    text: 'Every version is kept. A draft goes live when published.',
    src: '/work/qbench/status/03-versions.webp',
    alt: 'Workflow version history: the published version and earlier drafts, with Publish draft in the menu',
  },
  {
    n: '04',
    role: 'Lab user',
    title: 'Fill the required fields',
    text: 'Page 1: the fields the admin picked for this move.',
    src: '/work/qbench/status/04-fields.webp',
    alt: 'Complete required actions modal, step 1: Turnaround, Assigned technician and Estimated complete date',
  },
  {
    n: '05',
    role: 'Lab user',
    title: 'Sign once',
    text: 'Page 2: signature, PIN and comment in one step.',
    src: '/work/qbench/status/05-sign.webp',
    alt: 'Complete required actions modal, step 2: name, date, signature, comment and PIN',
  },
];
