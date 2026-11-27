/**
 * Conversion events (SEO plan Phase 3), sent to Google Analytics. Base.astro loads gtag only on production and only
 * once GA_ID (src/lib/site.ts) is set; everywhere else track() does nothing. Mark the first two as key events in GA.
 *
 * Events:
 * - call_booked      a booking confirmed on cal.com (fired on /booked, where cal.com redirects after booking)
 * - audit_requested  the same, when the booking started from "Get a free audit" (source=audit)
 * - prompt_copied    "Copy prompt for your agent" put the prompt on the clipboard
 */
type Gtag = (command: 'event', name: string, params?: Record<string, string>) => void;

export function track(event: string, props?: Record<string, string>) {
  try {
    (window as unknown as { gtag?: Gtag }).gtag?.('event', event, props);
  } catch {
    // analytics must never break the page
  }
}
