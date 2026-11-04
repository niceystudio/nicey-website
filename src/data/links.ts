/**
 * Every outbound or not-yet-built destination in one place.
 * Values of '#' are placeholders carried over from the canvas: fill them in here.
 * In-page anchors (#audit, #services, #work, #how) are real and live in the components.
 */
export const links = {
  home: '#',
  bookCall: '#',
  /** "Get a free audit" in the "It starts with a free audit" section */
  startAudit: '#',
  exploreDesignSystems: '#',
  exploreProductDesign: '#',
  work: {
    qbench: '#',
    everbreed: '#',
    clerky: '#',
    omnisafe: '#',
    flyr: '#',
  },
} as const;
