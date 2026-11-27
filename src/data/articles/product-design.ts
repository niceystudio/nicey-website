/**
 * The /product-design article, after the call band: modern product design with AI in the loop (Goran, 26 Nov).
 * Practice, not prophecy: what changes in the work when agents can build, and what stays a design decision.
 */
import type { Article } from '../article-types';

export const productDesignArticle: Article = {
  id: 'guide',
  caption: 'Field guide',
  title: 'Product design with AI in the loop: a practical guide',
  lede: 'How product design works now that prototypes cost minutes and coding agents can build what you draw: what changes in the process, how to design AI features people trust, and where design engineering fits.',
  updated: '2026-11-26',
  author: 'Nicey Studio',
  about: ['Product design', 'UX design', 'Design engineering', 'AI product design', 'AI-assisted prototyping', 'Design systems'],
  sections: [
    {
      id: 'what-is-product-design-now',
      title: 'What is product design today?',
      answer:
        'Product design is deciding what a product should do and how it should feel to use, then making sure that decision survives all the way to production. With AI in the workflow, less time goes into drawing screens and more into framing the problem, judging options and setting the rules the build follows.',
      blocks: [
        {
          p: 'The craft has not changed: understand the user, shape the flow, get the details right. What changed is the cost of each step. A clickable prototype that took a week can now take an afternoon. A first build that took a sprint can be drafted by a coding agent in an hour. When making is cheap, the scarce skill is knowing what is worth making, and recognising when a generated result is subtly wrong.',
        },
        {
          table: {
            head: ['', 'Before', 'Now'],
            rows: [
              ['Slowest step', 'Drawing and redrawing screens', 'Deciding which option is right'],
              ['Prototype fidelity', 'Clickable mockups', 'Working code with real data'],
              ['Design handoff', 'Specs and redlines', 'A design system and context the build reads directly'],
              ['Main risk', 'Building the wrong thing slowly', 'Building the wrong thing quickly, and inconsistently'],
            ],
          },
        },
      ],
    },
    {
      id: 'how-ai-changed-the-design-process',
      title: 'How AI changed the product design process',
      answer:
        'AI compresses the middle of the process (exploration, prototyping and first builds) and leaves the ends to people: framing the problem at the start, and judging quality and consistency at the end. Teams that win use the saved time to test more options with real users, not to ship more screens.',
      blocks: [
        { p: 'In our projects, AI now does real work at every stage, with a person accountable for each result:' },
        {
          list: [
            '<strong>Research synthesis.</strong> Agents cluster interview notes and support tickets; a designer checks the clusters against the raw quotes before anyone trusts them.',
            '<strong>Exploration.</strong> Several directions for a flow, generated from the design system, so even rough options use real components.',
            '<strong>Prototyping.</strong> Working prototypes in code instead of linked frames, so usability tests run on realistic behaviour.',
            '<strong>Build.</strong> Coding agents implement screens against the component library, gated on the same defect checks as people.',
            '<strong>Review.</strong> Automated checks catch raw values and off-system components; people review the decisions.',
          ],
        },
        {
          media: {
            kind: 'video',
            ratio: '16 / 9',
            note: 'Screen recording, 30 s: a designer writes a short brief in Claude Code, the agent builds a screen from the design system, the designer corrects one decision in Figma and the agent rebuilds. Speed up the waits; keep the correction at normal speed.',
            caption: 'The designer sets the rules and makes the calls; the agent does the typing.',
          },
        },
      ],
    },
    {
      id: 'designing-on-a-design-system',
      title: 'Designing on a design system, not beside it',
      answer:
        'Product design is faster and more consistent when every screen is designed from the design system’s tokens and components. New patterns found during product work go back into the system, so the next feature, and the next agent, can reuse them.',
      blocks: [
        {
          p: 'This matters more with agents than without them. An agent asked to build a screen will use whatever it can find. If the design was drawn with detached values, the agent copies those values, and the product forks a little further with each feature. If the design uses the system, the build does too.',
        },
        {
          p: 'That is why at Nicey <a href="/design-systems">design systems</a> are the primary practice and product design runs alongside it. In the <a href="/work/qbench-status-workflows">QBench status workflows</a> project, complex lab workflows were designed directly on the system we had built, so the new screens shipped consistent from day one.',
        },
        {
          callout: 'A gap in the system found while designing a feature is the best kind of design system work: it is real, it is needed now, and it is tested before it ships.',
        },
      ],
    },
    {
      id: 'designing-ai-features',
      title: 'Designing AI features people trust',
      answer:
        'AI features need design for uncertainty. Show what the system is doing while it works, make results easy to check and to undo, let people correct the output instead of starting over, and keep a human decision wherever a mistake is costly.',
      blocks: [
        { p: 'Patterns we use on almost every AI feature:' },
        {
          table: {
            head: ['Pattern', 'What it solves', 'Example'],
            rows: [
              ['Visible progress', 'Waiting on a model feels broken without feedback', 'Stream partial results; name the step in progress'],
              ['Show the source', 'People cannot judge an answer they cannot trace', 'Cite the record, file or row the answer came from'],
              ['Edit, don’t regenerate', 'Regenerating throws away what was already right', 'Inline edits to a draft, then apply'],
              ['Undo and history', 'Confidence to try comes from being able to go back', 'One-step undo and a visible version list'],
              ['Human checkpoint', 'Some actions should never be automatic', 'Agent prepares, person signs off (e.g. status changes)'],
              ['Graceful failure', 'Models fail in odd ways', 'Plain-language error with the manual path one click away'],
            ],
          },
        },
        {
          p: 'Every pattern above also needs components: a streaming text block, a citation chip, a diff view, an approval bar. They belong in the design system like any other part, with states for loading, partial, failed and done.',
        },
        {
          media: {
            kind: 'screen',
            ratio: '4 / 3',
            note: 'UI close-up of an AI feature built on the system: a draft streaming into a panel, citation chips linking to source records, and an Approve / Edit bar at the bottom. Mock data from a lab or care workflow, no lorem ipsum.',
          },
        },
      ],
    },
    {
      id: 'design-engineering',
      title: 'Design engineering: when the designer ships code',
      answer:
        'Design engineering is designing in the medium the product ships in. A design engineer prototypes in real code, builds and maintains the components of the design system, and closes the gap between what was designed and what users actually get.',
      blocks: [
        {
          p: 'The role used to be rare because it needed two careers’ worth of skills. Coding agents lower the bar on the engineering side, which makes the design judgement the part that matters most. A design engineer decides how a motion feels, how a table behaves at 2,000 rows, what a focus ring looks like on every background, and then makes it true in code.',
        },
        { p: 'What design engineering covers in our projects:' },
        {
          list: [
            'Building and testing components of the design system in code, with every state.',
            'Interaction and motion details that never survive a static handoff.',
            'High-fidelity prototypes on real data for usability testing.',
            'Pairing with your engineers and their agents during the pilot build.',
          ],
        },
      ],
    },
    {
      id: 'prototyping-with-coding-agents',
      title: 'Prototyping with coding agents',
      answer:
        'Prototype with coding agents by giving them the design system, a short brief and a narrow task, then iterate in small steps. The prototype is for learning, so judge it on what it teaches you, and rebuild it properly once the direction is clear.',
      blocks: [
        {
          list: [
            '<strong>Give it the system.</strong> Point the agent at the component library and its context files, not at screenshots.',
            '<strong>Write the brief like a ticket.</strong> Who the user is, what they are trying to do, what done looks like, what is out of scope.',
            '<strong>One flow at a time.</strong> Small tasks keep the agent on the system; big ones invite it to improvise.',
            '<strong>Real data early.</strong> Long names, empty states and errors expose design problems that tidy mock data hides.',
            '<strong>Throw it away on purpose.</strong> When the direction is proven, build the production version through the normal gate.',
          ],
          ordered: true,
        },
        {
          media: {
            kind: 'video',
            ratio: '9 / 16',
            note: 'Phone-size prototype clip (like the Everbreed mobile clips): the same flow in three generated variants side by side, then the chosen one with real content. Vertical, 15 s.',
          },
        },
      ],
    },
    {
      id: 'research-when-building-is-cheap',
      title: 'Research and validation when building is cheap',
      answer:
        'When building is cheap, validation becomes the bottleneck. Test working prototypes with real users early and often, ask about behaviour rather than opinions, and use AI to speed up synthesis, never to replace talking to people.',
      blocks: [
        {
          p: 'It is tempting to skip research because you can just ship and see. That works for small, reversible changes. For workflows people depend on (signing off a lab result, logging care for an animal, approving a payment), a wrong default costs trust that is hard to win back. Five short sessions with a working prototype still catch most of the problems.',
        },
        {
          p: 'Watch what people do with the prototype, not what they say about it. Where they hesitate, re-read a label or look for the next step, the design is asking them to think. In the <a href="/work/everbreed">Everbreed</a> student app, for example, the weekly care summary ends in one clear Continue action, so the next step is never a question.',
        },
      ],
    },
    {
      id: 'measuring-product-design-quality',
      title: 'Measuring product design quality',
      answer:
        'Measure product design on two levels: whether users succeed (task completion, time to complete, errors, support tickets) and whether the build stayed true to the design (defects found in review, off-system values, components outside the library).',
      blocks: [
        {
          table: {
            head: ['Level', 'Measure', 'Where it comes from'],
            rows: [
              ['User outcome', 'Task success and time on task', 'Usability tests, product analytics'],
              ['User outcome', 'Errors and recoveries', 'Analytics, support tickets'],
              ['Build fidelity', 'T1 / T2 / T3 defects at review', 'The defect gate on each surface'],
              ['Build fidelity', 'Raw values and off-system components', 'Automated checks in CI'],
              ['Team speed', 'Time from brief to tested prototype', 'Your own delivery data'],
            ],
          },
        },
        {
          p: 'The second level is where a design system pays for itself. When fidelity is checked automatically, review time goes back to the questions only people can answer.',
        },
      ],
    },
    {
      id: 'working-with-nicey-on-product-design',
      title: 'Working with Nicey on product design',
      answer:
        'We take on product design when the screens need the system, or the system needs the screens. A typical engagement covers one workflow end to end: framing, flows, prototype, test, and a pilot build with your team and its agents.',
      blocks: [
        {
          list: [
            '<strong>Product and UX design</strong> for complex workflows: dense data, multi-step tasks, roles and permissions.',
            '<strong>Design engineering</strong>: components and prototypes in your stack, not just in Figma.',
            '<strong>AI workflows in delivery</strong>: setting up your agents to build on the system, with briefs, context files and review gates.',
          ],
        },
        {
          p: 'Most projects start with a design system audit, because it shows what the new screens can stand on. It is free and read-only: <a href="/#audit">get the audit</a> or book a short intro call to talk about a specific workflow.',
        },
      ],
    },
  ],
};
