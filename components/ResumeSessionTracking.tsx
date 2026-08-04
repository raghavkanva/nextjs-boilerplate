"use client";

import { useEffect } from "react";

import { ecommerceEvent, metaEvent, track } from "@/lib/analytics";
import {
  captureCampaignData,
  getCampaignEventParameters,
} from "@/lib/campaignTracking";

const PRICE = 80;

const RESUME_SESSION_ITEM = {
  item_id: "resume-session-aug-2026",
  item_name: "Resume Masterclass",
  item_brand: "eTalVis",
  item_category: "Workshop",
  item_category2: "Core Electronics",
  item_variant: "Live Online Session",
  price: PRICE,
  quantity: 1,
};

export default function ResumeSessionTracking() {
  useEffect(() => {
    captureCampaignData();

    const campaignParameters = getCampaignEventParameters();

    track("resume_session_view", {
      page: "resume-session",
      content_name: "Resume Masterclass",
      content_category: "Workshop",
      value: PRICE,
      currency: "INR",
      ...campaignParameters,
    });

    ecommerceEvent("view_item", {
      currency: "INR",
      value: PRICE,
      ...campaignParameters,
      items: [RESUME_SESSION_ITEM],
    });

    metaEvent("ViewContent", {
      content_ids: [RESUME_SESSION_ITEM.item_id],
      content_name: RESUME_SESSION_ITEM.item_name,
      content_category: RESUME_SESSION_ITEM.item_category,
      content_type: "product",
      value: PRICE,
      currency: "INR",
      ...campaignParameters,
    });
  }, []);

  return null;
}