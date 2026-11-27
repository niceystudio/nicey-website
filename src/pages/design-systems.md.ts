import type { APIRoute } from 'astro';
import { serviceMarkdown } from '../lib/service-markdown';
import { designSystemsPage } from '../data/service-pages';

/** /design-systems as Markdown, for agents. */
export const GET: APIRoute = async ({ site }) =>
  new Response(await serviceMarkdown(designSystemsPage, site ?? new URL('https://nicey-website.vercel.app')), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
