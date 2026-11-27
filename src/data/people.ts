/**
 * People named on the site. Goran signs the articles and case studies (decided 27 Nov in the SEO plan):
 * a named author with Person data carries more trust with search and AI answers than a company name.
 */
import { SITE_URL } from '../lib/site';

export const founder = {
  '@type': 'Person',
  name: 'Goran Babarogic',
  image: `${SITE_URL}/team/goran.jpg`,
  worksFor: { '@type': 'Organization', name: 'Nicey Studio', url: `${SITE_URL}/` },
} as const;
