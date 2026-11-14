import type { APIRoute } from 'astro';
import { homeMarkdown } from '../lib/home-markdown';

/** The homepage as Markdown, for agents (same text as the homepage's machine view). */
export const GET: APIRoute = async ({ site }) =>
  new Response(await homeMarkdown(site ?? new URL('https://nicey-website.vercel.app')), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
