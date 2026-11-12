import type { APIRoute } from 'astro';
import { aiReadyMarkdown } from '../lib/ai-ready';

/** The four AI-readiness checks as Markdown, for a visitor's coding agent. */
export const GET: APIRoute = ({ site }) =>
  new Response(aiReadyMarkdown(site ?? new URL('https://nicey-website.vercel.app')), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
