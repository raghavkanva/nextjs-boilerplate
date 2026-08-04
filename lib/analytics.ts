export type TrackValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export type TrackParams = Record<string, TrackValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];

    gtag?: (
      command: "event",
      eventName: string,
      params?: TrackParams,
    ) => void;

    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      params?: TrackParams,
    ) => void;
  }
}

/**
 * Sends a custom event through:
 *
 * 1. Google Tag Manager dataLayer
 * 2. Meta Pixel as a custom event
 * 3. Direct gtag event when gtag is available
 *
 * Important:
 * If GTM also sends the same dataLayer event to the same GA4 property,
 * GA4 may receive duplicate events. Keep this setup only when you have
 * checked your GTM configuration.
 */
export function track(
  event: string,
  params: TrackParams = {},
): void {
  if (typeof window === "undefined") return;

  const eventData: Record<string, unknown> = {
    event,
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_query: window.location.search,
    page_title: document.title,
    page_referrer: document.referrer || "direct",
    event_timestamp: Date.now(),
    ...params,
  };

  /*
   * Send to Google Tag Manager.
   */
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  /*
   * Send to Meta Pixel as a custom event.
   */
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }

  /*
   * Send directly to GA4 through gtag.
   */
  if (typeof window.gtag === "function") {
    window.gtag("event", event, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      page_referrer: document.referrer || undefined,
      ...params,
    });
  }
}

/**
 * Sends a Meta Pixel standard event.
 *
 * Examples:
 * ViewContent
 * InitiateCheckout
 * Lead
 * Purchase
 */
export function metaEvent(
  standardEvent: string,
  params: TrackParams = {},
): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", standardEvent, params);
  }
}

/**
 * Sends a recommended GA4 ecommerce event directly and through GTM.
 *
 * Examples:
 * view_item
 * begin_checkout
 * purchase
 */
export function ecommerceEvent(
  event: string,
  params: TrackParams,
): void {
  if (typeof window === "undefined") return;

  const ecommerceData: Record<string, unknown> = {
    event,
    ecommerce: params,
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    event_timestamp: Date.now(),
  };

  /*
   * Clear previous ecommerce values before pushing a new ecommerce event.
   */
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: null,
  });

  window.dataLayer.push(ecommerceData);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      ...params,
    });
  }
}