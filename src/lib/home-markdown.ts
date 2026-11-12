/**
 * The homepage as an agent reads it: the same sections the page renders (static Zero Drift),
 * turned into Markdown. Used by the homepage's machine view and served at /index.md,
 * so the text never drifts from the page.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Hero from '../components/Hero.astro';
import ProofPanel from '../components/ProofPanel.astro';
import WhenToBring from '../components/WhenToBring.astro';
import ZeroDriftStatic from '../components/zero-drift/ZeroDriftStatic.astro';
import Services from '../components/Services.astro';
import Process from '../components/Process.astro';
import Work from '../components/Work.astro';
import Faq from '../components/Faq.astro';
import Footer from '../components/Footer.astro';
import { htmlToMarkdown } from './html-markdown';

const sections = [Hero, ProofPanel, WhenToBring, ZeroDriftStatic, Services, Process, Work, Faq, Footer];

export async function homeMarkdown(base: URL): Promise<string> {
  const container = await AstroContainer.create();
  const parts: string[] = [];
  for (const s of sections) parts.push(htmlToMarkdown(await container.renderToString(s), base));
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
