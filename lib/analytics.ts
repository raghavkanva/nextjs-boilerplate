type TrackParams = Record<string, string | number | boolean>;

/**
 * Fire a custom event to both GTM (dataLayer) and Meta Pixel (fbq trackCustom).
 * Also calls window.gtag if available for direct GA4 setups.
 */
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({
    event,
    page_url: window.location.pathname,
    page_path: window.location.pathname,
    ...params,
  });
  if ((window as any).fbq) {
    (window as any).fbq("trackCustom", event, params);
  }
  if ((window as any).gtag) {
    (window as any).gtag("event", event, params);
  }
}

/**
 * Fire a Meta Pixel standard event (e.g. InitiateCheckout, ViewContent, Lead).
 * Standard events power Meta's conversion optimisation — use them for key funnel steps.
 */
export function metaEvent(standardEvent: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  if ((window as any).fbq) {
    (window as any).fbq("track", standardEvent, params);
  }
}
