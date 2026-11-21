/**
 * Every outbound or not-yet-built destination in one place.
 * Values of '#' are placeholders carried over from the canvas: fill them in here.
 * In-page anchors (#audit, #services, #work, #how) are real and live in the components.
 */
import { caseHref } from './case-studies';

export const links = {
  home: '/',
  bookCall: '#',
  /** the self-check (/ai-ready.md) ends with this: a Google Meet booking page, not set up yet (mock) */
  meeting: '[Google Meet booking link]',
  /** "Get a free audit" in the "It starts with a free audit" section */
  startAudit: '#',
  exploreDesignSystems: '#',
  exploreProductDesign: '#',
  /** site footer: contact and profiles (placeholders until we have them) */
  email: '#',
  linkedin: '#',
  github: '#',
  /** the case study pages (src/pages/work/[slug].astro) */
  work: {
    qbench: caseHref('qbench-design-system'),
    everbreed: caseHref('everbreed'),
    clerky: caseHref('clerky'),
    omnisafe: caseHref('omnisafe'),
    flyr: caseHref('flyr'),
  },
} as const;
