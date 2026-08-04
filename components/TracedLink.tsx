"use client";

import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import {
  ecommerceEvent,
  metaEvent,
  track,
  type TrackParams,
} from "@/lib/analytics";

import {
  buildTrackedCheckoutUrl,
  captureCampaignData,
  getCampaignEventParameters,
} from "@/lib/campaignTracking";

type TrackedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick" | "children"
> & {
  href: string;
  event: string;
  params?: TrackParams;
  metaStdEvent?: string;
  metaStdParams?: TrackParams;
  children: ReactNode;
};

const RESUME_SESSION_ITEM = {
  item_id: "resume-session-aug-2026",
  item_name: "Resume Masterclass",
  item_brand: "eTalVis",
  item_category: "Workshop",
  item_category2: "Core Electronics",
  item_variant: "Live Online Session",
  price: 80,
  quantity: 1,
};

function getCheckoutLocation(params?: TrackParams): string {
  const location = params?.location;

  if (typeof location === "string" && location.trim()) {
    return location;
  }

  return "unknown_cta";
}

export default function TrackedLink({
  href,
  event,
  params = {},
  metaStdEvent,
  metaStdParams = {},
  children,
  target,
  rel,
  ...anchorProps
}: TrackedLinkProps) {
  const checkoutLocation = getCheckoutLocation(params);

  const [trackedHref, setTrackedHref] = useState(href);

  /**
   * Capture campaign details and prepare the decorated URL
   * immediately after the component mounts.
   */
  useEffect(() => {
    captureCampaignData();

    const finalUrl = buildTrackedCheckoutUrl(
      href,
      checkoutLocation,
    );

    setTrackedHref(finalUrl);
  }, [href, checkoutLocation]);

  /**
   * Rebuild the URL immediately before navigation.
   *
   * This protects against:
   * - UTMs being captured after initial render
   * - modifier clicks
   * - mobile long press
   * - opening in a new tab
   */
  const prepareCheckoutUrl = (
    anchor: HTMLAnchorElement,
  ): string => {
    const finalUrl = buildTrackedCheckoutUrl(
      href,
      checkoutLocation,
    );

    anchor.href = finalUrl;
    setTrackedHref(finalUrl);

    return finalUrl;
  };

  const handlePointerDown = (
    eventObject: PointerEvent<HTMLAnchorElement>,
  ) => {
    prepareCheckoutUrl(eventObject.currentTarget);
  };

  const handleClick = (
    eventObject: MouseEvent<HTMLAnchorElement>,
  ) => {
    const finalUrl = prepareCheckoutUrl(
      eventObject.currentTarget,
    );

    const campaignParameters =
      getCampaignEventParameters();

    let destinationHostname = "unknown";

    try {
      destinationHostname = new URL(finalUrl).hostname;
    } catch {
      destinationHostname = "invalid_url";
    }

    const commonTrackingParameters: TrackParams = {
      ...campaignParameters,
      ...params,

      page: "resume-session",
      checkout_location: checkoutLocation,

      destination_url: finalUrl,
      destination_hostname: destinationHostname,

      product_id: RESUME_SESSION_ITEM.item_id,
      product_name: RESUME_SESSION_ITEM.item_name,
      product_category: RESUME_SESSION_ITEM.item_category,

      value: 80,
      price: 80,
      currency: "INR",
    };

    /**
     * Your custom CTA event, for example:
     * resume_enroll_click
     */
    track(event, commonTrackingParameters);

    /**
     * Recommended GA4 ecommerce event.
     */
    ecommerceEvent("begin_checkout", {
      currency: "INR",
      value: 80,

      checkout_location: checkoutLocation,

      ...campaignParameters,

      items: [RESUME_SESSION_ITEM],
    });

    /**
     * Meta standard event, normally InitiateCheckout.
     */
    if (metaStdEvent) {
      metaEvent(metaStdEvent, {
        content_ids: [RESUME_SESSION_ITEM.item_id],
        content_name: RESUME_SESSION_ITEM.item_name,
        content_category: RESUME_SESSION_ITEM.item_category,
        content_type: "product",

        value: 80,
        currency: "INR",

        checkout_location: checkoutLocation,

        ...campaignParameters,
        ...metaStdParams,
      });
    }
  };

  const safeRel =
    target === "_blank"
      ? rel ?? "noopener noreferrer"
      : rel;

  return (
    <a
      {...anchorProps}
      href={trackedHref}
      target={target}
      rel={safeRel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}