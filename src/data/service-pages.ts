/**
 * The two service pages: /design-systems and /product-design (Goran, 26 Nov). Each takes the homepage card's
 * included/ tree and gives every line its own section, then work, steps, FAQ, the call band and the article.
 * Rendered by src/directions/a/ServiceBodyA.astro; the Markdown twins render the same component.
 *
 * Media are placeholders (MediaSlot) with the asset we suggest for each spot; swap them for real files as they
 * are made. Figures come from the case studies in src/data/case-studies.ts; nothing here is invented.
 */
import type { Article, MediaSpec } from './article-types';
import { designSystemsArticle } from './articles/design-systems';
import { productDesignArticle } from './articles/product-design';
import { steps as zeroDriftSteps } from './zero-drift';

export interface Offer {
  id: string;
  /** the line from the homepage card's included/ tree */
  name: string;
  headline: string;
  lede: string;
  body: string[];
  youGet: string[];
  media: MediaSpec[];
  proof?: { value: string; caption: string; href?: string; source?: string };
  cta?: { href: string; label: string };
}

export interface ServicePage {
  slug: 'design-systems' | 'product-design';
  metaTitle: string;
  metaDescription: string;
  caption: string;
  /** hero lines; the last one prints on the accent */
  h1: string[];
  lede: string;
  heroMedia: MediaSpec;
  index: { caption: string; heading: string; intro: string };
  offers: Offer[];
  /** big figures with a link to where they were measured */
  numbers?: { caption: string; heading: string; items: { value: string; label: string }[]; link: { href: string; label: string } };
  /** case studies to point at (published slugs) */
  work: { caption: string; heading: string; slugs: string[] };
  steps: { caption: string; heading: string; items: { num: string; name: string; text: string }[] };
  faq: { heading: string; items: { q: string; a: string }[] };
  article: Article;
}

export const designSystemsPage: ServicePage = {
  slug: 'design-systems',
  // ~60 characters with the query first, so Google shows it whole (SEO plan, Phase 1)
  metaTitle: 'Design system agency: audit, tokens, AI-ready docs · Nicey',
  metaDescription:
    'Design systems people and coding agents read the same way: audit, tokens, components from Figma to code and AI-ready docs. Start with a free audit.',
  caption: 'Design systems',
  h1: ['Design systems', 'people and agents', 'read the same way.'],
  lede: 'For products with years of drift, and teams that want their coding agents to build on-system. We audit, consolidate and rebuild your system in Figma and in code, then write it down so nobody has to guess.',
  heroMedia: {
    kind: 'video',
    ratio: '21 / 9',
    note: 'Hero loop, 12–15 s, no text: a drifted screen (several blues, mixed radii) resolves into the system version as tokens snap into place, then the theme flips light → dark → brand. Pixel-field palette, no UI chrome.',
  },
  index: {
    caption: 'What’s included',
    heading: 'Six parts, one system.',
    intro: 'Pick the parts you need. Most teams start with the free audit and take the rest in order.',
  },
  offers: [
    {
      id: 'audit-and-consolidation',
      name: 'Audit and consolidation',
      headline: 'Find the drift, then fold it into one system.',
      lede: 'We read your Figma files, the compiled CSS and the source, and list every value and component the product really uses. Then we consolidate: duplicate libraries merged, detached values bound, outside references repointed.',
      body: [
        'The audit scores seven pillars with counts, not opinions: token metadata, token binding, interaction states, component API, elevation and effects, AI readiness, and design-to-code sync when we can read the repo.',
        'Consolidation follows the findings in the order that removes the most drift first, so the system gets better from week one, and nothing is renamed until it is safe.',
      ],
      youGet: [
        'A drift map: what exists, what it should be, where design and code disagree',
        'A score per pillar, with named examples of what fails',
        'A consolidation plan in priority order',
        'One library instead of several, with outside references repointed',
      ],
      media: [
        {
          kind: 'screen',
          ratio: '16 / 10',
          note: 'The audit report running in the terminal window (same look as the homepage ReportA): pillars filling in one by one with pass / partial / fail and counts. 10 s.',
        },
      ],
      proof: { value: '1,071 → 0', caption: 'references to outside libraries, repointed to the system.', href: '/work/qbench-design-system', source: 'QBench' },
    },
    {
      id: 'token-architecture-and-theming',
      name: 'Token architecture and theming',
      headline: 'Three layers of tokens. Every theme from one model.',
      lede: 'Primitives hold the palette and scales, semantic tokens say what each value is for, component tokens map those meanings onto parts. Light, dark and brand modes swap the semantic layer; components never change.',
      body: [
        'Every variable gets a narrowed scope, a unique code name and an ID that survives renames, so you can clean up names later without breaking what depends on them.',
        'Tokens are exported as W3C design-token JSON and built into CSS variables, a Tailwind theme or native files, generated rather than retyped.',
      ],
      youGet: [
        'A token model: primitives, semantic and component layers',
        'Light, dark and brand modes from one source',
        'Scopes, code names, stable IDs and descriptions on every token',
        'A tokens.json export and the build step that turns it into code',
      ],
      media: [
        {
          kind: 'video',
          ratio: '16 / 9',
          note: 'One component (a primary button and a text field) shown while the mode switches light → dark → a second brand. Beside it, the alias chain lights up: primitive → semantic → component token.',
        },
        {
          kind: 'photo',
          ratio: '16 / 9',
          note: 'Use the existing Figma variables screenshots (/work/qbench/vars-semantic.webp or /work/everbreed/vars-primitives.webp), cropped to the collection list and one mode column.',
        },
      ],
      proof: { value: '99.5%', caption: 'of values bound to a token, across 1,610 component variants.', href: '/work/qbench-design-system', source: 'QBench' },
    },
    {
      id: 'component-library-figma-to-code',
      name: 'Component library, Figma to code',
      headline: 'Every component built once, in Figma and in code.',
      lede: 'We rebuild your components against the tokens, with every interactive state drawn and one consistent API across the library, then build the same components in your stack and map the two together.',
      body: [
        'Every interactive component gets default, hover, focus, pressed, disabled and error states. Properties use the same names everywhere, and slots for icons and actions are declared, not hidden in layers.',
        'Code Connect or a component map tells Figma Dev Mode, and your coding agents, which code component each Figma component is.',
      ],
      youGet: [
        'A Figma library with every state and a consistent property API',
        'Matching code components in your stack',
        'A Figma-to-code map (Code Connect or equivalent)',
        'A documentation page per component: use for, not for, every state',
      ],
      media: [
        {
          kind: 'screen',
          ratio: '16 / 10',
          note: 'Side by side: an Input in Figma cycling its states, and the same Input in the browser cycling the same states from code. Same timing on both sides.',
        },
        {
          kind: 'photo',
          ratio: '16 / 9',
          note: 'Use the existing QBench documentation sheet (/work/qbench/doc-sheet-1.webp): the Input page with use for / not for and the state grid.',
        },
      ],
      proof: { value: '28', caption: 'components focus with the same ring style.', href: '/work/qbench-design-system', source: 'QBench' },
    },
    {
      id: 'ai-ready-documentation',
      name: 'AI-ready documentation',
      headline: 'Written for the reader that never asks.',
      lede: 'A context file for every token and component: what it is, when to use it, what it must never do. Your designers read it in Figma, your engineers in the repo, and your coding agents read the same words.',
      body: [
        'We add descriptions to components and tokens in Figma, write the rules file your agents load (AGENTS.md, CLAUDE.md or Cursor rules), and set up the checks that fail a build when an agent reaches outside the library.',
        'The test is practical: an agent builds a real screen from the system, and it has to pass the same defect gate as a person.',
      ],
      youGet: [
        'Descriptions on every component and token, in Figma and in code',
        'A context file per component: use for, not for, states, slots',
        'An agent rules file and an allowed-components list',
        'Checks for raw values and off-system components in CI',
      ],
      media: [
        {
          kind: 'video',
          ratio: '16 / 9',
          note: 'Screen recording: a coding agent is asked for a settings screen, reads the component context files, builds it only from library parts, and the on-system check passes with 0 issues. 25 s, waits sped up.',
        },
      ],
      proof: { value: '243', caption: 'components the agent may use, all from the published library.', href: '/work/qbench-design-system', source: 'QBench' },
    },
    {
      id: 'systems-partner-monthly',
      name: 'Systems partner, monthly',
      headline: 'A systems team, without hiring one yet.',
      lede: 'After the build, we stay on as your systems partner on a monthly retainer: new components when the product needs them, a drift review every month, and context kept current for your agents.',
      body: [
        'Each month starts with the same audit that started the project, so you see drift as a number, not a feeling. Requests from your team go through one contribution path, and changes ship with release notes everyone reads.',
        'When you are ready to own it in-house, we hand over the routine and train whoever takes it on.',
      ],
      youGet: [
        'A monthly drift review with the audit numbers',
        'New components and patterns as the roadmap needs them',
        'Release notes and updated context files with every change',
        'Office hours for your designers and engineers',
      ],
      media: [
        {
          kind: 'photo',
          ratio: '3 / 2',
          note: 'A monthly review call: the drift numbers chart on a shared screen, the team on the call in small tiles. Warm, real working light; no posed handshake.',
        },
      ],
    },
    {
      id: 'free-audit-to-start',
      name: 'Free audit to start',
      headline: 'Start with the free audit.',
      lede: 'Send us your Figma file and you get a score per pillar, the top findings and what to fix first. Free and read-only: we never edit your file. Or let your own coding agent run the same checks first.',
      body: [
        'Read access to the repo is optional. With it, we also compare your Figma tokens against the compiled CSS and the source code.',
        'Prefer to look on your own first? Paste the self-check prompt into Claude Code, Cursor or any agent with Figma access. It reads your file locally and nothing is sent to us.',
      ],
      youGet: ['A score per pillar', 'The top findings, with examples', 'What to fix first, in order', 'A call to walk through it'],
      media: [
        {
          kind: 'screen',
          ratio: '4 / 3',
          note: 'The finished audit report: the summary table (pillar, result, count, one example) and the three things to fix first. Real layout, anonymised file name.',
        },
      ],
      cta: { href: '/#audit', label: 'Get a free audit' },
    },
  ],
  numbers: {
    caption: 'Measured, not described',
    heading: 'What a finished system looks like.',
    items: [
      { value: '1,071 → 0', label: 'references to outside libraries, repointed to the system' },
      { value: '99.5%', label: 'of values bound to a token, across 1,610 component variants' },
      { value: '2 files → 1', label: 'for tokens and components, so a token change reaches every component' },
      { value: '716', label: 'layers fade with one opacity token when disabled' },
    ],
    link: { href: '/work/qbench-design-system', label: 'Read the QBench case study' },
  },
  work: { caption: 'Work', heading: 'Systems in production.', slugs: ['qbench-design-system', 'everbreed'] },
  steps: {
    caption: 'How we work',
    heading: 'From drift to a system that holds.',
    items: zeroDriftSteps.map((s) => ({ num: s.num, name: s.name, text: s.youGet })),
  },
  faq: {
    heading: 'Questions about design systems',
    items: [
      {
        q: 'Can you work with the library we already have?',
        a: 'Yes, and we usually do. We audit what exists, keep what holds up, and consolidate the rest. Each token gets an ID that survives renames, so nothing has to be renamed before it is safe.',
      },
      {
        q: 'Do you build in code, or only in Figma?',
        a: 'Both. Figma stays the source of truth for tokens, and we build the matching components in your stack, with a map between the two so designers, engineers and agents point at the same component.',
      },
      {
        q: 'Can the system handle dark mode and several brands?',
        a: 'Yes. Themes and brands are modes on the semantic token layer, so light, dark and each brand come from one model and components never change between them.',
      },
      {
        q: 'How do our coding agents use the system?',
        a: 'Every token and component gets a description and a context file, and your agents get a rules file with the allowed components. A check in CI fails a build that uses raw values or components outside the library.',
      },
      {
        q: 'What does the monthly partnership include?',
        a: 'A drift review each month with the audit numbers, new components and patterns as the roadmap needs them, release notes and updated context files with every change, and office hours for your team.',
      },
    ],
  },
  article: designSystemsArticle,
};

export const productDesignPage: ServicePage = {
  slug: 'product-design',
  metaTitle: 'Product design agency: UX, design engineering, AI · Nicey',
  metaDescription:
    'Product and UX design for complex workflows, built on your design system with AI in the loop: design engineering in your stack and on-system screens from day one.',
  caption: 'Product design',
  h1: ['Product design', 'on the system,', 'with AI in the loop.'],
  lede: 'Complex workflows designed on the system we build, so new screens ship consistent from day one. We prototype in real code, design AI features people trust, and set up your coding agents to build what we design.',
  heroMedia: {
    kind: 'video',
    ratio: '21 / 9',
    note: 'Hero loop, 15 s: three phone screens from the Everbreed student app (care log, weight saved, milestone) slide in on the pixel field, then a desktop QBench status screen. Use the existing /work/everbreed/*.webm clips; no text overlays.',
  },
  index: {
    caption: 'What’s included',
    heading: 'Three ways we design products.',
    intro: 'Each runs on a design system: yours, or the one we build with you.',
  },
  offers: [
    {
      id: 'product-and-ux-design',
      name: 'Product and UX design',
      headline: 'Complex workflows, designed on the system.',
      lede: 'Dense data, multi-step tasks, roles and approvals: the parts of a product people use every day and notice only when they go wrong. We frame the problem, shape the flow and design every state on your design system.',
      body: [
        'We start with the job the user is doing, not the screen. Flows are mapped first, explored in several directions with real components, then tested as working prototypes with real data, so long names, empty states and errors show up before launch.',
        'Every screen is built from tokens and components. New patterns we find go back into the system, so the next feature can reuse them.',
      ],
      youGet: [
        'Flows and journey maps for the workflow',
        'Screens on your design system, every state included',
        'Working prototypes tested with real users',
        'Specs your engineers and their agents can build from directly',
      ],
      media: [
        {
          kind: 'video',
          ratio: '9 / 16',
          note: 'Use the existing Everbreed clip /work/everbreed/mobile-dailycare.webm in a phone frame: the daily care flow end to end.',
        },
        {
          kind: 'photo',
          ratio: '3 / 2',
          note: 'A usability session: a participant using the prototype on a laptop, the designer taking notes beside them, the flow map on the wall behind. Faces optional; hands and screen are enough.',
        },
      ],
    },
    {
      id: 'design-engineering',
      name: 'Design engineering',
      headline: 'Designed in the medium it ships in.',
      lede: 'We prototype and build in real code, in your stack, so what users get is what was designed. Interaction, motion and edge cases are decided in the browser, not lost in a handoff.',
      body: [
        'Design engineering covers the details a static file cannot: how a table behaves at 2,000 rows, how a focus ring reads on every background, how a panel opens and what happens when the network is slow.',
        'We build and test the components of the design system, pair with your engineers during the pilot build, and leave the code in your repository, not in a demo.',
      ],
      youGet: [
        'Components in your stack, with every state tested',
        'Interaction and motion specs, built not described',
        'High-fidelity prototypes on real data',
        'Pairing with your engineers on the pilot surface',
      ],
      media: [
        {
          kind: 'screen',
          ratio: '16 / 10',
          note: 'Close-up screen recording of an interaction detail built in code: a status change on a QBench record, the row updating, the toast, and undo. Slow enough to read, 10 s.',
        },
        {
          kind: 'photo',
          ratio: '16 / 9',
          note: 'Figma and the code editor side by side on one monitor, the same component open in both. Over-the-shoulder, the browser preview visible.',
        },
      ],
    },
    {
      id: 'ai-workflows-in-delivery',
      name: 'AI workflows in delivery',
      headline: 'Your agents, building on the system.',
      lede: 'We set up the way your team designs and ships with AI: agents connected to Figma and the repo, briefs and context they can follow, and review gates that keep their output on-system. And when your product has AI features, we design them to be trusted.',
      body: [
        'Agents get the design system’s context files, a rules file and an allowed-components list. Work goes through short briefs, small tasks and the same defect gate people pass: T1 blocking, T2 architectural, T3 minor.',
        'For AI features in your product, we design for uncertainty: visible progress, sources you can check, edits instead of regenerating, undo, and a human sign-off wherever a mistake is costly. Those patterns become components in the system.',
      ],
      youGet: [
        'Agents connected to Figma (MCP) and your repository, with context',
        'Brief templates and a review gate for agent-built screens',
        'AI feature patterns as components: streaming, citations, approvals',
        'A working session to train your team on the workflow',
      ],
      media: [
        {
          kind: 'diagram',
          ratio: '16 / 9',
          note: 'The delivery loop as a pixel diagram: brief → agent builds from the design system → on-system check → designer review → ship, with the “fix the model, not the screen” arrow back into the system.',
        },
        {
          kind: 'screen',
          ratio: '4 / 3',
          note: 'An AI feature built on the system: a draft streaming into a side panel, citation chips linking to source records, an Approve / Edit bar. Mock data from a lab workflow.',
        },
      ],
    },
  ],
  work: { caption: 'Work', heading: 'Products designed on the system.', slugs: ['everbreed', 'qbench-status-workflows'] },
  steps: {
    caption: 'How a project runs',
    heading: 'From brief to shipped, on the system.',
    items: [
      { num: '01', name: 'Frame', text: 'The job the user is doing, what success looks like, and what is out of scope.' },
      { num: '02', name: 'Explore', text: 'Several directions for the flow, generated and sketched with real components.' },
      { num: '03', name: 'Prototype', text: 'Working code on real data, so the test is about behaviour, not mockups.' },
      { num: '04', name: 'Test', text: 'Short sessions with real users; we watch what people do, not what they say.' },
      { num: '05', name: 'Build', text: 'Your team and its agents build it through the system, gated on defects.' },
    ],
  },
  faq: {
    heading: 'Questions about product design',
    items: [
      {
        q: 'Do you only design, or also build?',
        a: 'Both. Design engineering is part of the practice: we prototype in your stack, build the components of the system, and pair with your engineers on the pilot. The code stays in your repository.',
      },
      {
        q: 'Do we need a design system before you start?',
        a: 'No. If you have one, we design on it. If you do not, we build the parts the workflow needs as we go, and the free audit shows what the new screens can stand on.',
      },
      {
        q: 'How do you use AI in the design process?',
        a: 'For synthesis, exploration, prototyping and first builds, always with a person accountable for each result. The time it saves goes into testing more options with real users.',
      },
      {
        q: 'Can you design the AI features in our product?',
        a: 'Yes. We design for uncertainty: visible progress, sources people can check, edits instead of regenerating, undo, and a human sign-off where a mistake is costly. Those patterns go into your design system as components.',
      },
      {
        q: 'Who on our team do you work with?',
        a: 'Usually a product manager, a lead engineer and whoever owns design. We work in your tools and your repository, and your agents can build the pilot under the same review gate as people.',
      },
    ],
  },
  article: productDesignArticle,
};

export const servicePages = [designSystemsPage, productDesignPage];
