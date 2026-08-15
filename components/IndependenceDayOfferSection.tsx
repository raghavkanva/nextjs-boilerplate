"use client";

import { useState, useEffect, useRef } from "react";
import { track, metaEvent, getDeviceContext } from "@/lib/analytics";
import {
  buildTrackedCheckoutUrl,
  getCampaignEventParameters,
  getFirstTouchParameters,
  getLastTouchParameters,
  getCurrentUTMParameters,
  getIdentityParameters,
  getSessionLifecycleParameters,
  detectAiReferral,
  incrementPricingViewCount,
  incrementPlanSelectionCount,
  incrementEnrollClickCount,
  getPricingViewCount,
  getPlanSelectionCount,
  getEnrollClickCount,
} from "@/lib/campaignTracking";

const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";
const INDEPENDENCE_END_MS = new Date("2026-08-15T23:59:59+05:30").getTime();
const isIndependenceDay = typeof window !== "undefined" ? Date.now() <= INDEPENDENCE_END_MS : true;

const COURSE_NAME     = "Embedded Systems Foundation Course";
const COURSE_SLUG     = "embedded-systems";
const COURSE_TYPE     = "foundation";
const COURSE_CATEGORY = "Electronics";

const STARTER_ORIGINAL = 639;
const STARTER_OFFER    = 511;
const STARTER_PER_DAY  = 17;
const STARTER_PLAN_CODE = "EF-01";
const STARTER_PLAN_DURATION = "1 month";
const STARTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26";

const SEMESTER_ORIGINAL = 2559;
const SEMESTER_OFFER    = 2047;
const SEMESTER_PER_DAY  = 11;
const SEMESTER_SAVINGS  = 1019;
const SEMESTER_PLAN_CODE = "EF-06";
const SEMESTER_PLAN_DURATION = "6 months";
const SEMESTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca";

const WHATSAPP_ACADEMIC = "https://wa.me/919790873069?text=Hi%2C%20I%27m%20interested%20in%20the%20Academic%20plan%20for%2010%2B%20students";

// ─── Shared event params helper ────────────────────────────────────────────
function commonParams() {
  return {
    ...getIdentityParameters(),
    ...getSessionLifecycleParameters(),
    ...getCurrentUTMParameters(),
    ...getFirstTouchParameters(),
    ...getLastTouchParameters(),
    ...detectAiReferral(typeof document !== "undefined" ? document.referrer : ""),
    ...getDeviceContext(),
    page: "embedded-systems",
    page_type: "course",
    course_name:     COURSE_NAME,
    course_slug:     COURSE_SLUG,
    course_type:     COURSE_TYPE,
    course_category: COURSE_CATEGORY,
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────
function CopyCode() {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(OFFER_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#FFC400]/50 bg-[#FFC400]/12 px-3 py-1.5 font-mono text-xs font-bold text-[#FFC400] transition hover:bg-[#FFC400]/22"
    >
      {OFFER_CODE}
      <span aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3 3 7-7" stroke="#FFC400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="rgba(255,196,0,0.08)" />
          </svg>
        )}
      </span>
    </button>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function IndependenceDayOfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [starterUrl,  setStarterUrl]  = useState(STARTER_CHECKOUT);
  const [semesterUrl, setSemesterUrl] = useState(SEMESTER_CHECKOUT);

  // Build tracked checkout URLs client-side
  useEffect(() => {
    setStarterUrl(buildTrackedCheckoutUrl(STARTER_CHECKOUT, "plans_section_starter", COURSE_SLUG, STARTER_PLAN_CODE));
    setSemesterUrl(buildTrackedCheckoutUrl(SEMESTER_CHECKOUT, "plans_section_semester", COURSE_SLUG, SEMESTER_PLAN_CODE));
  }, []);

  // pricing_viewed — fires once when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || !entries[0].isIntersecting) return;
        fired = true;
        const viewCount = incrementPricingViewCount();
        track("pricing_viewed", {
          ...commonParams(),
          section_name:   "plans",
          component_name: "IndependenceDayOfferSection",
          offer_code: OFFER_CODE,
          price:           STARTER_OFFER,
          original_price:  STARTER_ORIGINAL,
          discount_amount: STARTER_ORIGINAL - STARTER_OFFER,
          discount_percent: 20,
          currency: "INR",
          pricing_view_count: viewCount,
        });
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // plan_selected — fires when user hovers/focuses a plan CTA (intent signal)
  const trackPlanSelected = (plan: "starter" | "semester") => {
    const isStarter   = plan === "starter";
    const planCode    = isStarter ? STARTER_PLAN_CODE : SEMESTER_PLAN_CODE;
    const price       = isStarter ? STARTER_OFFER     : SEMESTER_OFFER;
    const origPrice   = isStarter ? STARTER_ORIGINAL  : SEMESTER_ORIGINAL;
    const duration    = isStarter ? STARTER_PLAN_DURATION : SEMESTER_PLAN_DURATION;
    const selCount    = incrementPlanSelectionCount();

    track("plan_selected", {
      ...commonParams(),
      section_name:   "plans",
      component_name: "IndependenceDayOfferSection",
      plan:            plan,
      plan_name:       isStarter ? "Starter" : "Semester",
      plan_code:       planCode,
      plan_type:       "subscription",
      plan_duration:   duration,
      access_duration: duration,
      price,
      original_price:  origPrice,
      discount_amount: origPrice - price,
      discount_percent: 20,
      currency: "INR",
      offer_code: OFFER_CODE,
      plan_selection_count: selCount,
    });
  };

  // enroll_clicked
  const trackEnroll = (
    plan: "starter" | "semester",
    ctaName: string,
    ctaText: string,
  ) => {
    const isStarter   = plan === "starter";
    const planCode    = isStarter ? STARTER_PLAN_CODE : SEMESTER_PLAN_CODE;
    const price       = isStarter ? STARTER_OFFER     : SEMESTER_OFFER;
    const origPrice   = isStarter ? STARTER_ORIGINAL  : SEMESTER_ORIGINAL;
    const duration    = isStarter ? STARTER_PLAN_DURATION : SEMESTER_PLAN_DURATION;
    const clickCount  = incrementEnrollClickCount();
    const pricingViews = getPricingViewCount();
    const planSelects  = getPlanSelectionCount();

    track("enroll_clicked", {
      ...commonParams(),
      section_name:   "plans",
      component_name: "IndependenceDayOfferSection",

      plan:            plan,
      plan_name:       isStarter ? "Starter" : "Semester",
      plan_code:       planCode,
      plan_type:       "subscription",
      plan_duration:   duration,
      access_duration: duration,

      price,
      original_price:  origPrice,
      discount_amount: origPrice - price,
      discount_percent: 20,
      currency: "INR",
      offer_code: OFFER_CODE,

      cta_name:        ctaName,
      cta_text:        ctaText,
      cta_location:    "plans_section",
      cta_position:    "plans_section",
      cta_type:        "enrollment",
      cta_variant:     "primary",
      cta_destination: "tagmango-checkout",
      checkout_destination: isStarter ? STARTER_CHECKOUT : SEMESTER_CHECKOUT,

      enroll_click_count:           clickCount,
      pricing_views_before_purchase: pricingViews,
      plan_selections_before_purchase: planSelects,
    });

    // Meta InitiateCheckout — preserved exactly, no changes
    metaEvent("InitiateCheckout", {
      content_name: COURSE_NAME,
      content_type: planCode,
      value:        price,
      currency:     "INR",
      num_items:    1,
    });
  };

  const trackAcademic = () => {
    const clickCount = incrementEnrollClickCount();
    track("whatsapp_cta_clicked", {
      ...commonParams(),
      section_name:   "plans",
      component_name: "IndependenceDayOfferSection",
      plan:           "academic",
      plan_name:      "Academic",
      plan_code:      "EF-EDU",
      plan_type:      "institutional",
      cta_name:       "academic-whatsapp",
      cta_text:       "Contact on WhatsApp",
      cta_location:   "plans_section",
      cta_position:   "plans_section",
      cta_type:       "whatsapp",
      cta_variant:    "secondary",
      cta_destination: WHATSAPP_ACADEMIC,
      enroll_click_count: clickCount,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="plans"
      aria-label="Independence Day Offer — Choose Your Plan"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8"
    >
      {/* Green offer header */}
      <div className="overflow-hidden rounded-2xl bg-[#0A3D1F]">
        <div className="relative px-6 py-7 sm:px-8 sm:py-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/30 bg-[#FFC400]/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#FFC400]">
              {isIndependenceDay && <span>🇮🇳</span>}
              {isIndependenceDay ? "Independence Day Offer" : "20% Discount Offer"}
            </div>

            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-1.5 text-sm text-white/60">
              Same 10 courses in every plan. Pick the timeframe that fits how you learn.
            </p>
            <p className="mt-0.5 text-xs text-white/40">
              Valid until August 31, 2026 · Apply code at checkout
            </p>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                {["Select a plan below", "Enter code at checkout", "Pay 20% less"].map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC400] text-[9px] font-black text-[#0A3D1F]">
                      {i + 1}
                    </span>
                    <span className="text-xs text-white/60">{step}</span>
                    {i < 2 && (
                      <svg className="hidden shrink-0 sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                ))}
              </ol>
              <div className="flex flex-col items-start gap-1 sm:items-end sm:shrink-0">
                <p className="text-[10px] text-white/35">Click to copy your code</p>
                <CopyCode />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Starter */}
        <div className="relative flex flex-col rounded-2xl border-2 border-line bg-surface p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-muted">Starter</p>
          <p className="mt-0.5 text-xs text-muted">1 month access</p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-text">₹{STARTER_OFFER}</span>
            <span className="text-base text-muted line-through">₹{STARTER_ORIGINAL}</span>
            <span className="ml-auto rounded-full bg-surfaceRaised px-2.5 py-0.5 text-[10px] font-bold text-amber">
              ≈₹{STARTER_PER_DAY}/day
            </span>
          </div>

          <p className="mt-2 text-[11px] font-semibold text-amber">
            Independence offer · Code: {OFFER_CODE}
          </p>

          <ul className="mt-4 space-y-2 text-sm text-muted">
            {[
              "All 10 foundation courses included",
              "Pre-recorded online sessions, watch anytime, at your own pace",
              "Practice exercises",
              "Weekend Sessions at no extra cost",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={starterUrl}
            onClick={() => trackEnroll("starter", "starter-enroll", `Enroll — ₹${STARTER_OFFER}`)}
            onMouseEnter={() => trackPlanSelected("starter")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-name="starter-enroll"
            data-cta-position="plans-section"
            data-course-slug={COURSE_SLUG}
            data-plan-code={STARTER_PLAN_CODE}
            data-plan-name="Starter"
            className="mt-auto pt-6 block rounded-full border-2 border-text bg-surface py-3 text-center text-sm font-black text-text transition hover:bg-text hover:text-white"
          >
            Enroll — ₹{STARTER_OFFER}
          </a>
        </div>

        {/* Semester — Popular */}
        <div className="relative flex flex-col rounded-2xl border-2 border-amber bg-surface p-6 shadow-[0_0_0_1px_rgba(22,163,74,0.15),0_8px_32px_rgba(22,163,74,0.12)]">
          <span className="absolute -top-3 left-6 rounded-full bg-cta px-3 py-1 text-xs font-bold text-text border border-text">
            Popular
          </span>

          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-amber">Semester</p>
          <p className="mt-0.5 text-xs text-muted">6 months access</p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-text">₹{SEMESTER_OFFER.toLocaleString("en-IN")}</span>
            <span className="text-base text-muted line-through">₹{SEMESTER_ORIGINAL.toLocaleString("en-IN")}</span>
            <span className="ml-auto rounded-full bg-surfaceRaised px-2.5 py-0.5 text-[10px] font-bold text-amber">
              ≈₹{SEMESTER_PER_DAY}/day
            </span>
          </div>

          <p className="mt-1 text-[11px] font-semibold text-amber">
            Save ₹{SEMESTER_SAVINGS.toLocaleString("en-IN")} vs buying 6 Starter plans
          </p>
          <p className="mt-0.5 text-[11px] font-semibold text-amber">
            Independence offer · Code: {OFFER_CODE}
          </p>

          <p className="mt-4 text-xs font-semibold text-muted">All of Starter, and:</p>

          <ul className="mt-2 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span>6 free online monthly meetup sessions</span>
            </li>
          </ul>

          <div className="mt-4 space-y-3">
            {[
              {
                title: "Doubts cleared directly by Balajee sir on WhatsApp",
                subtitle: "Direct access to Balajee sir, not a support ticket queue",
              },
              {
                title: "No-cost EMI available",
                subtitle: "Split your payment with no added cost",
              },
              {
                title: "One Time Resume Preparation Help",
                subtitle: "A one-time service to structure and polish your resume",
              },
              {
                title: "1 Mock Interview",
                subtitle: "One mock interview to practice under real pressure and get honest feedback afterward",
              },
            ].map((h) => (
              <div key={h.title} className="rounded-xl border-2 border-amber bg-surfaceRaised/50 px-4 py-3">
                <p className="text-sm font-semibold text-amber">{h.title}</p>
                <p className="mt-0.5 text-xs text-muted">{h.subtitle}</p>
              </div>
            ))}
          </div>

          <a
            href={semesterUrl}
            onClick={() => trackEnroll("semester", "semester-enroll", `Enroll — ₹${SEMESTER_OFFER.toLocaleString("en-IN")}`)}
            onMouseEnter={() => trackPlanSelected("semester")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-name="semester-enroll"
            data-cta-position="plans-section"
            data-course-slug={COURSE_SLUG}
            data-plan-code={SEMESTER_PLAN_CODE}
            data-plan-name="Semester"
            className="mt-6 block rounded-full border-2 border-text bg-cta py-3 text-center text-sm font-black text-text shadow-[0_3px_0_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-amber-300 active:translate-y-0.5 active:shadow-none"
          >
            Enroll — ₹{SEMESTER_OFFER.toLocaleString("en-IN")}
          </a>
        </div>

        {/* Academic */}
        <div className="relative flex flex-col rounded-2xl border-2 border-line bg-surface p-6">
          <span className="absolute -top-3 left-6 rounded-full bg-surfaceRaised px-3 py-1 text-xs font-bold text-amber border border-amber/40">
            For Institutions
          </span>

          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-muted">Academic</p>
          <p className="mt-0.5 text-xs text-muted">For institutions and student groups</p>

          <div className="mt-4">
            <span className="font-display text-3xl font-black text-text">Custom Pricing</span>
          </div>

          <p className="mt-4 text-xs font-semibold text-muted">All of Semester, and:</p>

          <ul className="mt-2 space-y-2 text-sm text-muted">
            {[
              "Bulk discount for 10 or more students",
              "Same 10 foundation courses",
              "Bulk pricing available for groups of 10 or more students",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_ACADEMIC}
            onClick={trackAcademic}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-name="academic-whatsapp"
            data-cta-position="plans-section"
            data-course-slug={COURSE_SLUG}
            data-plan-code="EF-EDU"
            data-plan-name="Academic"
            className="mt-auto pt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-text bg-surface py-3 text-center text-sm font-black text-text transition hover:bg-text hover:text-white"
          >
            <WhatsAppIcon />
            Contact on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
