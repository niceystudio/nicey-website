/**
 * Every outbound or not-yet-built destination in one place.
 * Values of '#' are placeholders carried over from the canvas: fill them in here.
 * In-page anchors (#audit, #services, #work, #how) are real and live in the components.
 */

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
  /** the case study rows: this review branch has no case study pages, so each row stays on the page (Work section) */
  work: {
    qbench: '#work',
    everbreed: '#work',
    clerky: '#work',
    omnisafe: '#work',
    flyr: '#work',
  },
} as const;
