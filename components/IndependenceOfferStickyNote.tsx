"use client";

import { useEffect, useState } from "react";
import { track, getDeviceContext } from "@/lib/analytics";
import {
  buildTrackedCheckoutUrl,
  getIdentityParameters,
  getSessionLifecycleParameters,
  getCurrentUTMParameters,
  getFirstTouchParameters,
  getLastTouchParameters,
  detectAiReferral,
  incrementEnrollClickCount,
} from "@/lib/campaignTracking";

const COURSE_NAME     = "Embedded Systems Foundation Course";
const COURSE_SLUG     = "embedded-systems";
const COURSE_TYPE     = "foundation";
const COURSE_CATEGORY = "Electronics";

const OFFER_DEADLINE = "2026-08-31T23:59:59+05:30";
const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";

const STARTER_ORIGINAL   = 639;
const STARTER_OFFER      = Math.round(STARTER_ORIGINAL * 0.8);
const STARTER_CHECKOUT   = "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26";
const STARTER_PER_DAY    = Math.round(STARTER_OFFER / 30);
const STARTER_PLAN_CODE  = "EF-01";

const SEMESTER_ORIGINAL  = 2559;
const SEMESTER_OFFER     = Math.round(SEMESTER_ORIGINAL * 0.8);
const SEMESTER_CHECKOUT  = "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca";
const SEMESTER_PER_DAY   = Math.round(SEMESTER_OFFER / 180);
const SEMESTER_DISCOUNT  = Math.round((1 - SEMESTER_OFFER / (STARTER_OFFER * 6)) * 100);
const SEMESTER_PLAN_CODE = "EF-06";

type CountState = { days: number; hours: number; minutes: number; seconds: number; expired: boolean };

function useCountdown(iso: string) {
  const [state, setState] = useState<CountState>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(iso).getTime() - Date.now();
      if (diff <= 0) { setState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      setState({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
        expired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [iso]);

  return state;
}

function Digit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex min-w-[28px] items-center justify-center rounded-md bg-white/20 px-1.5 py-0.5 text-xs font-black tabular-nums text-white sm:min-w-[32px] sm:text-sm">
        {String(val).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-white/50">{label}</span>
    </div>
  );
}

function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy"
      className="inline-flex items-center gap-1 rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white/90 transition hover:bg-white/25"
    >
      {code}
      <span aria-label={copied ? "Copied" : "Copy"}>
        {copied ? (
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3 3 7-7" stroke="#FFC400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="rgba(255,255,255,0.1)" />
          </svg>
        )}
      </span>
    </button>
  );
}

interface PlanConfig {
  planName: string;
  planCode: string;
  planType: string;
  planDuration: string;
  planDurationDays: number;
  price: number;
  originalPrice: number;
  rawCheckoutUrl: string;
  ctaName: string;
  ctaText: string;
  ctaPosition: string;
}

export default function IndependenceOfferStickyNote() {
  const { days, hours, minutes, seconds, expired } = useCountdown(OFFER_DEADLINE);

  const [starterUrl, setStarterUrl]   = useState(STARTER_CHECKOUT);
  const [semesterUrl, setSemesterUrl] = useState(SEMESTER_CHECKOUT);

  useEffect(() => {
    setStarterUrl(buildTrackedCheckoutUrl(STARTER_CHECKOUT,  "sticky_bar_starter",  COURSE_SLUG, STARTER_PLAN_CODE));
    setSemesterUrl(buildTrackedCheckoutUrl(SEMESTER_CHECKOUT, "sticky_bar_semester", COURSE_SLUG, SEMESTER_PLAN_CODE));
  }, []);

  if (expired) return null;

  const handleEnrollClick = (plan: PlanConfig, trackedUrl: string) => {
    const clickCount = incrementEnrollClickCount();

    track("enroll_clicked", {
      // Page context
      page:           "embedded-systems",
      page_type:      "course",
      page_url:       typeof window !== "undefined" ? window.location.href : "not_available",

      // Course context
      course_name:     COURSE_NAME,
      course_slug:     COURSE_SLUG,
      course_type:     COURSE_TYPE,
      course_category: COURSE_CATEGORY,

      // Plan details
      plan_name:          plan.planName,
      plan_code:          plan.planCode,
      plan_type:          plan.planType,
      plan_duration:      plan.planDuration,
      plan_duration_days: plan.planDurationDays,
      price:              plan.price,
      currency:           "INR",
      original_price:     plan.originalPrice,
      discount_amount:    plan.originalPrice - plan.price,
      discount_percent:   Math.round((1 - plan.price / plan.originalPrice) * 100),

      // Offer context
      offer_code:     OFFER_CODE,
      offer_type:     "independence_day",

      // CTA details
      cta_name:        plan.ctaName,
      cta_text:        plan.ctaText,
      cta_location:    "sticky_bar",
      cta_position:    plan.ctaPosition,
      cta_type:        "button",
      cta_variant:     plan.planCode === SEMESTER_PLAN_CODE ? "primary" : "secondary",
      cta_destination: trackedUrl,

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

    window.open(trackedUrl, "_blank", "noopener,noreferrer");
  };

  const starterPlan: PlanConfig = {
    planName:        "Starter",
    planCode:        STARTER_PLAN_CODE,
    planType:        "self_paced",
    planDuration:    "1 Month",
    planDurationDays: 30,
    price:           STARTER_OFFER,
    originalPrice:   STARTER_ORIGINAL,
    rawCheckoutUrl:  STARTER_CHECKOUT,
    ctaName:         "starter-enroll",
    ctaText:         "Enroll: Starter",
    ctaPosition:     "sticky-bar",
  };

  const semesterPlan: PlanConfig = {
    planName:        "Semester",
    planCode:        SEMESTER_PLAN_CODE,
    planType:        "self_paced",
    planDuration:    "6 Months",
    planDurationDays: 180,
    price:           SEMESTER_OFFER,
    originalPrice:   SEMESTER_ORIGINAL,
    rawCheckoutUrl:  SEMESTER_CHECKOUT,
    ctaName:         "semester-enroll",
    ctaText:         "Enroll: Semester",
    ctaPosition:     "sticky-bar",
  };

  return (
    <>
      {/* Spacer: taller on mobile (compact bar), shorter on desktop (full bar) */}
      <div aria-hidden="true" className="h-[72px] sm:h-[96px]" />

      <aside
        aria-label="Independence Day offer, enroll now"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-emerald-700 bg-[#0A3D1F] shadow-[0_-8px_40px_rgba(10,61,31,0.45)]">

          {/* Desktop layout */}
          <div className="hidden sm:flex sm:items-center sm:gap-4 sm:px-5 sm:py-3.5">

            <div className="flex shrink-0 items-center gap-3">
              <div className="flex flex-col">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-300">
                  Independence Offer · Ends Aug 31
                </p>
                <p className="text-[11px] font-semibold text-white/60">
                  Code: <CopyableCode code={OFFER_CODE} />
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Digit val={days} label="Days" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={hours} label="Hrs" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={minutes} label="Min" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={seconds} label="Sec" />
              </div>
            </div>

            <div className="flex flex-1 justify-end gap-3">
              {/* Starter */}
              <button
                type="button"
                data-cta-name="starter-enroll"
                data-cta-position="sticky-bar"
                data-course-slug={COURSE_SLUG}
                data-plan-code={STARTER_PLAN_CODE}
                data-plan-name="Starter"
                onClick={() => handleEnrollClick(starterPlan, starterUrl)}
                className="flex flex-col items-start rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-left transition hover:bg-white/18"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">Starter · 1 Month</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-black text-white">₹{STARTER_OFFER}</span>
                  <span className="text-xs text-white/40 line-through">₹{STARTER_ORIGINAL}</span>
                </div>
                <span className="text-[10px] text-white/50">≈₹{STARTER_PER_DAY}/day · All 10 courses</span>
              </button>

              {/* Semester */}
              <button
                type="button"
                data-cta-name="semester-enroll"
                data-cta-position="sticky-bar"
                data-course-slug={COURSE_SLUG}
                data-plan-code={SEMESTER_PLAN_CODE}
                data-plan-name="Semester"
                onClick={() => handleEnrollClick(semesterPlan, semesterUrl)}
                className="relative flex flex-col items-start rounded-xl border border-[#FFC400]/60 bg-[#FFC400]/15 px-4 py-2 text-left transition hover:bg-[#FFC400]/25"
              >
                <div className="absolute -top-2 right-2 rounded-full bg-[#FFC400] px-2 py-0.5 text-[9px] font-extrabold text-[#0A3D1F]">
                  BEST VALUE · {SEMESTER_DISCOUNT}% OFF
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFC400]">Semester · 6 Months</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-black text-white">₹{SEMESTER_OFFER.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-white/40 line-through">₹{SEMESTER_ORIGINAL.toLocaleString("en-IN")}</span>
                </div>
                <span className="text-[10px] text-white/50">≈₹{SEMESTER_PER_DAY}/day · Includes mock interview</span>
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex items-center gap-3 px-4 py-2.5 sm:hidden">
            <div className="flex items-center gap-1">
              <Digit val={days} label="D" />
              <span className="mb-3 text-[10px] font-black text-white/30">:</span>
              <Digit val={hours} label="H" />
              <span className="mb-3 text-[10px] font-black text-white/30">:</span>
              <Digit val={minutes} label="M" />
              <span className="mb-3 text-[10px] font-black text-white/30">:</span>
              <Digit val={seconds} label="S" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-extrabold text-[#FFC400]">Independence Offer · 20% Discount</p>
              <p className="mt-0.5 text-[10px] text-white/50">Valid until Aug 31 · Code: <CopyableCode code={OFFER_CODE} /></p>
            </div>
            <button
              type="button"
              data-cta-name="semester-enroll"
              data-cta-position="sticky-bar-mobile"
              data-course-slug={COURSE_SLUG}
              data-plan-code={SEMESTER_PLAN_CODE}
              data-plan-name="Semester"
              onClick={() => handleEnrollClick(
                { ...semesterPlan, ctaName: "semester-enroll-mobile", ctaText: "Enroll", ctaPosition: "sticky-bar-mobile" },
                semesterUrl,
              )}
              className="shrink-0 rounded-lg bg-[#FFC400] px-3 py-1.5 text-[11px] font-extrabold text-[#0A3D1F] transition hover:bg-amber-300"
            >
              Enroll
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
