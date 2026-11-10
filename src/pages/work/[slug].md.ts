/** The Markdown twin of each case study: /work/<slug>.md (what the page's Machine view shows). */
import type { APIRoute, GetStaticPaths } from 'astro';
import { caseStudies, caseHref, type CaseStudy } from '../../data/case-studies';
import { caseMarkdown } from '../../lib/case-markdown';

export const getStaticPaths = (() =>
  caseStudies.map((study) => ({ params: { slug: study.slug }, props: { study } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const study = props.study as CaseStudy;
  const url = new URL(caseHref(study.slug), site ?? 'https://nicey-website.vercel.app').href;
  return new Response(caseMarkdown(study, url), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
