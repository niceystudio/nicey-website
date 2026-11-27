/**
 * Analytics events (Plausible, SEO plan Phase 3). Base.astro defines a queueing `plausible` stub on every page and
 * loads the real script only on production, so calls from dev and previews go nowhere.
 *
 * Events, set up as goals in Plausible:
 * - call_booked      a booking confirmed on cal.com (fired on /booked, where cal.com redirects after booking)
 * - audit_requested  the same, when the booking started from "Get a free audit" (source=audit)
 * - prompt_copied    "Copy prompt for your agent" put the prompt on the clipboard
 */
type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: string, props?: Record<string, string>) {
  try {
    (window as unknown as { plausible?: Plausible }).plausible?.(event, props && { props });
  } catch {
    // analytics must never break the page
  }
}
