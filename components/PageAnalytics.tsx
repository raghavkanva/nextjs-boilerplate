"use client";

import { useEffect } from "react";
import { track, metaEvent } from "@/lib/analytics";

/**
 * Drop into any page (server or client) to fire page-level analytics on mount.
 * Fires: GTM page_view event + Meta ViewContent standard event.
 */
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
    track("page_view", { page, content_name: contentName, content_category: contentCategory });
    metaEvent("ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
      page,
    });
  }, [page, contentName, contentCategory]);

  return null;
}
