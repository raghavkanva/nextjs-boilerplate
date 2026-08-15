"use client";

import { useEffect } from "react";
import { track, metaEvent } from "@/lib/analytics";
import {
  captureCampaignData,
  getCampaignEventParameters,
  getIdentityParameters,
} from "@/lib/campaignTracking";

export default function PageAnalytics({
  page,
  contentName,
  contentCategory,
}: {
  page: string;
  contentName: string;
  contentCategory: "Landing Page" | "Course" | "Workshop" | "Offer";
}) {
  useEffect(() => {
    captureCampaignData();

    const attribution = getCampaignEventParameters();
    const identity = getIdentityParameters();

    track("page_viewed", {
      page,
      content_name: contentName,
      content_category: contentCategory,
      ...attribution,
      ...identity,
    });

    metaEvent("ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
      page,
    });
  }, [page, contentName, contentCategory]);

  useEffect(() => {
    const plansSection = document.getElementById("plans");
    if (!plansSection) return;

    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          fired = true;
          const attribution = getCampaignEventParameters();
          const identity = getIdentityParameters();
          track("pricing_viewed", {
            page,
            content_name: contentName,
            ...attribution,
            ...identity,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(plansSection);
    return () => observer.disconnect();
  }, [page, contentName]);

  return null;
}
