// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import seoCheck from './src/integrations/seo-check.ts';
import { SITE_URL } from './src/lib/site.ts';

export default defineConfig({
  // the production domain: canonicals, the sitemap, llms.txt and JSON-LD are all built from it
  site: SITE_URL,
  output: 'static',
  integrations: [seoCheck()],
  vite: {
    plugins: [tailwindcss()],
  },
});
