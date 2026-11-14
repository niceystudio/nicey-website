/** /sitemap.xml: every page, for search engines. */
import type { APIRoute } from 'astro';
import { caseStudies, caseHref } from '../data/case-studies';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://nicey-website.vercel.app');
  const urls = ['/', ...caseStudies.map((c) => caseHref(c.slug))].map((p) => new URL(p, base).href);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
