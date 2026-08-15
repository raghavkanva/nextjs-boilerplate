"use client";

import { finalCta } from "@/data/content";
import { track, metaEvent, getDeviceContext } from "@/lib/analytics";
import {
  getIdentityParameters,
  getSessionLifecycleParameters,
  getCurrentUTMParameters,
  getFirstTouchParameters,
  getLastTouchParameters,
  detectAiReferral,
  incrementEnrollClickCount,
} from "@/lib/campaignTracking";

export default function FinalCta({ href = "#plans" }: { href?: string }) {
  const handleClick = () => {
    const clickCount = incrementEnrollClickCount();

    track("enroll_clicked", {
      // Page context
      page:      "embedded-systems",
      page_type: "course",
      page_url:  typeof window !== "undefined" ? window.location.href : "not_available",

      // CTA details
      cta_name:        "final-cta-enroll",
      cta_text:        finalCta.ctaLabel,
      cta_location:    "final_cta",
      cta_position:    "page-footer",
      cta_type:        "anchor",
      cta_variant:     "primary",
      cta_destination: href,

      // Behavior counters
      enroll_click_count: clickCount,

      // Identity
      ...getIdentityParameters(),

      // Session lifecycle
      ...getSessionLifecycleParameters(),

      // Current UTMs
      ...getCurrentUTMParameters(),

      // Full attribution
      ...getFirstTouchParameters(),
      ...getLastTouchParameters(),

      // AI referral
      ...detectAiReferral(typeof document !== "undefined" ? document.referrer : ""),

      // Device context
      ...getDeviceContext(),
    });

    // Meta InitiateCheckout — read-only, preserved exactly
    metaEvent("InitiateCheckout", { content_name: "eTalVis Program", currency: "INR" });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-4 leading-tight">
        {finalCta.heading}
      </h2>
      <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
        {finalCta.subline}
      </p>
      <a
        href={href}
        data-cta-name="final-cta-enroll"
        data-cta-position="page-footer"
        onClick={handleClick}
        className="inline-block px-8 py-4 rounded-full bg-cta text-black border-2 border-text font-display font-semibold text-lg hover:bg-text hover:text-white transition-colors"
      >
        {finalCta.ctaLabel}
      </a>
    </section>
  );
}
