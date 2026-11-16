/**
 * The two practices, shown with equal weight: the homepage fork and each
 * practice page read their copy from here, so the two can't drift apart.
 *
 * DRAFT copy (not from the canvas, needs sign-off): the page headlines
 * and the product list items marked below. Everything else is existing
 * copy from the v3 canvas, the Process section or the case studies.
 */
import { links } from './links';
import type { Marker } from './zero-drift';

export interface Practice {
  key: 'systems' | 'product';
  name: string;
  marker: Marker;
  href: string;
  /** the one-line pitch on the homepage card */
  pitch: string;
  /** the practice page's h1 (draft) */
  headline: string;
  /** the practice page's lead paragraph */
  lead: string;
  items: string[];
}

export const practices: Practice[] = [
  {
    key: 'systems',
    name: 'Agentic design systems',
    marker: 'lavender',
    href: links.agenticDesignSystems,
    pitch: 'For products with years of drift, and teams that want their coding agents to build on-system.',
    headline: 'One system your people and your agents build from.',
    lead: 'We turn years of drifted UI into one system: tokens, components and documentation that a designer, an engineer and a coding agent understand the same way.',
    items: [
      'Audit and consolidation',
      'Token architecture and theming',
      'Component library, Figma to code',
      'AI-ready documentation',
      'Systems partner, monthly',
      'Free audit to start',
    ],
  },
  {
    key: 'product',
    name: 'Product design',
    marker: 'peach',
    href: links.productDesign,
    pitch: 'Complex workflows designed on the system we build, so new screens ship consistent from day one.',
    headline: 'Complex workflows, designed on a system.',
    lead: 'Complex workflows designed on the system we build, so new screens ship consistent from day one. Design engineering included: what we design is what your engineers build.',
    items: [
      'Product and UX design',
      'Design engineering',
      // draft: drawn from the QBench and Omnisafe case studies and the Process section
      'Complex and regulated workflows',
      'Testing with your people before build',
      'Scope locked in week one',
      'AI workflows in delivery',
    ],
  },
];

export const getPractice = (key: Practice['key']) =>
  practices.find((p) => p.key === key) as Practice;
