/**
 * The homepage article, after the call band: what a design systems agency does and how Nicey helps with design
 * systems and product design. Draft for Goran's review (26 Nov). The two service pages carry the deep dives
 * (src/data/articles/design-systems.ts, product-design.ts); this one links to them.
 */
import type { Article } from '../article-types';
import { founder } from '../people';

export const homeArticle: Article = {
  id: 'guide',
  caption: 'Field guide',
  title: 'What a design systems agency does, and when you need one',
  lede: 'A plain guide to hiring outside help for your design system and product design: what the work includes, the signs it is time, how coding agents change the brief, and how to pick a partner.',
  updated: '2026-11-26',
  author: founder.name,
  about: ['Design systems agency', 'Design systems', 'Product design', 'AI-ready design systems', 'Design tokens'],
  sections: [
    {
      id: 'what-a-design-systems-agency-does',
      title: 'What does a design systems agency do?',
      answer:
        'A design systems agency turns the colours, type, spacing and components your product already uses into one shared system of tokens, components and documentation, then helps your team build on it. Good agencies work in Figma and in code, so design and production never drift apart again.',
      blocks: [
        {
          p: 'Most products do not start with a design system. They start with screens. Over a few years, different designers and engineers solve the same problems in slightly different ways, and the product ends up with several blues, a dozen button variants and spacing that nobody can explain. A design systems agency is a team that has cleaned this up many times and knows where the bodies are buried.',
        },
        { p: 'The work usually covers five things:' },
        {
          list: [
            '<strong>Audit.</strong> Read the Figma files, and ideally the code, and list every value and component the product really uses.',
            '<strong>Token architecture.</strong> Reduce those values to a small set of named design tokens (primitive, semantic and component layers) with light, dark and brand modes.',
            '<strong>Component library.</strong> Rebuild the components in Figma and in code against those tokens, with every state and property defined.',
            '<strong>Documentation.</strong> Write what each token and component is for, when to use it and what it must never do, for people and for coding agents.',
            '<strong>Adoption.</strong> Prove it on a real surface of the product and hand it over with a review routine, or stay on as a partner.',
          ],
        },
        {
          p: 'At Nicey, design systems are the primary practice and <a href="/product-design">product design</a> runs alongside it: when you need new screens, they are designed on the system we build, not next to it.',
        },
      ],
    },
    {
      id: 'signs-you-need-a-design-system-partner',
      title: 'Signs your product needs a design system partner',
      answer:
        'You need outside help when drift costs more than it saves: every new screen needs a design review to catch inconsistencies, engineers rebuild components that already exist, and coding agents produce UI that is almost, but not quite, on-brand.',
      blocks: [
        { p: 'The symptoms are usually visible before anyone names them. Look for these:' },
        {
          list: [
            'The same colour exists under several names in Figma and in code, and nobody is sure which one is right.',
            'There are two or more component libraries, or a library that most files no longer use.',
            'Dark mode, a second brand or a white-label client is on the roadmap and feels impossible.',
            'Design review spends its time on spacing and colour instead of on the problem being solved.',
            'Your team uses Cursor, Claude Code or Copilot, and the screens they produce need heavy cleanup.',
            'A redesign is planned, and you want it to be the last one that starts from scratch.',
          ],
        },
        {
          p: 'Hiring a full-time design systems team is the other route. It makes sense once the system exists and needs an owner. An agency is faster for the first build, because the patterns, tooling and audit scripts already exist, and it leaves your in-house team free to keep shipping.',
        },
        {
          callout:
            'If two or more of the signs above are true, run the <a href="/ai-ready.md">free self-check</a> with your own coding agent, or send us the Figma file for the full audit.',
        },
      ],
    },
    {
      id: 'design-systems-and-product-design',
      title: 'Design systems and product design: how the two fit',
      answer:
        'A design system is the set of rules and parts; product design is what you build with them. Doing both with one team means new screens ship on the system from day one, and gaps in the system show up while designing, not months later.',
      blocks: [
        {
          p: 'Agencies tend to sell one or the other. In practice they feed each other. A system built without real product work in front of it ends up abstract: perfect buttons that do not fit the dense tables, multi-step forms or status workflows your users live in. Product design done without a system produces beautiful screens that each invent their own rules.',
        },
        {
          table: {
            caption: 'What each practice delivers',
            head: ['', 'Design systems', 'Product design'],
            rows: [
              ['Question it answers', 'What are our parts and rules?', 'What should this feature do, and how?'],
              ['Main output', 'Tokens, components, documentation', 'Flows, screens, prototypes, shipped UI'],
              ['Who reads it', 'Designers, engineers, coding agents', 'Users, stakeholders, the build team'],
              ['Done when', 'A real surface is built through it with no defects', 'The feature ships and the numbers move'],
            ],
          },
        },
        {
          p: 'Read more on each: <a href="/design-systems">design systems at Nicey</a> covers audit, token architecture, components and documentation; <a href="/product-design">product design at Nicey</a> covers UX, design engineering and AI workflows in delivery.',
        },
        {
          media: {
            kind: 'video',
            ratio: '16 / 9',
            note: 'Split screen, 20 s loop: on the left a token changes in Figma (button/surface/primary), on the right the same change lands in a product screen (QBench or Everbreed) without anyone touching the screen.',
            caption: 'One change in the system, every screen that uses it updated.',
          },
        },
      ],
    },
    {
      id: 'coding-agents-and-design-systems',
      title: 'Why coding agents change what a design system has to be',
      answer:
        'Coding agents read your design system literally. They cannot ask a designer what a component is for, so the system has to write it down: descriptions on every component and token, bindings to semantic tokens, and declared slots instead of layers to guess from.',
      blocks: [
        {
          p: 'A human engineer who joins your team learns the unwritten rules in a few weeks. An agent never does. It reads the Figma file through MCP, the token files and the component code, and builds from exactly what is there. If a button is bound to <code>violet.500</code> instead of <code>color.accent</code>, the agent copies <code>violet.500</code>, and your next theme change misses that screen.',
        },
        { p: 'That is why we audit for four things on top of the usual quality checks:' },
        {
          list: [
            'Components have descriptions that say what they are and when to use them.',
            'Components bind to semantic tokens, not primitives.',
            'Inputs declare their icon and action slots as properties.',
            'Tokens have descriptions.',
          ],
          ordered: true,
        },
        {
          p: 'A system that passes these checks is easier for people too. The same descriptions answer the questions new designers ask in their first month. We call this documentation people and agents read the same way.',
        },
      ],
    },
    {
      id: 'working-with-nicey',
      title: 'What working with Nicey looks like',
      answer:
        'Every engagement runs the same five steps: map the drift, audit it, build the system, write the context, and prove it on one real surface of your product. You see results from the first week, and your product keeps shipping the whole time.',
      blocks: [
        {
          table: {
            head: ['Step', 'What we do', 'What you get'],
            rows: [
              ['01 Drift', 'Read the Figma file, compiled CSS and source; list every value the product uses.', 'A drift map: what exists, what it should be, where design and code disagree.'],
              ['02 Audit', 'Score the system on seven pillars, including what an agent needs.', 'A score per pillar, the findings, and a roadmap.'],
              ['03 System', 'One token model; components in Figma and code built against it.', 'One source of truth, in light, dark and brand modes.'],
              ['04 Context', 'A context file for every token and component.', 'Documentation people and coding agents read the same way.'],
              ['05 Proof', 'Build one real surface through the system, gated on defects.', 'A before and after report as the delivery document.'],
            ],
          },
        },
        {
          p: 'We migrate in slices instead of a big-bang rewrite. The pilot surface is something from your own roadmap, so the first thing the system produces is a feature you were going to ship anyway. See it applied in the <a href="/work/qbench-design-system">QBench design system case study</a>, where 1,071 references to outside libraries went to zero.',
        },
        {
          media: {
            kind: 'photo',
            ratio: '3 / 2',
            note: 'Working session, over-the-shoulder: the audit report open on one screen, the client’s Figma file on the other, two people pointing at the drift map. Real, not staged stock.',
          },
        },
      ],
    },
    {
      id: 'how-to-choose-a-design-systems-agency',
      title: 'How to choose a design systems agency',
      answer:
        'Pick a partner who works in both Figma and code, shows measured before-and-after results, can explain how their system works with coding agents, and leaves your team able to run it without them.',
      blocks: [
        { p: 'Questions worth asking any agency, us included:' },
        {
          list: [
            '<strong>Do you deliver code, or only Figma?</strong> A system that stops at Figma will drift again within a year.',
            '<strong>How do you measure the result?</strong> Look for numbers like token binding coverage or defects on a real surface, not only screenshots.',
            '<strong>Can our coding agents use it?</strong> Ask to see a component description and a token description from a past project.',
            '<strong>Do we have to stop shipping?</strong> The answer should be no: migration in slices, not a freeze.',
            '<strong>What happens after you leave?</strong> There should be documentation, a review cadence and an owner on your side.',
            '<strong>Will you start with an audit?</strong> A partner who quotes a full build before reading your files is guessing.',
          ],
        },
      ],
    },
    {
      id: 'start-with-a-free-audit',
      title: 'How to start: the free audit',
      answer:
        'Send us your Figma file and you get a score per pillar, the top findings and what to fix first. It is free, read-only, and we never edit your file. Or let your own coding agent run the same checks first.',
      blocks: [
        {
          p: 'The audit looks at seven pillars: token metadata, token binding, interaction states, component API, elevation and effects, AI readiness, and design-to-code sync when we have repo access. You get the report, then a call to walk through it.',
        },
        {
          p: 'Prefer to check on your own first? Paste the <a href="/ai-ready.md">self-check prompt</a> into Claude Code, Cursor or any agent with Figma access. It reads your file locally and nothing is sent to us. When you are ready, <a href="/#audit">get the full audit</a> or book a short intro call.',
        },
      ],
    },
  ],
};
