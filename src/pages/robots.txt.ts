/** /robots.txt: everyone may read the site, including AI crawlers; points at the sitemap. */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://nicey-website.vercel.app');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
