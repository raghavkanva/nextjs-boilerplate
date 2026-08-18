import { incrementEventSequence } from "@/lib/campaignTracking";

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
      track:    (event: string, params?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      register: (props: Record<string, unknown>) => void;
      people: { set: (props: Record<string, unknown>) => void };
    };
  }
}

// ─── Device context ──────────────────────────────────────────────────────────
export function getDeviceContext(): Record<string, string | number | boolean> {
  if (typeof window === "undefined") return {};

  const ua  = navigator.userAgent;
  const vw  = window.innerWidth;
  const vh  = window.innerHeight;

  function getBrowser(agent: string): string {
    if (/Edg\//.test(agent))    return "Edge";
    if (/OPR\/|Opera/.test(agent)) return "Opera";
    if (/Chrome\//.test(agent)) return "Chrome";
    if (/Firefox\//.test(agent)) return "Firefox";
    if (/Safari\//.test(agent)) return "Safari";
    return "Other";
  }

  function getBrowserVersion(agent: string, browser: string): string {
    const patterns: Record<string, RegExp> = {
      Chrome:  /Chrome\/([\d.]+)/,
      Firefox: /Firefox\/([\d.]+)/,
      Safari:  /Version\/([\d.]+)/,
      Edge:    /Edg\/([\d.]+)/,
      Opera:   /OPR\/([\d.]+)/,
    };
    const m = agent.match(patterns[browser]);
    return m ? m[1].split(".")[0] : "unknown";
  }

  function getOS(agent: string): string {
    if (/Windows/.test(agent)) return "Windows";
    if (/Mac OS X/.test(agent) && !/iPhone|iPad/.test(agent)) return "macOS";
    if (/Android/.test(agent)) return "Android";
    if (/iPhone|iPad/.test(agent)) return "iOS";
    if (/Linux/.test(agent)) return "Linux";
    return "Other";
  }

  const browser = getBrowser(ua);
  const isMobile  = vw < 768;
  const isTablet  = vw >= 768 && vw < 1024;

  return {
    device_type:     isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
    is_mobile:       isMobile,
    is_tablet:       isTablet,
    is_desktop:      !isMobile && !isTablet,
    browser,
    browser_version: getBrowserVersion(ua, browser),
    operating_system: getOS(ua),
    screen_width:    screen.width,
    screen_height:   screen.height,
    viewport_width:  vw,
    viewport_height: vh,
    language:        navigator.language || "unknown",
    timezone:        Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
  };
}

// ─── Core track() ────────────────────────────────────────────────────────────
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  const seq = incrementEventSequence();

  const eventData: Record<string, unknown> = {
    event,
    event_name:      event,
    event_timestamp: Date.now(),
    event_sequence_number: seq,
    page_url:    window.location.href,
    page_path:   window.location.pathname,
    page_query:  window.location.search,
    page_title:  document.title,
    page_referrer: document.referrer || "direct",
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  // Meta custom event (READ-ONLY — kept as-is, no changes)
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }
}

// ─── Meta standard events (READ-ONLY — do not modify) ────────────────────────
export function metaEvent(standardEvent: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", standardEvent, params);
  }
}

// ─── GA4-style ecommerce events ──────────────────────────────────────────────
export function ecommerceEvent(event: string, params: TrackParams): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event,
    ecommerce: params,
    page_url:   window.location.href,
    page_path:  window.location.pathname,
    page_title: document.title,
    event_timestamp: Date.now(),
  });
}
