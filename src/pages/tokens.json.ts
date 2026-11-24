/** /tokens.json: every design token, parsed from src/styles/global.css, in the W3C design-tokens shape. */
import type { APIRoute } from 'astro';
import { tokensJson } from '../lib/design-tokens';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(tokensJson(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
