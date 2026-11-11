/**
 * The six case studies, copy verbatim from the "Case studies v2" canvas page
 * (frames 08.1–08.6). Text in [square brackets] is a gap to fill: it renders
 * as a dashed placeholder. "To collect" boxes are dashed as a whole.
 */

export type Band = 'lavender' | 'sage' | 'peach' | 'butter' | 'mauve' | 'stone';

export interface Collect {
  label: string;
  text: string;
}

/** One slide of the "Case Study Documentation" Figma file, rebuilt as a page section. */
export type ChapterBlock =
  | { kind: 'stats'; items: { value: string; label: string; caption: string; seenAt?: string }[] }
  | { kind: 'rows'; title: string; rows: { label: string; value: string }[] }
  | { kind: 'map'; title: string; rows: { from: string; to: string }[] }
  | { kind: 'ramp'; title: string; swatches: { step: string; hex: string; feeds?: boolean }[]; note: string }
  | { kind: 'chain'; title: string; root: string; links: { token: string; from: string; state: string }[] }
  | {
      kind: 'docs';
      title: string;
      items: { name: string; purpose: string; useFor: string; notFor: string; instead: string }[];
    }
  | { kind: 'flow'; title: string; steps: { n: string; name: string; text: string }[] }
  | { kind: 'checks'; title: string; subject: string; status: string; items: { value: string; label: string }[] }
  | { kind: 'meters'; title: string; items: { label: string; value: string }[] }
  | { kind: 'states'; title: string; rows: { state: string; token: string; example: string }[] }
  | { kind: 'audit'; title: string; layers: number; items: { label: string; value: string }[] }
  | { kind: 'surfaces'; title: string; items: { name: string; how: string }[] }
  | { kind: 'graph'; title: string; edges: { from: string; to: string; rules: string[] }[] }
  | { kind: 'order'; title: string; steps: { name: string; text: string }[] }
  | { kind: 'everywhere'; title: string; surfaces: { name: string; note: string }[] }
  | { kind: 'bulk'; title: string; outcomes: { label: string; title: string; text: string; cta: string }[] }
  | { kind: 'compare'; rows: { label: string; before: string; after: string; note: string }[] }
  | { kind: 'images'; images: { src: string; alt: string; width: number; height: number }[] };

export interface Chapter {
  /** e.g. "01 · Audit" */
  kicker: string;
  heading: string;
  lede: string;
  blocks: ChapterBlock[];
  /** the big figure with its "Seen at …" line */
  proof?: { value: string; caption: string; seenAt?: string }[];
}

/** an image from the Figma case study; `dark` is the night version if there is one */
export interface Shot {
  light: string;
  dark?: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  /** used in the "Next case study" link and the page title */
  linkName: string;
  name: string;
  band: Band;
  kicker: string;
  statement: string;
  lede: string;
  facts: { term: string; detail: string }[];
  who: string;
  /** the block under the hero: a project image, or Everbreed's audit callout */
  lead?:
    | { kind: 'image'; placeholder: string; src?: Shot; alt?: string }
    | { kind: 'audit'; heading: string; text: string; cta: string };
  numbersHeading: string;
  numbers: { value: string; label: string; meaning: string }[];
  /** a custom visual on the right of the hero */
  heroVisual?: 'qbench-build' | 'qbench-status' | 'everbreed';
  /** one line above the hero visual that says what it shows */
  heroContext?: string;
  /** product decisions: the problem, what we did, and a small UI piece that shows it */
  decisions?: {
    heading: string;
    items: { ui: 'table' | 'toast' | 'move' | 'log' | 'search'; title: string; problem: string; solved: string }[];
  };
  /** homepage-style section openers (caption + heading) above the custom sections */
  heads?: {
    proof?: { caption: string; heading: string };
    chapters?: { caption: string; heading: string };
    decisions?: { caption: string; heading: string };
    work?: { caption: string; heading: string };
  };
  /** heading of the "From the work" section */
  workHeading?: string;
  /** custom "From the work" visuals instead of image figures */
  workVisual?: 'qbench' | 'qbench-status' | 'everbreed';
  /** an animated before/after above the numbers */
  proofViz?: 'names' | 'surfaces';
  steps?: { label: string; inProgress?: boolean }[];
  /** the slides of the Figma case study, one section each */
  chapters?: Chapter[];
  /** 'scroll' = sticky rail + stacked steps (homepage Zero Drift layout); default tabs */
  chaptersLayout?: 'tabs' | 'scroll';
  note?: { heading: string; text: string };
  did: string[];
  /** 'gate': the five layers shown working (AgenticGate) instead of the dark card */
  agenticStyle?: 'band' | 'gate';
  agentic?: {
    kicker: string;
    heading: string;
    items: { label: string; text: string }[];
    footnote: string;
  };
  together: { text: string; collect: Collect };
  changed: { text: string; collect: Collect };
  work: { placeholder: string; caption: string; src?: Shot; alt?: string }[];
  /** questions about this project, shown before the CTA (facts from the page only) */
  faq?: { q: string; a: string }[];
  cta: { heading: string; text: string; label: string; action: 'audit' | 'call' };
  next: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'qbench-design-system',
    linkName: 'QBench design system',
    name: 'QBench',
    band: 'lavender',
    kicker: 'Case study · Design system · LIMS software',
    statement: 'A design system AI agents can build with.',
    lede: 'QBench’s lab software grew for years without a designer. We rebuilt its design system as one Figma library that designers, developers and AI agents read the same way.',
    facts: [
      { term: 'Company', detail: 'Lab information management (LIMS), B2B SaaS' },
      { term: 'Team', detail: '[Team size: engineers and designers]' },
      {
        term: 'Stack',
        detail: 'Legacy product plus a new app, Figma Foundation and Components libraries [confirm stack]',
      },
      { term: 'Scale', detail: '141 components across three library pages' },
      { term: 'Work by', detail: 'Goran Babarogić, product designer and design system engineer, June 2025 to now' },
    ],
    who: '',
    heroVisual: 'qbench-build',
    heroContext: 'Today, every component reads two ways: as UI for people, as props and tokens for agents.',
    workHeading: 'What the agent reads',
    heads: {
      proof: { caption: 'Before and after', heading: 'Every variable now has a name developers can type.' },
      chapters: { caption: 'What we did', heading: 'Five steps, from an audit to agents building screens.' },
      work: { caption: 'See it work', heading: 'What the agent reads' },
    },
    proofViz: 'names',
    agenticStyle: 'gate',
    workVisual: 'qbench',
    numbersHeading: 'Before and after',
    numbers: [
      {
        value: '1,071 → 0',
        label: 'references to libraries outside the Foundation',
        meaning: 'So design and code pull from one source, and nothing breaks when an outside file changes.',
      },
      {
        value: '11 → 0',
        label: 'external libraries the components depended on',
        meaning: 'So the library no longer leans on files nobody maintains.',
      },
      {
        value: '2 files → 1',
        label: 'for tokens and components',
        meaning: 'So a change to a token reaches every component on its own.',
      },
    ],
    chapters: [
      {
        kicker: '01 · Audit',
        heading: 'First, we measured what was really there.',
        lede: 'Scripts read every layer and report what is bound to a token, instead of trusting how it looks.',
        blocks: [
          {
            kind: 'audit',
            title: 'Token coverage · values bound to a token',
            layers: 1610,
            items: [
              { label: 'Fill', value: '97%' },
              { label: 'Stroke', value: '99.7%' },
              { label: 'Text', value: '99.8%' },
              { label: 'Corner radius', value: '100%' },
              { label: 'Gap', value: '99.8%' },
              { label: 'Padding', value: '100%' },
              { label: 'Effects', value: '99%' },
            ],
          },
        ],
        proof: [
          { value: '1,071 → 0', caption: 'references to outside libraries, repointed to the system.', seenAt: 'Seen at QBench' },
          { value: '99.5%', caption: 'of values bound to a token, across 1,610 component variants.' },
        ],
      },
      {
        kicker: '02 · One file',
        heading: 'One library, with the names developers type.',
        lede: 'Tokens and components moved into one file, and every variable got its CSS name.',
        blocks: [
          {
            kind: 'map',
            title: 'Figma variable → web code name',
            rows: [
              { from: 'text/default', to: 'var(--text-default)' },
              { from: 'surface/default', to: 'var(--surface-default)' },
              { from: 'primitives/primary/600', to: 'var(--primary-600)' },
              { from: 'spacing/4', to: 'var(--spacing-4)' },
              { from: 'radius/md', to: 'var(--radius-md)' },
            ],
          },
        ],
        proof: [{ value: '2 files → 1', caption: 'for tokens and components, so a token change reaches every component.' }],
      },
      {
        kicker: '03 · Tokens',
        heading: 'One colour ramp, aliased down to the button.',
        lede: 'Point at or tap a step of the ramp to see which button state it feeds.',
        blocks: [
          {
            kind: 'ramp',
            title: 'primitives / primary · 11 steps',
            swatches: [
              { step: '50', hex: 'F1F6FD' },
              { step: '100', hex: 'E4EFFC' },
              { step: '200', hex: 'D2E6FB' },
              { step: '300', hex: 'ACD1F4' },
              { step: '400', hex: '8FBEF0' },
              { step: '500', hex: '5B8ED7' },
              { step: '600', hex: '4074C7' },
              { step: '700', hex: '275FBE' },
              { step: '800', hex: '244D9E', feeds: true },
              { step: '900', hex: '23437B', feeds: true },
              { step: '950', hex: '182749' },
            ],
            note: '800 and 900 feed the primary button.',
          },
          {
            kind: 'chain',
            title: 'Alias chain · primary button',
            root: 'primary button',
            links: [
              { from: 'primitives/primary/800', token: 'button/surface/solid/primary/default', state: 'Default · 800' },
              { from: 'primitives/primary/900', token: 'button/surface/solid/primary/hover', state: 'Hover · 900' },
            ],
          },
        ],
        proof: [{ value: '256 → 178 → 2', caption: 'primitives, semantic tokens and component tokens.', seenAt: 'Three layers' }],
      },
      {
        kicker: '04 · States',
        heading: 'Every state comes from one shared token.',
        lede: 'Pick a state to see it on a real button and field, and the token behind it.',
        blocks: [
          {
            kind: 'states',
            title: 'Shared across the library',
            rows: [
              { state: 'Focus · button', token: 'ring/ring-selected', example: 'Create CAPA' },
              { state: 'Focus · text field', token: 'border/primary/default', example: 'Batch ID' },
              { state: 'Error · text field', token: 'border/critical/default', example: 'Batch ID' },
              { state: 'Disabled', token: 'opacity/disabled · 50%', example: 'Create CAPA' },
            ],
          },
        ],
        proof: [
          { value: '28', caption: 'components focus with the same ring style.', seenAt: 'Seen at QBench' },
          { value: '716', caption: 'layers fade with one opacity token when disabled.' },
        ],
      },
      {
        kicker: '05 · Agents build',
        heading: 'A developer hands over a PRD. An agent builds the screen.',
        lede: 'One skill builds in Figma from the library, a second checks every layer, a designer refines.',
        blocks: [
          {
            kind: 'flow',
            title: 'From PRD to screen',
            steps: [
              { n: '01', name: 'PRD', text: 'Issue list: filters, table, pagination.' },
              { n: '02', name: 'generate-screen', text: 'Reads design-conventions.md and library.json, then builds in Figma.' },
              { n: '03', name: 'check-screen', text: 'Walks every layer against the library and the allowed list.' },
              { n: '04', name: 'Designer', text: 'Refines the screen and hands it to development.' },
            ],
          },
          {
            kind: 'checks',
            title: 'Test run · check-screen',
            subject: 'Issue list · 239 layers',
            status: 'Pass · 0 issues',
            items: [
              { value: '0', label: 'Tokens from outside the library' },
              { value: '0', label: 'Raw colour or spacing values' },
              { value: '0', label: 'Components outside the allowed list' },
            ],
          },
        ],
        proof: [{ value: '243', caption: 'components the agent may use, all from the published library.', seenAt: 'Seen at QBench' }],
      },
    ],
    did: [
      'Audited the legacy system and pulled drifted colours, tokens and components back together.',
      'Built a token architecture in three layers, piloted it, then rolled it out.',
      'Defined every component state, with one link pattern instead of several.',
      'Set Code Connect as the contract between Figma and code.',
    ],
    agentic: {
      kicker: 'The agentic layer',
      heading: 'Docs agents might skip. A gate they can’t.',
      items: [
        { label: 'Rules', text: 'State the target. They never get softened to match the code.' },
        { label: 'Facts', text: 'Measure what the code does today. Generated, not written by hand.' },
        { label: 'Gap list', text: 'Maps one to the other. Deleting a row is the unit of progress.' },
        { label: 'Docs', text: 'Every component says when to use it and what to use instead: 126 of 126 sets.' },
        {
          label: 'Gate',
          text: 'A lint rule enforces the tokens, whether or not an agent read a single document.',
        },
      ],
      footnote:
        'Why it matters: a colour class with no token behind it renders nothing, the element inherits, and the screen still passes review. Only a gate catches that every time.',
    },
    together: {
      text: 'Embedded in the product team, with the design system and the product redesign moving in parallel. The migration was piloted on one area first, so engineers could check the token model against real screens before the rollout.',
      collect: {
        label: 'To collect · client quote',
        text: '“[A sentence from a QBench engineer or product lead on what changed for them.]”',
      },
    },
    changed: {
      text: 'The component library now runs on one Foundation, with no outside libraries behind it, and the Figma-to-code contract is in place for the rollout.',
      collect: {
        label: 'To collect · business result',
        text: '[One real result: time to build a screen, UI bugs, or how often an agent’s first attempt was usable, before and after.]',
      },
    },
    work: [
      {
        placeholder: '[Screenshot: token layers]',
        caption: 'The V2 variables in Figma: semantic tokens grouped by role, each one pointing at a primitive.',
      },
      {
        placeholder: '[Screenshot: library by function]',
        caption: 'Input and InputGroup in the library, with every state drawn: default, hover, focus, filled, disabled, error.',
      },
    ],
    faq: [
      {
        q: 'Did the product have to stop while the system changed?',
        a: '[Answer to add]',
      },
      {
        q: 'What happened to the old libraries?',
        a: '[Answer to add]',
      },
      {
        q: 'How do AI agents use the system?',
        a: '[Answer to add]',
      },
      {
        q: 'What stops the code from drifting again?',
        a: '[Answer to add]',
      },
      {
        q: 'How are component states kept consistent?',
        a: '[Answer to add]',
      },
    ],
    cta: {
      heading: 'Product built without a designer?',
      text: 'The free audit shows how far your design and code have drifted, and where to start.',
      label: 'Get a free audit',
      action: 'audit',
    },
    next: 'qbench-status-workflows',
  },

  {
    slug: 'qbench-status-workflows',
    linkName: 'QBench status workflows',
    name: 'QBench',
    band: 'sage',
    kicker: 'Case study · Product design · LIMS software',
    statement: 'One status model for every place a test can change.',
    lede: 'In QBench’s lab software, admins now draw one workflow for a test, and lab staff move tests through it with the compliance steps it needs, from any screen.',
    facts: [
      { term: 'Company', detail: 'Lab information management (LIMS), regulated industries' },
      { term: 'Team', detail: '[Team size]' },
      { term: 'Scope', detail: '8 surfaces that change a status, single and bulk' },
      { term: 'Timeline', detail: 'January to February 2026' },
      { term: 'Work by', detail: 'Goran Babarogić, product designer at QBench' },
    ],
    who: '',
    heroVisual: 'qbench-status',
    heroContext: 'Wherever a status changes, the same rules run in the same order.',
    proofViz: 'surfaces',
    workVisual: 'qbench-status',
    workHeading: 'Two people, one workflow',
    chaptersLayout: 'scroll',
    heads: {
      proof: { caption: 'Before and after', heading: 'Eight places that change a status. One model.' },
      chapters: { caption: 'What we did', heading: 'Five steps to one workflow on every screen.' },
      decisions: { caption: 'Product decisions', heading: 'Problems we solved' },
      work: { caption: 'See it work', heading: 'Two people, one workflow' },
    },
    numbersHeading: 'Before and after',
    numbers: [
      {
        value: '8 → 1',
        label: 'places a status could change, now on one model',
        meaning: 'So a status behaves the same wherever it’s changed.',
      },
    ],
    chapters: [
      {
        kicker: '01 · Map',
        heading: 'First, we found every place a status can change.',
        lede: 'Screens, bulk edits, imports, automations and the API. Each one had its own idea of what happens next.',
        blocks: [
          {
            kind: 'surfaces',
            title: 'Places a test status can change',
            items: [
              { name: 'Order detail page', how: 'Single' },
              { name: 'Test detail page', how: 'Single' },
              { name: 'Test list page', how: 'Bulk' },
              { name: 'Batch detail page', how: 'Bulk' },
              { name: 'Publishing a report', how: 'Prompt' },
              { name: 'Spreadsheet import', how: 'Import' },
              { name: 'Automations', how: 'System' },
              { name: 'API', how: 'System' },
            ],
          },
        ],
      },
      {
        kicker: '02 · Model',
        heading: 'One workflow: statuses, and the moves between them.',
        lede: 'An admin draws the workflow once. Pick a move to see the rules that travel with it.',
        blocks: [
          {
            kind: 'graph',
            title: 'Test approval workflow · example',
            edges: [
              { from: 'Not started', to: 'In progress', rules: ['Assigned people only'] },
              { from: 'In progress', to: 'Completed', rules: ['Required fields', 'E-signature', 'Reason'] },
              { from: 'In progress', to: 'Cancelled', rules: ['Reason'] },
            ],
          },
        ],
      },
      {
        kicker: '03 · Rules',
        heading: 'Compliance lives on the move, in one fixed order.',
        lede: 'However many rules a move has, people meet them the same way: fields on the first page, then signature, PIN and comment together.',
        blocks: [
          {
            kind: 'order',
            title: 'The order every move follows',
            steps: [
              { name: 'Required fields', text: 'Page 1: the fields the admin picked for this move.' },
              { name: 'Signature and PIN', text: 'Page 2: one step, so nobody signs twice.' },
              { name: 'Comment', text: 'Page 2: why the status changed, when a reason is required.' },
            ],
          },
        ],
      },
      {
        kicker: '04 · Everywhere',
        heading: 'Every surface opens the same steps.',
        lede: 'From a status badge, a dropdown or a publish prompt, the same two-page flow runs.',
        blocks: [
          {
            kind: 'everywhere',
            title: 'Where the flow starts',
            surfaces: [
              { name: 'Order detail page', note: 'The status badge becomes a dropdown of the next allowed statuses.' },
              { name: 'Test detail page', note: 'The dropdown lists only the statuses the workflow allows next.' },
              { name: 'Publishing a report', note: 'Tests that aren’t completed are moved first.' },
            ],
          },
        ],
      },
      {
        kicker: '05 · Bulk',
        heading: 'Many tests at once, with an honest answer.',
        lede: 'When some tests can’t move, the modal says how many, and lets the user go on with the rest.',
        blocks: [
          {
            kind: 'bulk',
            title: 'Publishing a report for selected tests',
            outcomes: [
              {
                label: 'All can move',
                title: 'Move tests to completed?',
                text: 'Every selected test can move. The same steps run, then the report is published.',
                cta: 'Yes, continue',
              },
              {
                label: 'Some can move',
                title: '6 tests can move to completed',
                text: '2 tests can’t, because of workflow rules. Go on with the 6, or review the blocked ones.',
                cta: 'Proceed with 6 tests',
              },
              {
                label: 'None can move',
                title: 'Selected tests can’t be moved',
                text: 'Workflow rules block every selected test, so the report can’t be published yet.',
                cta: 'Back to tests',
              },
            ],
          },
        ],
        proof: [{ value: 'MVP', caption: 'shipped, including bulk status update.' }],
      },
    ],
    did: [
      'Designed one model for how a status change happens, gets validated and gets recorded, and applied it on every surface that can trigger one.',
      'Designed the compliance layer as steps in the flow, not dead ends.',
      'Designed bulk status update, with a field-set based flow for changing many records at once.',
      'Shipped an MVP.',
    ],
    decisions: {
      heading: 'Problems we solved',
      items: [
        {
          ui: 'table',
          title: 'Different rules in one bulk move',
          problem: 'Moving many tests at once, from different statuses, meant a different set of rules for each one.',
          solved: 'Rules always run in one order, with signature and PIN as one step. For the MVP a bulk move starts from one status, and required fields show as a table: a row per test, a column per field.',
        },
        {
          ui: 'toast',
          title: 'No signature set up',
          problem: 'A move needed a signature the user had never set up, so the flow hit a dead end.',
          solved: 'No extra modal. A short error toast says what’s missing, with a link straight to the setup.',
        },
        {
          ui: 'move',
          title: 'Removing a status in use',
          problem: 'Removing a status from a workflow would strand the tests sitting in it.',
          solved: 'The admin sees how many tests are affected, picks where they go, and gets a link to the filtered list.',
        },
        {
          ui: 'log',
          title: 'Automations can’t sign',
          problem: 'Automations run with no person there, so they can’t fill a field or sign.',
          solved: 'A move with rules can’t be automated. If a run breaks the workflow, it fails and says exactly why.',
        },
        {
          ui: 'search',
          title: 'Hundreds of fields',
          problem: 'A test can have hundreds of fields. A switch for each one wouldn’t scale.',
          solved: 'Admins search and add the fields they need, and drag them into the order people will fill them.',
        },
      ],
    },
    agentic: {
      kicker: 'Why it’s on a design systems site',
      heading: 'Designed in the new system, built in the old one.',
      items: [
        { label: 'New system', text: 'The screens were designed with the new QBench design system.' },
        { label: 'Old UI', text: 'The MVP was built with the existing QBench UI, with no new parts where old ones worked.' },
        { label: 'One modal', text: 'The required-actions modal became one component, the same on every screen.' },
        { label: 'One notice', text: 'Inline notifications used across the flow became a component too.' },
      ],
      footnote:
        'The workflow is the same idea as a design system, applied to behaviour: one definition, used on every surface, so nothing drifts.',
    },
    together: {
      text: 'Inside the product team, with a product lead and developers. Flows were reviewed in design syncs, and feedback rounds with technical account managers shaped the MVP and what was held for the next version.',
      collect: {
        label: 'To collect · client quote',
        text: '“[A sentence from a QBench product lead or a lab user on the new status flow.]”',
      },
    },
    changed: {
      text: 'One status model shipped as an MVP, with compliance built into the flow instead of left to each screen.',
      collect: {
        label: 'To collect · business result',
        text: '[One result since launch: adoption of bulk update, fewer compliance errors, or fewer support tickets about status changes.]',
      },
    },
    work: [],
    faq: [
      {
        q: 'Is this design system work or product design?',
        a: '[Answer to add]',
      },
      {
        q: 'What did the MVP include?',
        a: '[Answer to add]',
      },
      {
        q: 'How did you handle e-signatures?',
        a: '[Answer to add]',
      },
      {
        q: 'What happens when some tests in a bulk move can’t move?',
        a: '[Answer to add]',
      },
      {
        q: 'Who was involved?',
        a: '[Answer to add]',
      },
    ],
    cta: {
      heading: 'Complex, regulated workflows?',
      text: 'We design them on a system, so every surface behaves the same way.',
      label: 'Book a call',
      action: 'call',
    },
    next: 'everbreed',
  },

  {
    slug: 'everbreed',
    linkName: 'Everbreed',
    name: 'Everbreed',
    band: 'peach',
    kicker: 'Case study · Design system · Agtech',
    statement: 'The library looked healthy. No pipeline could read it.',
    lede: 'Everbreed had a mature Figma library, but the code had drifted from it and no tool could read it. We gave every token an ID, a scope and a code name, so the code config now comes from Figma, for web and for mobile.',
    facts: [
      { term: 'Company', detail: 'Agtech platform: a web app and a student app on iOS and Android' },
      { term: 'Team', detail: '[Team size]' },
      { term: 'Stack', detail: 'Figma DS Desktop and DS Mobile, Vue on web, React Native on mobile' },
      { term: 'Scale', detail: '302 variables, 89 component sets' },
      { term: 'Work by', detail: 'Goran Babarogić, design systems, [2025 to now]' },
    ],
    who: '',
    heroVisual: 'everbreed',
    workVisual: 'everbreed',
    heroContext: 'Every token now carries an ID, a scope and a code name, so code reads it straight from Figma.',
    heads: {
      proof: { caption: 'Before and after', heading: 'Figma and code hold the same tokens, matched by ID.' },
      chapters: { caption: 'What we did', heading: 'Four steps, from drift to agents building screens.' },
      work: { caption: 'What we built', heading: 'The student app, on phone and desktop.' },
    },
    numbersHeading: 'Before and after',
    numbers: [
      {
        value: '53 → 0',
        label: 'tokens out of sync between Figma and code',
        meaning: 'So engineers can trust that the code matches the design.',
      },
      {
        value: '210 → 0',
        label: 'hand-written token aliases',
        meaning: 'So the utility config is generated from Figma, not kept by hand.',
      },
      {
        value: '302 / 302',
        label: 'tokens with a code name and a scope',
        meaning: 'So code reads the system mechanically. Nothing was renamed.',
      },
      {
        value: '144 → 72',
        label: 'button variants',
        meaning: 'So Focus and Pressed were added without doubling the matrix.',
      },
    ],
    chapters: [
      {
        kicker: '01 · Drift',
        heading: 'Figma and the code had drifted 53 tokens apart.',
        lede: 'Same names lived in three libraries, and an agent can’t tell which one is right.',
        blocks: [
          {
            kind: 'rows',
            title: 'Web · Figma ↔ code, before',
            rows: [
              { label: 'Only in Figma', value: '17 · surface/hover, border/selected/default …' },
              { label: 'Only in the repo', value: '36 · bg-eb-neutral-subtle, bg-eb-accent-red …' },
              { label: 'One name, three libraries', value: 'spacing/4 in Desktop, the old DS and an old UI kit' },
            ],
          },
        ],
        proof: [
          { value: '53', caption: 'tokens drifted between the Figma file and the repo.', seenAt: 'Seen at Everbreed' },
          { value: '3,046', caption: 'token issues on the student mobile screens, and 10,471 on web, before the clean-up.' },
        ],
      },
      {
        kicker: '02 · Tokens',
        heading: 'Better metadata, not new names.',
        lede: 'No token was renamed. Three fields Figma already has became the contract between design and code, and almost every value now points to a token.',
        blocks: [
          {
            kind: 'rows',
            title: 'Token field · from Figma · what it buys',
            rows: [
              { label: '$figmaId', value: 'variable.id · identity across renames' },
              { label: '$property', value: 'variable.scopes · the CSS property it paints' },
              { label: '$codeSyntax', value: 'codeSyntax.WEB · the name code uses' },
            ],
          },
          {
            kind: 'meters',
            title: 'Token coverage · mobile, after',
            items: [
              { label: 'Spacing', value: '99.4%' },
              { label: 'Text styles', value: '99.5%' },
              { label: 'Corner radius', value: '97.8%' },
              { label: 'Effects', value: '85.6%' },
            ],
          },
        ],
        proof: [
          { value: '210 → 0', caption: 'hand-written aliases. The config is generated from Figma.', seenAt: 'Seen at Everbreed' },
          { value: '99%', caption: 'of values bound to a token, 5,373 of 5,433.' },
        ],
      },
      {
        kicker: '03 · Components',
        heading: 'One vocabulary, so agents read the API straight from Figma.',
        lede: 'Across 89 component sets almost every one named its axes differently. Nothing broke on screen; it broke the mapping to code.',
        blocks: [
          {
            kind: 'compare',
            rows: [
              { label: 'Axis name', before: 'Property 1', after: 'Variant', note: 'The same four words in every set' },
              { label: 'State', before: 'Status / State / States', after: 'state', note: 'Focus and Pressed added' },
              { label: 'Size', before: 'Large (48)', after: 'size: "lg"', note: 'No pixels in the name' },
              { label: 'Label', before: 'Show Label axis', after: 'iconOnly: boolean', note: 'Halves the matrix' },
            ],
          },
        ],
        proof: [
          { value: '144 → 72', caption: 'button variants, with Focus and Pressed added.', seenAt: 'Seen at Everbreed' },
        ],
      },
      {
        kicker: '04 · Agents build',
        heading: 'Agents build from the system, and checks stop new drift.',
        lede: 'A rulebook written for Everbreed’s system, so any AI agent builds screens the way the team would. Every pull request is checked, raw colours and shadows included.',
        blocks: [
          {
            kind: 'flow',
            title: 'From spec to screen',
            steps: [
              { n: '01', name: 'Read the spec', text: 'A handoff spec on the Figma canvas says where everything is.' },
              { n: '02', name: 'Load the rules', text: 'design-conventions.md and allowed-components.json, per platform.' },
              { n: '03', name: 'generate-screen', text: 'Builds with library components and tokens only.' },
              { n: '04', name: 'check-screen', text: 'Compares the screen with the library before a designer sees it.' },
            ],
          },
          {
            kind: 'checks',
            title: 'Every pull request',
            subject: 'macOS, Linux and Windows',
            status: 'Blocks new drift',
            items: [
              { value: '0', label: 'Raw colours' },
              { value: '0', label: 'Raw shadows' },
              { value: '0', label: 'Tokens missing a field' },
            ],
          },
        ],
        proof: [
          { value: '0 issues', caption: 'on the test screen, Log Grooming 01, at the first check.', seenAt: 'Seen at Everbreed' },
        ],
      },
    ],
    did: [
      'Measured the drift between Figma and code, token by token.',
      'Made three Figma fields the contract between design and code, without renaming anything.',
      'Gave every component the same four axis names and added Focus and Pressed.',
      'Wrote the agent rulebook and the checks that block new drift.',
    ],
    agentic: {
      kicker: 'Two platforms',
      heading: 'One source of truth, adapted for each platform, not copied.',
      items: [
        { label: 'Source', text: 'Figma: DS Desktop and DS Mobile.' },
        { label: 'Contract', text: 'Token JSON with $figmaId, $property and $codeSyntax.' },
        { label: 'Web', text: 'A generated utility config and Vue components. Shipped first.' },
        { label: 'Mobile', text: 'A typed React Native export for iOS and Android.' },
        { label: 'Verified', text: 'Button and Input in a create and edit flow, checked on iOS and Android, including enlarged text.' },
      ],
      footnote:
        'Native differences are written down instead of guessed: elevation, text scaling, touch targets, keyboard and safe areas.',
    },
    together: {
      text: 'The plan started as a rename of all 302 variables. Everbreed’s engineer proposed a better route: don’t rename, track every token by its Figma ID, and let Figma stay the source of truth. We agreed, and the plan got smaller and safer. The best fix came from their side, and the process made room for it.',
      collect: {
        label: 'To collect · client quote and permission',
        text: '“[A sentence from the Everbreed engineer on the work.]” Also confirm Everbreed is happy for these figures to be published by name.',
      },
    },
    changed: {
      text: 'Figma and the code now hold the same tokens, matched by ID. The web config is generated from Figma, checks stop new drift on every pull request, and mobile follows the same contract for React Native.',
      collect: {
        label: 'To collect · business result',
        text: '[One result since the sync shipped: hours saved maintaining the config by hand, or time from a Figma change to code.]',
      },
    },
    // shown by EverbreedProduct (workVisual); these lines are what the Markdown twin lists
    work: [
      {
        placeholder: 'Student app clips: Daily Care, care saved, Home, Log Weight typo check, weight saved, milestone',
        caption: 'The Everbreed student app on the phone, recorded from the coded prototype.',
      },
      {
        placeholder: 'Project Book on desktop: Care & Health and Photos',
        caption: 'The same records on desktop, ready for the fair.',
      },
    ],
    faq: [
      {
        q: 'Did you rename the tokens?',
        a: '[Answer to add]',
      },
      {
        q: 'How long did adding the metadata take?',
        a: '[Answer to add]',
      },
      {
        q: 'Does it work for the mobile app?',
        a: '[Answer to add]',
      },
      {
        q: 'What stops new drift?',
        a: '[Answer to add]',
      },
      {
        q: 'Can AI agents build Everbreed screens?',
        a: '[Answer to add]',
      },
    ],
    cta: {
      heading: 'Planning a big rename?',
      text: 'Check first whether metadata would do the job. The free audit will tell you.',
      label: 'Get a free audit',
      action: 'audit',
    },
    next: 'clerky',
  },

  {
    slug: 'clerky',
    linkName: 'Clerky',
    name: 'Clerky',
    band: 'butter',
    kicker: 'Case study · Design system · Legal tech',
    statement: 'Design handoff breaks the moment the reader is an AI, not a person.',
    lede: 'An engineering team moving to AI coding agents can’t rely on a person catching what the agent misreads. Every gap between Figma and shipped code becomes a correction pass, and correction passes don’t scale. If your agents ship screens that are almost right, this is the work that closes the gap.',
    facts: [
      { term: 'Company', detail: 'Legal tech for startups' },
      { term: 'Team', detail: '[Team size], adopting AI coding agents' },
      { term: 'Stack', detail: 'Ember Octane app, Tailwind CSS v4, Figma' },
      { term: 'Scale', detail: '315 semantic and component tokens, pilot on the Documents App' },
    ],
    who: 'Who did the work: Goran Babarogić, as design systems engineer at Clerky, March 2026 to now.',
    lead: { kind: 'image', placeholder: '[Screenshot: a component with its AI-context description]' },
    numbersHeading: 'In numbers, and what they mean',
    numbers: [
      {
        value: '3 tiers',
        label: 'of tokens: primitive, semantic and component',
        meaning: 'So an agent picks “border subtle”, not a hex value.',
      },
      {
        value: '892',
        label: 'button bindings moved onto component tokens, none left behind',
        meaning: 'So changing a button is one edit, not a search.',
      },
      {
        value: '12 / 52',
        label: 'components had no description an agent could read. All now do.',
        meaning: 'So the agent stops guessing what a component is for.',
      },
      {
        value: '0 T1',
        label: 'blocking defects, the gate the pilot had to pass',
        meaning: 'So “done” had a definition before anyone built.',
      },
    ],
    steps: [{ label: '02 Audit' }, { label: '03 System' }, { label: '04 Context' }, { label: '05 Proof · pilot' }],
    did: [
      'Architected a three-tier token system for colour, radius, spacing and responsiveness, mapped to the existing colour scale.',
      'Built the component library in Figma, every component bound to tokens as it was made, with one naming grammar for component tokens.',
      'Wrote AI-context docs for every component and token, describing the current state only, so agents read intent instead of inferring it.',
      'Built a Figma QA check that reads like an agent: raw values, missing states, motion an agent can’t see, tokens from the wrong category.',
      'Defined a fixed text size scale for Tailwind v4, and the T1 blocking, T2 architectural, T3 minor defect scale with a zero-T1 gate.',
    ],
    together: {
      text: 'A Clerky engineer asked for a cheaper way to catch problems: run the agent’s instructions against Figma, without generating any code. We built that check and ran it across the whole component set in one pass. The token naming migration followed the same engineer’s proposal, carried out in Figma component by component. [Confirm the role and whether to name them.]',
      collect: {
        label: 'To collect · client quote',
        text: '“[A sentence from a Clerky engineer on how the agents’ output changed.]”',
      },
    },
    changed: {
      text: 'The AI-ready token and component model held up at pilot scale on the Documents App, through a real build pipeline. When a component turned out to be inferring a slot it should have declared, the fix went into the model, so the bug can’t come back.',
      collect: {
        label: 'To collect · pilot result',
        text: '[What the pilot built, how many defects were found and fixed, and correction rounds per screen before versus after.]',
      },
    },
    work: [
      {
        placeholder: '[Screenshot: CSS slot bug]',
        caption: 'Caught in review, fixed in the architecture instead of patched on top.',
      },
      {
        placeholder: '[Screenshot: pilot build]',
        caption: 'The model shipped through a real build pipeline on the Documents App.',
      },
      {
        placeholder: '[Screenshot: defect classification]',
        caption: 'T1 blocking, T2 architectural, T3 minor, with zero T1 as the hard gate.',
      },
    ],
    cta: {
      heading: 'Agents shipping almost-right screens?',
      text: 'The free audit checks how readable your system is for an agent.',
      label: 'Get a free audit',
      action: 'audit',
    },
    next: 'omnisafe',
  },

  {
    slug: 'omnisafe',
    linkName: 'Omnisafe',
    name: 'Omnisafe',
    band: 'mauve',
    kicker: 'Case study · Product design and system · Insurance',
    statement: 'Testing a 16-module insurance platform before a line of code.',
    lede: 'Omnisafe was replacing familiar terminal systems for policies, claims, appointments and client records. The people using them every day had to trust the new platform before engineering committed to building it. If you’re replacing a legacy tool your staff know by heart, the risk is the same.',
    facts: [
      { term: 'Company', detail: 'Insurance, replacing internal terminal systems' },
      { term: 'Team', detail: 'Four designers, [engineering team size]' },
      { term: 'Scale', detail: '16 modules: policies, claims, appointments, client records' },
      { term: 'Timeline', detail: 'March to October 2023' },
    ],
    who: 'Who did the work: Goran Babarogić, as lead product designer and design department lead, leading three designers.',
    lead: { kind: 'image', placeholder: '[Screenshot: the 16-module flow map]' },
    numbersHeading: 'In numbers, and what they mean',
    numbers: [
      {
        value: '16',
        label: 'modules, testable end to end before engineering began',
        meaning: 'So problems surfaced in a prototype, not in production.',
      },
      {
        value: '3 layers',
        label: 'of published libraries: tokens, components, screens',
        meaning: 'So one change to a token or component updated every screen.',
      },
      {
        value: '4',
        label: 'designers working on one system',
        meaning: 'So 16 modules still felt like one product.',
      },
    ],
    note: {
      heading: 'Zero Drift steps in this project',
      text: '03 System and 05 Proof: the system came first, and the proof was a full prototype tested by real users, before AI agents were part of the picture.',
    },
    did: [
      'Mapped all 16 modules and how work moves between them before designing a single screen.',
      'Built the system as published libraries: tokens, then components using them, then screens using the components.',
      'Wired the prototype to those libraries, so the whole system stayed testable while it was still cheap to change.',
      'Moved all interface copy to translation keys, so translations load at runtime without touching layout.',
    ],
    together: {
      text: 'The whole system went in front of the employees who would use it every day, while it was still editable. Their feedback shaped the product before engineering spent a sprint on it.',
      collect: {
        label: 'To collect · what testing found',
        text: '[One or two things employees found in testing, and what changed because of it.]',
      },
    },
    changed: {
      text: 'The full system was tested with real employees before engineering started, so the build began from a design people had already used.',
      collect: {
        label: 'To collect · client quote',
        text: '“[A sentence from someone at Omnisafe on the testing or the handover to engineering.]”',
      },
    },
    work: [
      {
        placeholder: '[Screenshot: flow map]',
        caption: 'One flow map for 16 modules, drawn before any interface existed.',
      },
      {
        placeholder: '[Screenshot: tokens]',
        caption: 'Primitive and semantic tokens across light and dark, each marked ready for development.',
      },
      {
        placeholder: '[Screenshot: living prototype]',
        caption: 'The prototype uses the same libraries as the design files, so a token change updates every screen.',
      },
    ],
    cta: {
      heading: 'Replacing a legacy tool?',
      text: 'Build the system first, and test the whole thing with your people before you build it.',
      label: 'Book a call',
      action: 'call',
    },
    next: 'flyr',
  },

  {
    slug: 'flyr',
    linkName: 'FLYR Hospitality',
    name: 'FLYR',
    band: 'stone',
    kicker: 'Case study · Product design · Hospitality',
    statement: 'Hotels could not tell if a group booking made money.',
    lede: 'A hotel quoting a 200-room group couldn’t see whether it actually made money once displaced regular bookings and VAT were counted. Revenue teams argued the numbers over email, outside the tool. If your users take decisions out of your product to argue about them, the product isn’t explaining itself.',
    facts: [
      { term: 'Company', detail: 'Revenue management software for hotels' },
      { term: 'Users', detail: 'Hotel revenue and sales teams' },
      { term: 'Team', detail: '[Team size]' },
      { term: 'Timeline', detail: 'May to November 2024' },
    ],
    who: 'Who did the work: Goran Babarogić, as senior product designer at FLYR Hospitality.',
    lead: { kind: 'image', placeholder: '[Screenshot: Group Quotation with profitability metrics]' },
    numbersHeading: 'In numbers, and what they mean',
    numbers: [
      {
        value: '4',
        label: 'profitability metrics, each opening into what it accounts for, with and without VAT',
        meaning: 'So a revenue manager sees why a group is profitable, not only whether.',
      },
      {
        value: '3 steps',
        label: 'for quotation setup instead of one long form',
        meaning: 'So tax and revenue settings stopped overwhelming people.',
      },
      {
        value: 'MVP',
        label: 'shipped, with commenting rolled out module by module',
        meaning: 'So the argument moved into the tool, next to the numbers.',
      },
    ],
    note: {
      heading: 'Why it’s here',
      text: 'This is the product side of our work: complex, high-stakes workflows, researched with the people who use them. It’s what we design on top of the systems we build.',
    },
    did: [
      'Interviewed hotel partners and advisory board members to learn how group deals are really judged.',
      'Designed expandable metrics: group revenue, group profit, incremental revenue and incremental profit.',
      'Built in-app commenting with tagging, thread resolution and live user indicators.',
      'Shipped the Group Quotation MVP.',
    ],
    together: {
      text: 'The design started with the people who price group deals: hotel partners and FLYR’s advisory board. Their way of judging a deal became the structure of the screen.',
      collect: {
        label: 'To collect · client quote',
        text: '“[A sentence from a FLYR product lead or a hotel partner.]”',
      },
    },
    changed: {
      text: 'The Group Quotation MVP shipped, and collaboration was rolled out across modules.',
      collect: {
        label: 'To collect · business result',
        text: '[One result after launch: quotes created in the tool, time to quote, or fewer email threads about a deal.]',
      },
    },
    work: [
      {
        placeholder: '[Screenshot: incremental revenue]',
        caption: 'Incremental revenue opens into the displacement it accounts for. The number explains itself.',
      },
      {
        placeholder: '[Screenshot: configuration]',
        caption: 'Quotation setup in three steps, so one form didn’t carry every setting.',
      },
      {
        placeholder: '[Screenshot: comments]',
        caption: 'Commenting inside the forecast, where the argument was already happening.',
      },
    ],
    cta: {
      heading: 'Numbers your users argue about?',
      text: 'We design complex workflows so the product explains itself.',
      label: 'Book a call',
      action: 'call',
    },
    next: 'qbench-design-system',
  },
];

export const caseHref = (slug: string) => `/work/${slug}`;

export function getCaseStudy(slug: string): CaseStudy {
  const found = caseStudies.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown case study: ${slug}`);
  return found;
}
