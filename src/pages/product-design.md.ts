import type { APIRoute } from 'astro';
import { serviceMarkdown } from '../lib/service-markdown';
import { productDesignPage } from '../data/service-pages';

/** /product-design as Markdown, for agents. */
export const GET: APIRoute = async ({ site }) =>
  new Response(await serviceMarkdown(productDesignPage, site ?? new URL('https://nicey-website.vercel.app')), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
