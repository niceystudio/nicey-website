/**
 * The homepage as an agent reads it: the same sections the page renders (direction A),
 * turned into Markdown. Used by the homepage's machine view and served at /index.md,
 * so the text never drifts from the page.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HeroA from '../directions/a/HeroA.astro';
import SelectedA from '../directions/a/SelectedA.astro';
import ServicesA from '../directions/a/ServicesA.astro';
import WorkA from '../directions/a/WorkA.astro';
import HowA from '../directions/a/HowA.astro';
import ProcessA from '../directions/a/ProcessA.astro';
import Faq from '../components/Faq.astro';
import BookCallA from '../directions/a/BookCallA.astro';
import ArticleA from '../directions/a/ArticleA.astro';
import { homeArticle } from '../data/articles/home';
import { htmlToMarkdown } from './html-markdown';

const sections = [HeroA, SelectedA, ServicesA, WorkA, HowA, ProcessA, Faq, BookCallA];

export async function homeMarkdown(base: URL): Promise<string> {
  const container = await AstroContainer.create();
  const parts: string[] = [];
  for (const s of sections) parts.push(htmlToMarkdown(await container.renderToString(s), base));
  parts.push(htmlToMarkdown(await container.renderToString(ArticleA, { props: { article: homeArticle } }), base));
  return [
    '---',
    'title: Nicey Studio',
    'studio: Nicey',
    `url: ${new URL('/', base).href}`,
    '---',
    '',
    ...parts.filter(Boolean).map((p) => `${p}\n`),
  ].join('\n');
}
