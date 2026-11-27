/**
 * Lighthouse CI (SEO plan, Phase 1). Runs on every PR against the production build in dist/.
 * Fails on layout shift (CLS) or a weak SEO / accessibility score; performance only warns, because the shared
 * GitHub runner's timings are noisy.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        // trailing slashes: the local static server redirects without one (Vercel serves both)
        'http://localhost/',
        'http://localhost/design-systems/',
        'http://localhost/product-design/',
        'http://localhost/work/everbreed/',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median' }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.85 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500, aggregationMethod: 'median' }],
      },
    },
    // reports stay in the run: saved to .lighthouseci/ and attached to the GitHub run, not uploaded anywhere
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
};
