/** /llms.txt: a plain index of the site for agents and AI search (llmstxt.org format). */
import type { APIRoute } from 'astro';
import { siteMarkdown } from '../lib/site-markdown';

export const GET: APIRoute = ({ site }) => {
  const body = siteMarkdown(site ?? new URL('https://nicey-website.vercel.app'));
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
