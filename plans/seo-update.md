# SEO update — plan

Status: **plan only, no code yet.** Start after the open PRs (#13–#18) are merged into `master`; then re-check every item below on the live site and update this list before working.

Compared on 28 Nov 2026: the SEO checklist (`personal-context/playbooks/seo-checklist.md`) against nicey.studio as crawlers see it (`curl` with Googlebot's user agent).

## Already in good shape
- Unique title, canonical URL and one H1 on every page.
- `robots.txt` allows all crawlers and points to `sitemap.xml`; the sitemap lists the 6 public pages.
- Missing pages return a real 404; `www` and `http` redirect to one host (`https://nicey.studio`).
- No broken internal links; no images without alt text.
- Structured data: Organization, Article, BreadcrumbList and Service on the service pages; `dateModified` on the homepage and service pages.
- `llms.txt`, Markdown twins of every page, Lighthouse CI on PRs.
- Private pages (`/brand`, `/studio/field`) are `noindex`.

## To do (most important first)

| # | Priority | Item | Detail |
|---|---|---|---|
| 1 | 🔴 | Share image | No page has an `og:image`, so links shared on LinkedIn or Slack show no picture. Add one per page (homepage, the two service pages, three case studies). |
| 2 | 🔴 | Placeholders on case studies | Google reads placeholder text in the HTML: Lorem ipsum in "About this project" on QBench, status workflows and Everbreed (Headquarters, Founded, Company size, Result), plus the dashed placeholders: team size, client quotes, "Work by" dates, QBench's two screenshots ("token layers", "library by function"). Fill in real facts, or hide each block until it exists. Facts come from Emir. |
| 3 | 🔴 | Meta descriptions too long | Homepage 200 characters, Everbreed 214, QBench 168. Trim to about 150–160. |
| 4 | 🟡 | Case study titles | Titles like "Everbreed case study · Nicey" (29 characters) don't say what the work was. Put the search target first, e.g. "Everbreed: Figma-to-code design system and student app · Nicey" (aim for 50–60). |
| 5 | 🟡 | Case study structured data | Add BreadcrumbList and `dateModified` (the service pages already have them). |
| 6 | 🟡 | Contact in the HTML | No contact email on any page. Add a real address to the footer (address from Emir). |
| 7 | ⚪ | Name AI search crawlers | `robots.txt` already allows everyone; optionally list `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot` by name. |
| 8 | 🔴 | Redirects from the old site | Old URLs that now return 404 lose their ranking. Emir exports the old URLs from Search Console; each one gets a 301 to its closest new page (404 when there is none). |
| 9 | 🟡 | Speed (Core Web Vitals on mobile) | Performance scores are 0.74–0.8. Everbreed's two big JPGs (`desktop-care.jpg` ~490 KB, `desktop-photos.jpg`) to WebP or AVIF; trim script work. |
| 10 | 🟡 | Homepage title | Put the main search phrase first; waits for the keyword choice (Phase 2). |
| 11 | 🟡 | "design system agency" on /design-systems | Use the phrase in an H2. FAQ schema and links to the three case studies are already live. |

## Already done
- Lighthouse CI on PRs (#12) is merged.

## Outside the code (Emir)
- Google Search Console and Bing Webmaster Tools: verify the site and submit the sitemap (status unknown).
- Analytics and conversion events: PR #14 (Google Analytics with consent bar); closes once it is merged.
- Later, as its own plan: monthly AI prompt portfolio, directories (LinkedIn company page, Clutch…), review profiles.

## Checks before the PR
- `curl -A "Googlebot"` on every page: title, description, canonical, og tags, JSON-LD.
- Google Rich Results Test on one case study and one service page.
- `astro build` and Lighthouse CI pass.
