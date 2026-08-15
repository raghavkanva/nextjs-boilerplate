export type TrackValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | string[]
  | number[]
  | Array<Record<string, unknown>>;

export type TrackParams = Record<string, TrackValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];

    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      params?: TrackParams,
    ) => void;

    mixpanel?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      people: { set: (props: Record<string, unknown>) => void };
      register: (props: Record<string, unknown>) => void;
    };
  }
}

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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(ecommerceData);
}