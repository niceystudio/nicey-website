/**
 * Every outbound or not-yet-built destination in one place.
 * Values of '#' are placeholders carried over from the canvas: fill them in here.
 * In-page anchors (#audit, #services, #work, #how) are real and live in the components.
 */
import { caseHref } from './case-studies';

export const links = {
  home: '/',
  /** the booking page the live site (nicey.studio) uses; opens in a new tab */
  bookCall: 'https://cal.com/nicey/intro',
  /** the self-check (/ai-ready.md) ends with this: the same booking page as bookCall */
  meeting: 'https://cal.com/nicey/intro',
  /** "Get a free audit" in the "It starts with a free audit" section */
  startAudit: '#',
  /** the service pages (src/pages/design-systems.astro, product-design.astro) */
  exploreDesignSystems: '/design-systems',
  exploreProductDesign: '/product-design',
  /** site footer: contact and profiles (placeholders until we have them) */
  email: '#',
  linkedin: 'https://www.linkedin.com/company/nicey-studio',
  github: 'https://github.com/niceystudio',
  /** the case study pages (src/pages/work/[slug].astro); Clerky, Omnisafe and FLYR are work in progress, so no page yet */
  work: {
    qbench: caseHref('qbench-design-system'),
    everbreed: caseHref('everbreed'),
  },
} as const;
