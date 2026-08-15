"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { getCampaignEventParameters, getIdentityParameters } from "@/lib/campaignTracking";
import type { TrackParams } from "@/lib/analytics";

/**
 * Fires a single tracking event when the ref'd element first enters the viewport.
 * Returns a ref to attach to the section element.
 */
export function useSectionView<T extends HTMLElement>(
  eventName: string,
  params: TrackParams,
  threshold = 0.25,
): React.RefObject<T | null> {
  const ref     = useRef<T | null>(null);
  const fired   = useRef(false);
  const paramRef = useRef(params);
  paramRef.current = params;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired.current || !entries[0].isIntersecting) return;
        fired.current = true;
        track(eventName, {
          ...paramRef.current,
          ...getCampaignEventParameters(),
          ...getIdentityParameters(),
        });
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eventName, threshold]);

  return ref;
}
