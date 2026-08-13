"use client";

import {
  type AnchorHTMLAttributes,
  type MouseEvent,
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
  "href" | "children" | "onClick"
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

const NAVIGATION_DELAY_MS = 350;

function getCheckoutLocation(params: TrackParams): string {
  const value = params.location;

  return typeof value === "string" && value.trim()
    ? value
    : "unknown_cta";
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
  const [isNavigating, setIsNavigating] = useState(false);

  const buildFinalUrl = (): string => {
    captureCampaignData();

    return buildTrackedCheckoutUrl(
      href,
      checkoutLocation,
    );
  };

  useEffect(() => {
    setTrackedHref(buildFinalUrl());
  }, [href, checkoutLocation]);

  const prepareUrl = (
    anchor: HTMLAnchorElement,
  ): string => {
    const finalUrl = buildFinalUrl();

    anchor.href = finalUrl;
    setTrackedHref(finalUrl);

    return finalUrl;
  };

  const handleClick = (
    clickEvent: MouseEvent<HTMLAnchorElement>,
  ) => {
    const openInNewTab =
      target === "_blank" ||
      clickEvent.ctrlKey ||
      clickEvent.metaKey ||
      clickEvent.shiftKey ||
      clickEvent.button === 1;

    if (openInNewTab) {
      const finalUrl = prepareUrl(
        clickEvent.currentTarget,
      );

      const campaignParameters =
        getCampaignEventParameters();

      track(event, {
        ...campaignParameters,
        ...params,
        page: window.location.pathname,
        checkout_location: checkoutLocation,
        destination_url: finalUrl,
        value: 80,
        price: 80,
        currency: "INR",
      });

      ecommerceEvent("begin_checkout", {
        currency: "INR",
        value: 80,
        checkout_location: checkoutLocation,
        destination_url: finalUrl,
        ...campaignParameters,
        items: [RESUME_SESSION_ITEM],
      });

      if (metaStdEvent) {
        metaEvent(metaStdEvent, {
          content_ids: [
            RESUME_SESSION_ITEM.item_id,
          ],
          content_name:
            RESUME_SESSION_ITEM.item_name,
          content_category:
            RESUME_SESSION_ITEM.item_category,
          content_type: "product",
          value: 80,
          currency: "INR",
          checkout_location: checkoutLocation,
          ...campaignParameters,
          ...metaStdParams,
        });
      }

      return;
    }

    clickEvent.preventDefault();

    if (isNavigating) return;
    setIsNavigating(true);

    const finalUrl = prepareUrl(
      clickEvent.currentTarget,
    );

    const campaignParameters =
      getCampaignEventParameters();

    let destinationHostname = "unknown";

    try {
      destinationHostname = new URL(
        finalUrl,
      ).hostname;
    } catch {
      destinationHostname = "invalid_url";
    }

    const commonParams: TrackParams = {
      ...campaignParameters,
      ...params,
      page: window.location.pathname,
      checkout_location: checkoutLocation,
      destination_url: finalUrl,
      destination_hostname: destinationHostname,
      product_id: RESUME_SESSION_ITEM.item_id,
      product_name: RESUME_SESSION_ITEM.item_name,
      product_category:
        RESUME_SESSION_ITEM.item_category,
      value: 80,
      price: 80,
      currency: "INR",
    };

    track(event, commonParams);

    ecommerceEvent("begin_checkout", {
      currency: "INR",
      value: 80,
      checkout_location: checkoutLocation,
      destination_url: finalUrl,
      ...campaignParameters,
      items: [RESUME_SESSION_ITEM],
    });

    if (metaStdEvent) {
      metaEvent(metaStdEvent, {
        content_ids: [
          RESUME_SESSION_ITEM.item_id,
        ],
        content_name:
          RESUME_SESSION_ITEM.item_name,
        content_category:
          RESUME_SESSION_ITEM.item_category,
        content_type: "product",
        value: 80,
        currency: "INR",
        checkout_location: checkoutLocation,
        ...campaignParameters,
        ...metaStdParams,
      });
    }

    window.setTimeout(() => {
      window.location.href = finalUrl;
    }, NAVIGATION_DELAY_MS);
  };

  return (
    <a
      {...anchorProps}
      href={trackedHref}
      target={target}
      rel={
        target === "_blank"
          ? rel ?? "noopener noreferrer"
          : rel
      }
      aria-disabled={isNavigating || undefined}
      onPointerDown={(event) => {
        prepareUrl(event.currentTarget);
      }}
      onTouchStart={(event) => {
        prepareUrl(event.currentTarget);
      }}
      onContextMenu={(event) => {
        prepareUrl(event.currentTarget);
      }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}