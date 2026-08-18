// ─── Storage keys ──────────────────────────────────────────────────────────
const FIRST_TOUCH_KEY = "etalvis_first_touch";
const LAST_TOUCH_KEY  = "etalvis_last_touch";
const VISITOR_ID_KEY  = "etalvis_visitor_id";
const FIRST_SEEN_KEY  = "etalvis_first_seen_at";
const SESSION_NUMBER_KEY = "etalvis_session_number";
const LAST_SEEN_KEY   = "etalvis_last_seen_at";

const SESSION_ID_KEY       = "etalvis_session_id";
const SESSION_STARTED_KEY  = "etalvis_session_started_at";

// Behavior counters – sessionStorage (per-session) + localStorage (lifetime)
const PRICING_VIEW_KEY    = "etalvis_c_pricing_views";
const PLAN_SELECT_KEY     = "etalvis_c_plan_selections";
const ENROLL_CLICK_KEY    = "etalvis_c_enroll_clicks";
const EVENT_SEQ_KEY       = "etalvis_c_event_seq";

// ─── UTM / click-ID parameter list ─────────────────────────────────────────
export const CAMPAIGN_PARAMETERS = [
  "utm_id", "utm_source", "utm_medium", "utm_campaign",
  "utm_source_platform", "utm_content", "utm_term",
  "utm_creative_format", "utm_marketing_tactic",
  "gclid", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "ttclid", "li_fat_id",
] as const;

type CampaignParameter = (typeof CAMPAIGN_PARAMETERS)[number];

export type CampaignData = Partial<Record<CampaignParameter, string>> & {
  source?: string;
  medium?: string;
  campaign?: string;
  traffic_channel?: string;
  traffic_subchannel?: string;
  landing_page?: string;
  landing_url?: string;
  referrer?: string;
  referrer_domain?: string;
  touch_timestamp?: string;
  is_ai_referral?: boolean;
  ai_source?: string;
};

// ─── Classification maps ────────────────────────────────────────────────────
const AI_DOMAINS: Record<string, string> = {
  "chat.openai.com": "ChatGPT",
  "chatgpt.com": "ChatGPT",
  "perplexity.ai": "Perplexity",
  "www.perplexity.ai": "Perplexity",
  "gemini.google.com": "Gemini",
  "bard.google.com": "Gemini",
  "copilot.microsoft.com": "Copilot",
  "claude.ai": "Claude",
  "you.com": "You.com",
  "phind.com": "Phind",
  "kagi.com": "Kagi",
  "poe.com": "Poe",
};

const SEARCH_ENGINES = ["google", "bing", "yahoo", "duckduckgo", "baidu", "yandex", "naver", "ecosia"];
const SOCIAL_SOURCES = ["facebook", "instagram", "meta", "fb", "ig", "twitter", "x.com", "linkedin", "pinterest", "youtube", "snapchat", "tiktok", "reddit", "whatsapp"];

// ─── Utilities ──────────────────────────────────────────────────────────────
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function safeParse(raw: string | null): CampaignData | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as CampaignData;
  } catch {
    return null;
  }
}

function getDomainFromUrl(url: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  }
}

// ─── Traffic channel classification ────────────────────────────────────────
function inferSourceMediumFromReferrer(referrer: string): { source: string; medium: string } {
  if (!referrer) return { source: "direct", medium: "none" };
  const domain = getDomainFromUrl(referrer).toLowerCase();

  // AI referrals
  for (const ai of Object.keys(AI_DOMAINS)) {
    if (domain === ai || domain.endsWith(`.${ai}`)) return { source: AI_DOMAINS[ai].toLowerCase(), medium: "referral" };
  }

  // Search engines
  for (const se of SEARCH_ENGINES) {
    if (domain.includes(se)) return { source: se, medium: "organic" };
  }

  // Social
  if (domain.includes("facebook") || domain.includes("fb.com")) return { source: "facebook", medium: "social" };
  if (domain.includes("instagram")) return { source: "instagram", medium: "social" };
  if (domain.includes("linkedin")) return { source: "linkedin", medium: "social" };
  if (domain.includes("twitter") || domain.includes("t.co") || domain.includes("x.com")) return { source: "twitter", medium: "social" };
  if (domain.includes("youtube")) return { source: "youtube", medium: "social" };
  if (domain.includes("whatsapp")) return { source: "whatsapp", medium: "social" };

  if (domain) return { source: domain, medium: "referral" };
  return { source: "direct", medium: "none" };
}

function classifyTrafficChannel(
  utmSource?: string,
  utmMedium?: string,
  referrer?: string,
  gclid?: string,
  fbclid?: string,
  msclkid?: string,
): { traffic_channel: string; traffic_subchannel: string } {
  const src  = (utmSource  || "").toLowerCase();
  const med  = (utmMedium  || "").toLowerCase();
  const ref  = (referrer   || "").toLowerCase();
  const refDomain = getDomainFromUrl(referrer || "").toLowerCase();

  // Google Ads
  if (gclid || med === "cpc" && (src.includes("google") || src === "")) {
    return { traffic_channel: "Paid Search", traffic_subchannel: "Google" };
  }
  // Microsoft Ads
  if (msclkid || (med === "cpc" && src.includes("bing"))) {
    return { traffic_channel: "Paid Search", traffic_subchannel: "Bing" };
  }
  // Meta/Instagram Ads
  if (fbclid || (["paid_social", "social_ad"].includes(med)) || (med === "cpc" && (src.includes("facebook") || src.includes("instagram") || src.includes("meta")))) {
    const sub = src.includes("instagram") ? "Instagram" : "Facebook";
    return { traffic_channel: "Paid Social", traffic_subchannel: sub };
  }
  // Other paid social
  if (["paid_social", "social_ad", "social_media_ad"].includes(med)) {
    const sub = src.includes("tiktok") ? "TikTok" : src.includes("linkedin") ? "LinkedIn" : src.includes("youtube") ? "YouTube" : "Social";
    return { traffic_channel: "Paid Social", traffic_subchannel: sub };
  }
  // Other paid search
  if (["cpc", "ppc", "paid_search"].includes(med)) {
    return { traffic_channel: "Paid Search", traffic_subchannel: src || "Other" };
  }
  // Email
  if (["email", "e-mail", "newsletter"].includes(med) || src === "email") {
    return { traffic_channel: "Email", traffic_subchannel: src || "Email" };
  }
  // WhatsApp
  if (src === "whatsapp" || med === "whatsapp" || refDomain.includes("whatsapp")) {
    return { traffic_channel: "WhatsApp", traffic_subchannel: "WhatsApp" };
  }
  // Organic search (UTM or referrer)
  if (med === "organic" || SEARCH_ENGINES.some(se => refDomain.includes(se))) {
    const se = src || SEARCH_ENGINES.find(se => refDomain.includes(se)) || "organic";
    const sub = se.includes("google") ? "Google" : se.includes("bing") ? "Bing" : se.includes("yahoo") ? "Yahoo" : se.charAt(0).toUpperCase() + se.slice(1);
    return { traffic_channel: "Organic Search", traffic_subchannel: sub };
  }
  // Organic social (UTM or referrer)
  if (["social", "social_media", "social-media"].includes(med) || SOCIAL_SOURCES.some(s => refDomain.includes(s))) {
    const sub = src.includes("instagram") ? "Instagram" : src.includes("facebook") || refDomain.includes("facebook") ? "Facebook" : src.includes("linkedin") ? "LinkedIn" : src.includes("youtube") || refDomain.includes("youtube") ? "YouTube" : src.includes("twitter") || src.includes("x.com") ? "Twitter/X" : src.includes("whatsapp") || refDomain.includes("whatsapp") ? "WhatsApp" : "Social";
    return { traffic_channel: "Organic Social", traffic_subchannel: sub };
  }
  // AI referral
  const aiName = detectAiReferral(referrer || "").ai_source;
  if (aiName && aiName !== "None") {
    return { traffic_channel: "AI Referral", traffic_subchannel: aiName };
  }
  // Referral with a domain
  if (ref && !ref.includes(isBrowser() ? window.location.hostname : "")) {
    return { traffic_channel: "Referral", traffic_subchannel: refDomain || "Other" };
  }
  // Direct
  if (!src && !med && !ref) {
    return { traffic_channel: "Direct", traffic_subchannel: "Direct" };
  }
  return { traffic_channel: "Other", traffic_subchannel: src || med || "Other" };
}

export function detectAiReferral(referrer: string): {
  is_ai_referral: boolean;
  ai_source: string;
  ai_referrer_domain: string;
  ai_landing_page: string;
} {
  if (!referrer) return { is_ai_referral: false, ai_source: "None", ai_referrer_domain: "None", ai_landing_page: "None" };

  const domain = getDomainFromUrl(referrer);
  for (const [key, name] of Object.entries(AI_DOMAINS)) {
    if (domain === key || domain.endsWith(`.${key}`)) {
      return {
        is_ai_referral: true,
        ai_source: name,
        ai_referrer_domain: domain,
        ai_landing_page: isBrowser() ? window.location.pathname : "not_available",
      };
    }
  }
  return { is_ai_referral: false, ai_source: "None", ai_referrer_domain: "None", ai_landing_page: "None" };
}

// ─── Visitor identity ───────────────────────────────────────────────────────
export function getVisitorId(): string {
  if (!isBrowser()) return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = createUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  if (!isBrowser()) return "";
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = createUUID();
    sessionStorage.setItem(SESSION_ID_KEY, id);
    sessionStorage.setItem(SESSION_STARTED_KEY, new Date().toISOString());
  }
  return id;
}

export function getUserId(): string {
  if (!isBrowser()) return "not_authenticated";
  // Attempt to read TagMango user ID from dataLayer (set by tm_new_signup / tm_login)
  const dl = (window.dataLayer || []) as Array<Record<string, unknown>>;
  for (let i = dl.length - 1; i >= 0; i--) {
    const e = dl[i];
    if (typeof e.user_id === "string" && e.user_id) return e.user_id;
  }
  return "not_authenticated";
}

export function getIdentityParameters(): Record<string, string> {
  return {
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    user_id: getUserId(),
  };
}

// ─── Session lifecycle ──────────────────────────────────────────────────────
function initSessionLifecycle(): void {
  if (!isBrowser()) return;

  const now = new Date().toISOString();
  const isNewVisitor = !localStorage.getItem(FIRST_SEEN_KEY);

  if (isNewVisitor) {
    localStorage.setItem(FIRST_SEEN_KEY, now);
    localStorage.setItem(SESSION_NUMBER_KEY, "0");
  }

  // New session: sessionStorage doesn't have our session id yet
  const existingSession = sessionStorage.getItem(SESSION_ID_KEY);
  if (!existingSession) {
    const prev = parseInt(localStorage.getItem(SESSION_NUMBER_KEY) || "0", 10);
    localStorage.setItem(SESSION_NUMBER_KEY, (prev + 1).toString());
    localStorage.setItem(LAST_SEEN_KEY, now);
    // session id and started_at are set lazily in getSessionId()
  }
}

export function getSessionLifecycleParameters(): Record<string, string | number> {
  if (!isBrowser()) return { session_number: 1, first_seen_at: "not_available", session_started_at: "not_available" };

  const now = Date.now();
  const firstSeen = localStorage.getItem(FIRST_SEEN_KEY) || "not_available";
  const sessionStarted = sessionStorage.getItem(SESSION_STARTED_KEY) || new Date().toISOString();
  const sessionNumber = parseInt(localStorage.getItem(SESSION_NUMBER_KEY) || "1", 10);

  const daysSinceFirstVisit = firstSeen !== "not_available"
    ? Math.floor((now - new Date(firstSeen).getTime()) / 86_400_000)
    : 0;

  return {
    first_seen_at: firstSeen,
    session_started_at: sessionStarted,
    session_number: sessionNumber,
    days_since_first_visit: daysSinceFirstVisit,
    event_timestamp: now,
  };
}

// ─── Behavior counters ──────────────────────────────────────────────────────
function incrementCounter(lsKey: string, ssKey: string): number {
  if (!isBrowser()) return 0;
  const lifetime = parseInt(localStorage.getItem(lsKey)  || "0", 10) + 1;
  const session  = parseInt(sessionStorage.getItem(ssKey) || "0", 10) + 1;
  localStorage.setItem(lsKey, lifetime.toString());
  sessionStorage.setItem(ssKey, session.toString());
  return lifetime;
}

function getCounter(ssKey: string): number {
  if (!isBrowser()) return 0;
  return parseInt(sessionStorage.getItem(ssKey) || "0", 10);
}

export function incrementPricingViewCount(): number  { return incrementCounter("etalvis_lt_pricing_views",    PRICING_VIEW_KEY); }
export function incrementPlanSelectionCount(): number { return incrementCounter("etalvis_lt_plan_selections",  PLAN_SELECT_KEY); }
export function incrementEnrollClickCount(): number   { return incrementCounter("etalvis_lt_enroll_clicks",    ENROLL_CLICK_KEY); }

export function getPricingViewCount(): number    { return getCounter(PRICING_VIEW_KEY); }
export function getPlanSelectionCount(): number  { return getCounter(PLAN_SELECT_KEY); }
export function getEnrollClickCount(): number    { return getCounter(ENROLL_CLICK_KEY); }

export function incrementEventSequence(): number {
  if (!isBrowser()) return 0;
  const seq = parseInt(sessionStorage.getItem(EVENT_SEQ_KEY) || "0", 10) + 1;
  sessionStorage.setItem(EVENT_SEQ_KEY, seq.toString());
  return seq;
}

// ─── Campaign data capture ──────────────────────────────────────────────────
function readCampaignFromUrl(): Partial<Record<CampaignParameter, string>> {
  if (!isBrowser()) return {};
  const sp = new URLSearchParams(window.location.search);
  const data: Partial<Record<CampaignParameter, string>> = {};
  for (const p of CAMPAIGN_PARAMETERS) {
    const v = sp.get(p);
    if (v) data[p] = v.trim();
  }
  return data;
}

export function hasCampaignData(data: Partial<Record<CampaignParameter, string>>): boolean {
  return CAMPAIGN_PARAMETERS.some((p) => Boolean(data[p]));
}

export function captureCampaignData(): void {
  if (!isBrowser()) return;

  initSessionLifecycle();
  getSessionId(); // ensure session is initialised + SESSION_STARTED_KEY is written

  const urlParams = readCampaignFromUrl();
  const referrer  = document.referrer;
  const refDomain = getDomainFromUrl(referrer);
  const now       = new Date().toISOString();

  const { source, medium } = hasCampaignData(urlParams)
    ? { source: urlParams.utm_source || urlParams.gclid ? "google" : urlParams.fbclid ? "facebook" : "not_set",
        medium: urlParams.utm_medium || (urlParams.gclid ? "cpc" : urlParams.fbclid ? "paid_social" : "not_set") }
    : inferSourceMediumFromReferrer(referrer);

  const { traffic_channel, traffic_subchannel } = classifyTrafficChannel(
    urlParams.utm_source, urlParams.utm_medium, referrer,
    urlParams.gclid, urlParams.fbclid, urlParams.msclkid,
  );

  const ai = detectAiReferral(referrer);

  if (!hasCampaignData(urlParams) && !referrer) {
    // Direct / internal — don't update last touch
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      const ft: CampaignData = {
        source: "direct", medium: "none", campaign: "not_set",
        traffic_channel: "Direct", traffic_subchannel: "Direct",
        landing_page: window.location.pathname,
        landing_url: window.location.href,
        referrer: "direct", referrer_domain: "none",
        touch_timestamp: now,
        is_ai_referral: false, ai_source: "None",
        ...urlParams,
      };
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(ft));
    }
    return;
  }

  const touchData: CampaignData = {
    ...urlParams,
    source, medium,
    campaign: urlParams.utm_campaign || "not_set",
    traffic_channel, traffic_subchannel,
    landing_page: window.location.pathname,
    landing_url: window.location.href,
    referrer: referrer || "direct",
    referrer_domain: refDomain || "none",
    touch_timestamp: now,
    is_ai_referral: ai.is_ai_referral,
    ai_source: ai.ai_source,
  };

  // First touch — never overwrite
  if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touchData));
  }

  // Last touch — update on any genuine entry
  sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(touchData));
}

function readFirstTouch(): CampaignData {
  return safeParse(localStorage.getItem(FIRST_TOUCH_KEY)) ?? {};
}

function readLastTouch(): CampaignData {
  return safeParse(sessionStorage.getItem(LAST_TOUCH_KEY))
      ?? safeParse(localStorage.getItem(FIRST_TOUCH_KEY))
      ?? {};
}

// ─── Parameter getters ──────────────────────────────────────────────────────
export function getFirstTouchParameters(): Record<string, string> {
  const ft = readFirstTouch();
  return {
    first_utm_source:  ft.utm_source  || "not_set",
    first_utm_medium:  ft.utm_medium  || "not_set",
    first_utm_campaign: ft.utm_campaign || "not_set",
    first_utm_id:      ft.utm_id      || "not_set",
    first_utm_content: ft.utm_content || "not_set",
    first_utm_term:    ft.utm_term    || "not_set",
    first_utm_source_platform:    ft.utm_source_platform    || "not_set",
    first_utm_creative_format:    ft.utm_creative_format    || "not_set",
    first_utm_marketing_tactic:   ft.utm_marketing_tactic   || "not_set",
    first_gclid:   ft.gclid   || "not_set",
    first_gbraid:  ft.gbraid  || "not_set",
    first_wbraid:  ft.wbraid  || "not_set",
    first_fbclid:  ft.fbclid  || "not_set",
    first_msclkid: ft.msclkid || "not_set",
    first_source:   ft.source   || "not_set",
    first_medium:   ft.medium   || "not_set",
    first_campaign: ft.campaign || "not_set",
    first_traffic_channel:    ft.traffic_channel    || "not_set",
    first_traffic_subchannel: ft.traffic_subchannel || "not_set",
    original_landing_page: ft.landing_page  || "not_available",
    original_landing_url:  ft.landing_url   || "not_available",
    original_referrer:     ft.referrer      || "direct",
    original_referrer_domain: ft.referrer_domain || "none",
    first_touch_timestamp: ft.touch_timestamp || "not_available",
  };
}

export function getLastTouchParameters(): Record<string, string> {
  const lt = readLastTouch();
  return {
    last_utm_source:  lt.utm_source  || "not_set",
    last_utm_medium:  lt.utm_medium  || "not_set",
    last_utm_campaign: lt.utm_campaign || "not_set",
    last_utm_id:      lt.utm_id      || "not_set",
    last_utm_content: lt.utm_content || "not_set",
    last_utm_term:    lt.utm_term    || "not_set",
    last_utm_source_platform:   lt.utm_source_platform   || "not_set",
    last_utm_creative_format:   lt.utm_creative_format   || "not_set",
    last_utm_marketing_tactic:  lt.utm_marketing_tactic  || "not_set",
    last_gclid:   lt.gclid   || "not_set",
    last_gbraid:  lt.gbraid  || "not_set",
    last_wbraid:  lt.wbraid  || "not_set",
    last_fbclid:  lt.fbclid  || "not_set",
    last_msclkid: lt.msclkid || "not_set",
    last_source:   lt.source   || "not_set",
    last_medium:   lt.medium   || "not_set",
    last_campaign: lt.campaign || "not_set",
    last_traffic_channel:    lt.traffic_channel    || "not_set",
    last_traffic_subchannel: lt.traffic_subchannel || "not_set",
    last_landing_page:    lt.landing_page    || "not_available",
    last_landing_url:     lt.landing_url     || "not_available",
    last_referrer:        lt.referrer        || "direct",
    last_referrer_domain: lt.referrer_domain || "none",
    last_touch_timestamp: lt.touch_timestamp || "not_available",
  };
}

export function getCurrentUTMParameters(): Record<string, string> {
  const lt = readLastTouch();
  return {
    utm_source:  lt.utm_source  || "not_set",
    utm_medium:  lt.utm_medium  || "not_set",
    utm_campaign: lt.utm_campaign || "not_set",
    utm_id:      lt.utm_id      || "not_set",
    utm_content: lt.utm_content || "not_set",
    utm_term:    lt.utm_term    || "not_set",
    utm_source_platform:  lt.utm_source_platform  || "not_set",
    utm_creative_format:  lt.utm_creative_format  || "not_set",
    utm_marketing_tactic: lt.utm_marketing_tactic || "not_set",
    gclid:   lt.gclid   || "not_set",
    gbraid:  lt.gbraid  || "not_set",
    wbraid:  lt.wbraid  || "not_set",
    fbclid:  lt.fbclid  || "not_set",
    msclkid: lt.msclkid || "not_set",
    traffic_channel:    lt.traffic_channel    || "not_set",
    traffic_subchannel: lt.traffic_subchannel || "not_set",
  };
}

export function getCampaignEventParameters(): Record<string, string> {
  return {
    ...getCurrentUTMParameters(),
    ...getFirstTouchParameters(),
    ...getLastTouchParameters(),
  };
}

// ─── Checkout URL builder ───────────────────────────────────────────────────
export function buildTrackedCheckoutUrl(
  checkoutUrl: string,
  checkoutLocation: string,
  courseSlug = "embedded-systems",
  planCode = "not_set",
): string {
  if (!isBrowser()) return checkoutUrl;

  try {
    const lt = readLastTouch();
    const currentParams = new URLSearchParams(window.location.search);
    const dest = new URL(checkoutUrl);

    // Forward UTMs + click IDs
    for (const p of CAMPAIGN_PARAMETERS) {
      const val = currentParams.get(p) || lt[p];
      if (val) dest.searchParams.set(p, val);
    }

    // Forward eTalVis context
    dest.searchParams.set("etv_visitor_id",       getVisitorId());
    dest.searchParams.set("etv_session_id",        getSessionId());
    dest.searchParams.set("etv_checkout_location", checkoutLocation);
    dest.searchParams.set("etv_origin_page",       window.location.pathname);
    dest.searchParams.set("etv_course_slug",       courseSlug);
    dest.searchParams.set("etv_plan_code",         planCode);

    return dest.toString();
  } catch {
    return checkoutUrl;
  }
}
