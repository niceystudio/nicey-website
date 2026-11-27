/**
 * Build check for the SEO basics (SEO plan, Phase 1). After `astro build` it reads every page in dist/ and fails the
 * build when an indexable page:
 * - has no canonical, or more than one
 * - is missing from sitemap.xml
 * - links to "#" (a placeholder link)
 * - mentions the old vercel.app address
 * - still carries a media placeholder (MediaSlot) in a production build
 */
import type { AstroIntegration } from 'astro';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );

export default function seoCheck(): AstroIntegration {
  return {
    name: 'nicey-seo-check',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
        const problems: string[] = [];
        for (const file of htmlFiles(root)) {
          const html = readFileSync(file, 'utf8');
          const page = '/' + relative(root, file).split(sep).join('/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
          if (/<meta name="robots" content="noindex"/.test(html)) continue;
          const canonicals = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
          if (canonicals.length !== 1) problems.push(`${page}: ${canonicals.length} canonical tags`);
          const href = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
          if (href && !sitemap.includes(`<loc>${href}</loc>`)) problems.push(`${page}: ${href} is not in sitemap.xml`);
          if (/href="#"/.test(html)) problems.push(`${page}: a link to "#"`);
          if (/vercel\.app/.test(html)) problems.push(`${page}: mentions vercel.app`);
          if (/data-media-slot/.test(html) && process.env.VERCEL_ENV !== 'preview')
            problems.push(`${page}: a media placeholder (MediaSlot) is still on the page`);
        }
        if (problems.length) {
          problems.forEach((p) => logger.error(p));
          throw new Error(`SEO check failed: ${problems.length} problem(s), listed above.`);
        }
        logger.info('SEO check passed');
      },
    },
  };
}
