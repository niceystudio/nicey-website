/**
 * The long-form articles at the bottom of the homepage and the service pages (ArticleA.astro).
 * Written for people first and for AI search second: every section opens with a one- or two-sentence answer that
 * still makes sense when it is quoted alone, then goes into detail. Inline HTML is allowed in strings
 * (<a>, <strong>, <em>, <code>); it is our own copy, never user input.
 */
import { founder } from './people';

/** a photo, video, screen recording or diagram still to make (MediaSlot.astro) */
export interface MediaSpec {
  kind: 'photo' | 'video' | 'screen' | 'diagram';
  /** CSS aspect-ratio, e.g. '16 / 9' */
  ratio?: string;
  /** what should go here */
  note: string;
  /** a short caption that will stay once the asset is in */
  caption?: string;
}

export type Block =
  | { p: string }
  | { h3: string }
  | { list: string[]; ordered?: boolean }
  | { table: { caption?: string; head: string[]; rows: string[][] } }
  | { callout: string }
  | { media: MediaSpec };

export interface ArticleSection {
  /** anchor id; stable, so links from elsewhere keep working */
  id: string;
  /** the H2, also the line in the contents list */
  title: string;
  /** the answer-first opener, quotable on its own */
  answer: string;
  blocks: Block[];
}

export interface Article {
  id: string;
  caption: string;
  title: string;
  lede: string;
  /** ISO date */
  updated: string;
  author: string;
  /** schema.org `about` */
  about: string[];
  sections: ArticleSection[];
}

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ');
const textOf = (b: Block): string =>
  'p' in b ? b.p : 'h3' in b ? b.h3 : 'list' in b ? b.list.join(' ') : 'table' in b ? b.table.rows.flat().join(' ') : 'callout' in b ? b.callout : '';

export function wordCount(a: Article): number {
  const all = [a.title, a.lede, ...a.sections.flatMap((s) => [s.title, s.answer, ...s.blocks.map(textOf)])].join(' ');
  return strip(all).split(/\s+/).filter(Boolean).length;
}

/** minutes, at 230 words a minute */
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordCount(a) / 230));

/** schema.org Article for the page's JSON-LD */
export function articleLd(a: Article, pageUrl: string) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.lede,
    url: `${pageUrl}#${a.id}`,
    mainEntityOfPage: pageUrl,
    dateModified: a.updated,
    datePublished: a.updated,
    wordCount: wordCount(a),
    about: a.about,
    author: founder,
    publisher: { '@type': 'Organization', name: 'Nicey Studio', url: new URL('/', pageUrl).href },
    articleSection: a.sections.map((s) => s.title),
  };
}
