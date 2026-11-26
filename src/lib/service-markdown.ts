/**
 * A service page as an agent reads it: ServiceBodyA rendered and turned into Markdown, so the twin never drifts
 * from the page. Served at /design-systems.md and /product-design.md.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ServiceBodyA from '../directions/a/ServiceBodyA.astro';
import type { ServicePage } from '../data/service-pages';
import { htmlToMarkdown } from './html-markdown';

export async function serviceMarkdown(page: ServicePage, base: URL): Promise<string> {
  const container = await AstroContainer.create();
  const body = htmlToMarkdown(await container.renderToString(ServiceBodyA, { props: { page } }), base);
  return [
    '---',
    `title: ${page.metaTitle}`,
    'studio: Nicey',
    `url: ${new URL(`/${page.slug}`, base).href}`,
    `updated: ${page.article.updated}`,
    '---',
    '',
    body,
    '',
  ].join('\n');
}
