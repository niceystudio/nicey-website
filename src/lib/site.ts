/**
 * The production domain, in one place: astro.config.mjs sets `site` from it, and components fall back to it when they
 * render without Astro's config (the Markdown twins render them through the Astro container, where Astro.site is unset).
 */
export const SITE_URL = 'https://nicey.studio';
export const SITE = new URL(SITE_URL);

/** Google Analytics 4 measurement ID (G-…). Empty = no analytics on the site. */
export const GA_ID = '';
