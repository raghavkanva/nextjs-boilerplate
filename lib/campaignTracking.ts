const FIRST_TOUCH_KEY = "etalvis_first_touch_campaign";
const LAST_TOUCH_KEY = "etalvis_last_touch_campaign";
const SESSION_ID_KEY = "etalvis_campaign_session_id";

export const CAMPAIGN_PARAMETERS = [
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_source_platform",
  "utm_content",
  "utm_term",
  "utm_creative_format",
  "utm_marketing_tactic",

  // Advertising click IDs
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "li_fat_id",
] as const;

type CampaignParameter = (typeof CAMPAIGN_PARAMETERS)[number];

export type CampaignData = Partial<
  Record<CampaignParameter, string>
> & {
  campaign_session_id?: string;
  landing_page?: string;
  landing_page_path?: string;
  initial_referrer?: string;
  captured_at?: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createSessionId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function getCampaignSessionId(): string {
  if (!isBrowser()) return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = createSessionId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

function safeParse(rawValue: string | null): CampaignData | null {
  if (!rawValue) return null;

  try {
    const parsed: unknown = JSON.parse(rawValue);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as CampaignData;
  } catch {
    return null;
  }
}

function readCampaignFromUrl(): CampaignData {
  if (!isBrowser()) return {};

  const searchParams = new URLSearchParams(window.location.search);
  const campaignData: CampaignData = {};

  for (const parameter of CAMPAIGN_PARAMETERS) {
    const value = searchParams.get(parameter);

    if (value) {
      campaignData[parameter] = value.trim();
    }
  }

  return campaignData;
}

export function hasCampaignData(
  campaignData: CampaignData,
): boolean {
  return CAMPAIGN_PARAMETERS.some((parameter) =>
    Boolean(campaignData[parameter]),
  );
}

/**
 * Captures campaign data from the current landing-page URL.
 *
 * First touch:
 * Preserved in localStorage and not overwritten.
 *
 * Last touch:
 * Stored in sessionStorage and updated when a new tagged link is used.
 */
export function captureCampaignData(): CampaignData {
  if (!isBrowser()) return {};

  const campaignFromUrl = readCampaignFromUrl();

  const existingFirstTouch = safeParse(
    localStorage.getItem(FIRST_TOUCH_KEY),
  );

  const existingLastTouch = safeParse(
    sessionStorage.getItem(LAST_TOUCH_KEY),
  );

  const campaignSessionId = getCampaignSessionId();

  if (!hasCampaignData(campaignFromUrl)) {
    return {
      ...(existingLastTouch ?? existingFirstTouch ?? {}),
      campaign_session_id: campaignSessionId,
    };
  }

  const capturedData: CampaignData = {
    ...campaignFromUrl,
    campaign_session_id: campaignSessionId,
    landing_page: window.location.href,
    landing_page_path: window.location.pathname,
    initial_referrer: document.referrer || "direct",
    captured_at: new Date().toISOString(),
  };

  if (!existingFirstTouch) {
    localStorage.setItem(
      FIRST_TOUCH_KEY,
      JSON.stringify(capturedData),
    );
  }

  sessionStorage.setItem(
    LAST_TOUCH_KEY,
    JSON.stringify(capturedData),
  );

  return capturedData;
}

export function getFirstTouchCampaign(): CampaignData {
  if (!isBrowser()) return {};

  return {
    ...(safeParse(localStorage.getItem(FIRST_TOUCH_KEY)) ?? {}),
    campaign_session_id: getCampaignSessionId(),
  };
}

export function getLastTouchCampaign(): CampaignData {
  if (!isBrowser()) return {};

  const lastTouch = safeParse(
    sessionStorage.getItem(LAST_TOUCH_KEY),
  );

  const firstTouch = safeParse(
    localStorage.getItem(FIRST_TOUCH_KEY),
  );

  return {
    ...(lastTouch ?? firstTouch ?? {}),
    campaign_session_id: getCampaignSessionId(),
  };
}

/**
 * Builds the final checkout URL and forces campaign parameters into it.
 *
 * Existing checkout query parameters are preserved.
 * Google Ads, Meta, Microsoft, LinkedIn and TikTok click IDs are preserved.
 */
export function buildTrackedCheckoutUrl(
  checkoutUrl: string,
  checkoutLocation: string,
): string {
  if (!isBrowser()) return checkoutUrl;

  try {
    const campaignData = captureCampaignData();
    const destinationUrl = new URL(checkoutUrl);

    for (const parameter of CAMPAIGN_PARAMETERS) {
      const value = campaignData[parameter];

      if (value) {
        destinationUrl.searchParams.set(parameter, value);
      }
    }

    if (campaignData.campaign_session_id) {
      destinationUrl.searchParams.set(
        "etv_campaign_session_id",
        campaignData.campaign_session_id,
      );
    }

    destinationUrl.searchParams.set(
      "etv_checkout_location",
      checkoutLocation,
    );

    destinationUrl.searchParams.set(
      "etv_origin_page",
      window.location.pathname,
    );

    return destinationUrl.toString();
  } catch (error) {
    console.error("Unable to build tracked checkout URL:", error);

    return checkoutUrl;
  }
}

/**
 * Returns campaign values in a format that can be added to analytics events.
 */
export function getCampaignEventParameters(): Record<
  string,
  string
> {
  if (!isBrowser()) return {};

  const firstTouch = getFirstTouchCampaign();
  const lastTouch = getLastTouchCampaign();

  return {
    campaign_session_id:
      lastTouch.campaign_session_id ?? "not_available",

    first_utm_id: firstTouch.utm_id ?? "not_set",
    first_utm_source: firstTouch.utm_source ?? "not_set",
    first_utm_medium: firstTouch.utm_medium ?? "not_set",
    first_utm_campaign:
      firstTouch.utm_campaign ?? "not_set",
    first_utm_content:
      firstTouch.utm_content ?? "not_set",
    first_utm_term: firstTouch.utm_term ?? "not_set",

    last_utm_id: lastTouch.utm_id ?? "not_set",
    last_utm_source: lastTouch.utm_source ?? "not_set",
    last_utm_medium: lastTouch.utm_medium ?? "not_set",
    last_utm_campaign:
      lastTouch.utm_campaign ?? "not_set",
    last_utm_content:
      lastTouch.utm_content ?? "not_set",
    last_utm_term: lastTouch.utm_term ?? "not_set",

    gclid: lastTouch.gclid ?? "not_set",
    gbraid: lastTouch.gbraid ?? "not_set",
    wbraid: lastTouch.wbraid ?? "not_set",
    fbclid: lastTouch.fbclid ?? "not_set",
    msclkid: lastTouch.msclkid ?? "not_set",

    original_landing_page:
      firstTouch.landing_page_path ?? "not_available",

    original_referrer:
      firstTouch.initial_referrer ?? "direct",
  };
}