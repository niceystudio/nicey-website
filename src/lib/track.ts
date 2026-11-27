/**
 * Conversion events (SEO plan Phase 3), in one place. No analytics provider is wired up yet: until one is, track()
 * does nothing. When we pick one, send the event to it here and nowhere else.
 *
 * Events:
 * - call_booked      a booking confirmed on cal.com (fired on /booked, where cal.com redirects after booking)
 * - audit_requested  the same, when the booking started from "Get a free audit" (source=audit)
 * - prompt_copied    "Copy prompt for your agent" put the prompt on the clipboard
 */
export function track(_event: string, _props?: Record<string, string>) {
  // no provider yet
}
