/**
 * /sitemap.xml: every indexable page, for search engines, with the date its content last changed.
 * lastmod = the last commit that touched the page's sources (git is there at build time locally and on Vercel);
 * without git it falls back to the build date. A new page goes in `pages` below; the build check
 * (src/integrations/seo-check.ts) fails the build if an indexable page is missing from here.
 */
import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { publishedCaseStudies, caseHref } from '../data/case-studies';

const today = new Date().toISOString().slice(0, 10);
function lastChanged(sources: string[]): string {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], { encoding: 'utf8' }).trim();
    return d || today;
  } catch {
    return today;
  }
}

const shared = ['src/layouts', 'src/components', 'src/directions/a'];
const pages: { path: string; sources: string[] }[] = [
  { path: '/', sources: [...shared, 'src/data/articles/home.ts', 'src/data/case-studies-a.ts'] },
  { path: '/design-systems', sources: [...shared, 'src/data/service-pages.ts', 'src/data/articles/design-systems.ts'] },
  { path: '/product-design', sources: [...shared, 'src/data/service-pages.ts', 'src/data/articles/product-design.ts'] },
  ...publishedCaseStudies.map((c) => ({
    path: caseHref(c.slug),
    sources: [...shared, 'src/components/case-study', 'src/data/case-studies.ts', 'src/data/case-studies-a.ts'],
  })),
];

export const GET: APIRoute = ({ site }) => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(p.path, site!).href}</loc><lastmod>${lastChanged(p.sources)}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
