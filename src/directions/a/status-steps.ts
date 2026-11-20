/**
 * Direction A · QBench status workflows "See it work": the five steps and (later) their real product screens.
 * `src` is empty → the window shows a placeholder (Emir, 20 Nov: layout first, real screens later). Source screens:
 * Figma "Design System v1.0" › Status Workflows (bGZgiGgcB8HYiVtdsmUm4a): 1700:18362 admin, 1865:24615 test page,
 * 1861:27207 required fields, 2348:40345 signature, 2349:40475 bulk. Copy rough — Goran + Predrag polish it later.
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
    src: '',
    alt: 'QBench workflow editor: statuses on the left, the workflow graph in the middle, the transition rules on the right',
  },
  {
    n: '02',
    role: 'Lab user',
    title: 'Change the status',
    text: 'From the test page. Only the moves the workflow allows come next.',
    src: '',
    alt: 'QBench test detail page with the status field',
  },
  {
    n: '03',
    role: 'Lab user',
    title: 'Fill the required fields',
    text: 'Page 1: the fields the admin picked for this move.',
    src: '',
    alt: 'Complete required actions modal, step 1: required fields',
  },
  {
    n: '04',
    role: 'Lab user',
    title: 'Sign once',
    text: 'Page 2: signature, PIN and comment in one step.',
    src: '',
    alt: 'Complete required actions modal, step 2: signature and PIN',
  },
  {
    n: '05',
    role: 'Lab user',
    title: 'Many tests at once',
    text: 'Bulk: a row per test, a column per field.',
    src: '',
    alt: 'Bulk required fields: one row per test, one column per field',
  },
];
