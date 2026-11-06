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
  lead:
    | { kind: 'image'; placeholder: string }
    | { kind: 'audit'; heading: string; text: string; cta: string };
  numbersHeading: string;
  numbers: { value: string; label: string; meaning: string }[];
  steps?: { label: string; inProgress?: boolean }[];
  note?: { heading: string; text: string };
  did: string[];
  agentic?: {
    kicker: string;
    heading: string;
    items: { label: string; text: string }[];
    footnote: string;
  };
  together: { text: string; collect: Collect };
  changed: { text: string; collect: Collect };
  work: { placeholder: string; caption: string }[];
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
    statement: 'No one owned the design system, so nothing in the product agreed with itself.',
    lede: 'A B2B SaaS product built for years without a designer in the room. Every screen was a developer’s best guess, and each new feature meant relearning decisions nobody had written down. If your team copies screens instead of reusing parts, this is your starting point too.',
    facts: [
      { term: 'Company', detail: 'Lab information management (LIMS), B2B SaaS' },
      { term: 'Team', detail: '[Team size: engineers and designers]' },
      {
        term: 'Stack',
        detail: 'Legacy product plus a new app, Figma Foundation and Components libraries [confirm stack]',
      },
      { term: 'Scale', detail: '141 components across three library pages' },
    ],
    who: 'Who did the work: Goran Babarogić, as product designer and design system engineer at QBench, June 2025 to now.',
    lead: { kind: 'image', placeholder: '[Screenshot: Foundation library, before and after]' },
    numbersHeading: 'In numbers, and what they mean',
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
        value: '141',
        label: 'components on one Foundation library',
        meaning: 'So every new screen starts from the same parts.',
      },
    ],
    steps: [
      { label: '01 Drift' },
      { label: '02 Audit' },
      { label: '03 System' },
      { label: '04 Context' },
      { label: '05 Proof · pilot' },
    ],
    did: [
      'Audited and consolidated the legacy system: colours, tokens and components that had drifted apart.',
      'Built a semantic token architecture across libraries, and piloted the migration before rolling it out.',
      'Designed and shipped components with every state defined, and one action link pattern instead of several.',
      'Set Code Connect as the contract between Figma and code, so a screen can be built from Figma without anyone correcting it afterwards.',
      'Reorganised the Figma library so components are found by what they do, not by memory.',
    ],
    agentic: {
      kicker: 'The agentic layer',
      heading: 'Docs agents might skip. A gate they can’t.',
      items: [
        { label: 'Rules', text: 'State the target. They never get softened to match the code.' },
        { label: 'Facts', text: 'Measure what the code actually does today, generated, not written by hand.' },
        { label: 'Gap list', text: 'Maps one to the other. Deleting a row is the unit of progress.' },
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
      text: 'The component library now runs on one Foundation, with no outside libraries behind it, and the Figma to code contract is in place for the rollout.',
      collect: {
        label: 'To collect · business result',
        text: '[One real result: time to build a screen, UI bugs, or how often an agent’s first attempt was usable, before and after.]',
      },
    },
    work: [
      {
        placeholder: '[Screenshot: token layers]',
        caption: 'Primitive, semantic and component layers, with every component bound to the Foundation only.',
      },
      {
        placeholder: '[Screenshot: library by function]',
        caption: 'The library reorganised so components are found by what they do.',
      },
      {
        placeholder: '[Screenshot: Code Connect]',
        caption: 'Code Connect linking the Figma component to the code component.',
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
    statement: 'A status change could skip the compliance step it legally needed.',
    lede: 'A test’s status could change from eight places, from the order screen to imports, automations and the API. None agreed on what should happen next, and none accounted for the e-signatures and PINs some changes legally needed. If one action in your product behaves differently depending on where it’s triggered, this is the same problem.',
    facts: [
      { term: 'Company', detail: 'Lab information management (LIMS), regulated industries' },
      { term: 'Team', detail: '[Team size]' },
      { term: 'Scope', detail: '8 surfaces that change a status, single and bulk' },
      { term: 'Timeline', detail: 'January to February 2026' },
    ],
    who: 'Who did the work: Goran Babarogić, as product designer at QBench.',
    lead: { kind: 'image', placeholder: '[Screenshot: a status change with its compliance step]' },
    numbersHeading: 'In numbers, and what they mean',
    numbers: [
      {
        value: '8 → 1',
        label: 'places a status could change, now on one model',
        meaning: 'So a status behaves the same wherever it’s changed.',
      },
      {
        value: '4',
        label: 'compliance steps in the flow: required fields, comments, e-signatures, PIN',
        meaning: 'So required steps can’t be skipped, and people aren’t stuck at dead ends.',
      },
      {
        value: 'MVP',
        label: 'shipped, including bulk status update',
        meaning: 'So the model was proven in the product, not only in Figma.',
      },
    ],
    note: {
      heading: 'Why it’s on a design systems site',
      text: 'It’s the same thinking applied to behaviour: one definition, used everywhere. A status model works like a token, and every surface consumes it.',
    },
    did: [
      'Designed one model for how a status change happens, gets validated and gets recorded, and applied it on every surface that can trigger one.',
      'Designed the compliance layer as steps in the flow, not dead ends.',
      'Designed bulk status update, with a field-set based flow for changing many records at once.',
      'Shipped an MVP.',
    ],
    together: {
      text: 'Two months from zero to a shipped MVP, working inside the product team. [Add who the work was reviewed with, such as compliance or support, and one decision that came out of it.]',
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
    work: [
      {
        placeholder: '[Screenshot: the status model]',
        caption: 'One model for every surface that can change a status.',
      },
      {
        placeholder: '[Screenshot: e-signature step]',
        caption: 'Compliance as a step in the flow, not a blocked screen.',
      },
      { placeholder: '[Screenshot: bulk update]', caption: 'Bulk status update, driven by field sets.' },
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
    kicker: 'Case study · Design system · Agtech · In progress',
    statement: 'The library looked healthy. No pipeline could read it.',
    lede: 'A mature Figma design system with most styles already bound to tokens. But the tokens carried no metadata, the code had drifted from the file, and the team assumed the fix was renaming everything. If your design system looks fine in Figma but engineers still copy values by hand, this is likely you.',
    facts: [
      { term: 'Company', detail: 'Agtech platform, web and mobile' },
      { term: 'Team', detail: '[Team size]' },
      { term: 'Stack', detail: 'Figma library, Tailwind config in the web app [confirm stack]' },
      { term: 'Scale', detail: '302 variables, 89 component sets' },
    ],
    who: 'Who did the work: Goran Babarogić, design systems, 2025 to now. [Confirm how to describe the engagement.]',
    lead: {
      kind: 'audit',
      heading: 'This is what our audit looks like.',
      text: 'The findings below come from a review of the full Figma file. The free audit gives you the same kind of picture for your system.',
      cta: 'Get yours free',
    },
    numbersHeading: 'What the review found, and what it means',
    numbers: [
      {
        value: '98%',
        label: 'of text styles bound to tokens',
        meaning: 'So no redesign was needed. The design work was already good.',
      },
      {
        value: '302 / 302',
        label: 'variables with no scope and no code name',
        meaning: 'So no tool could tell what a token is for, or turn it into code.',
      },
      {
        value: '53',
        label: 'variables drifted: 17 only in Figma, 36 only in code',
        meaning: 'So engineers couldn’t trust that the code matched the design.',
      },
      {
        value: '144',
        label: 'button variants and no focus state',
        meaning: 'So adding focus would have doubled the work. Fixing the structure first halves it to 72.',
      },
    ],
    steps: [
      { label: '01 Drift' },
      { label: '02 Audit' },
      { label: '03 System · in progress', inProgress: true },
      { label: '04 Context' },
    ],
    did: [
      'Reviewed the whole Figma file and counted every binding, so the conversation started from facts.',
      'Defined three fields that do the work: an ID that survives renames, where a token may be used, and its name in code.',
      'Wrote the sync plan, so the code config is generated from Figma and the 210-line hand-written alias layer goes away.',
      'Wrote the agent instructions, with one rule above the rest: report the gap, don’t invent the value.',
    ],
    together: {
      text: 'The plan started as a rename of all 302 variables. Everbreed’s engineer proposed a better route: don’t rename, track every token by its Figma ID, and let Figma stay the source of truth. We agreed, and the plan got smaller and safer. The best fix came from their side, and the process made room for it.',
      collect: {
        label: 'To collect · client quote and permission',
        text: '“[A sentence from the Everbreed engineer on the review.]” Also confirm Everbreed is happy for these figures to be published by name.',
      },
    },
    changed: {
      text: 'Design and engineering agreed one path: no rename, metadata instead, and a prioritised work list. Generating the code config from Figma is the next step.',
      collect: {
        label: 'To collect · result once the sync ships',
        text: '[Drift count after sync, hours saved maintaining the config by hand, or time from a Figma change to code.]',
      },
    },
    work: [
      {
        placeholder: '[Image: binding coverage]',
        caption: 'Binding coverage by property. Shadows were the weak spot at 40%.',
      },
      {
        placeholder: '[Image: the three metadata fields]',
        caption: 'ID, usage and code name: the metadata that keeps Figma the source of truth.',
      },
      {
        placeholder: '[Image: the work list]',
        caption: 'A prioritised work list, agreed with the engineer who owns the code side.',
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
