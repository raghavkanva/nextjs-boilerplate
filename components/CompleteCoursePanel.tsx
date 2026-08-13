"use client";

import { useState } from "react";
import { track, metaEvent } from "@/lib/analytics";
import { plans } from "@/data/content";

const starterPlan = plans.find((p) => p.code === "EF-01")!;
const semesterPlan = plans.find((p) => p.code === "EF-06")!;

const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";

const offerPrices: Record<string, { offer: number; perDay: number; perDayLabel: string }> = {
  "1month":  { offer: 511,  perDay: 17, perDayLabel: "≈₹17/day" },
  "6months": { offer: 2047, perDay: 11, perDayLabel: "≈₹11/day · Includes mock interview" },
};

const SEMESTER_SAVINGS = 3066 - 2047; // vs buying 6 Starter plans at ₹511 each

type Duration = "1month" | "6months";

const options: { duration: Duration; label: string; plan: typeof starterPlan }[] = [
  { duration: "1month",  label: "1 Month",  plan: starterPlan  },
  { duration: "6months", label: "6 Months", plan: semesterPlan },
];

export default function CompleteCoursePanel() {
  const [selected, setSelected] = useState<Duration>("6months");

  const active = options.find((o) => o.duration === selected)!;

  const handleToggle = (duration: Duration) => {
    setSelected(duration);
    track("pricing_toggle", {
      section: "complete_course",
      selected_duration: duration,
      page: "courses",
    });
  };

  const handleEnroll = () => {
    track("plan_enroll_click", {
      plan_code: active.plan.code,
      plan_name: active.plan.name,
      duration: selected,
      price: active.plan.price ?? 0,
      currency: "INR",
      page: "courses",
    });
    metaEvent("InitiateCheckout", {
      content_name: "Embedded Systems Foundation Course",
      content_type: active.plan.code,
      value: active.plan.price ?? 0,
      currency: "INR",
      num_items: 1,
    });
  };

  return (
    <section
      id="plans"
      className="mx-auto w-full max-w-4xl rounded-2xl border border-line bg-surface px-6 py-8 shadow-[0_4px_24px_rgba(15,23,42,0.07)] sm:px-10 sm:py-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Left: info */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-surfaceRaised px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber">
            Complete Course
          </div>

          <h2 className="mt-3 font-display text-2xl font-black leading-tight tracking-tight text-text sm:text-3xl">
            Embedded Systems Foundation Course
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
            All 10 foundation courses: electronics, C programming, embedded hardware, embedded software, protocols, microprocessor internals, ARM, 8085, and networking. Pre-recorded and self-paced. Doubts cleared directly on WhatsApp.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-muted">
            {semesterPlan.highlights?.map((h) => (
              <li key={h.title} className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-amber">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><strong className="text-text">{h.title}:</strong> {h.subtitle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: toggle + CTA */}
        <div className="flex flex-col items-stretch gap-4 lg:w-56 lg:shrink-0">
          <div className="flex rounded-xl border border-line p-1">
            {options.map((o) => (
              <button
                key={o.duration}
                type="button"
                onClick={() => handleToggle(o.duration)}
                className={`flex-1 rounded-lg py-2 text-center text-sm font-bold transition ${
                  selected === o.duration
                    ? "bg-text text-white shadow-sm"
                    : "text-muted hover:text-text"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[#FFC400]/30 bg-[#FFC400]/8 px-4 py-3 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber">
              Independence Offer · Until Aug 31
            </p>
            <div className="mt-1 flex items-baseline justify-center gap-2">
              <span className="font-display text-4xl font-black text-text">
                ₹{offerPrices[selected].offer.toLocaleString("en-IN")}
              </span>
              <span className="text-base text-muted line-through">
                ₹{(active.plan.price ?? 0).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted">{offerPrices[selected].perDayLabel}</p>
            {selected === "6months" && (
              <p className="mt-1 text-[11px] font-semibold text-amber">
                Save ₹{SEMESTER_SAVINGS.toLocaleString("en-IN")} vs 6 Starter plans
              </p>
            )}
            <p className="mt-1.5 text-[10px] text-mutedDim">
              Code: <span className="font-mono font-bold text-text">{OFFER_CODE}</span>
            </p>
          </div>

          {active.plan.checkoutUrl ? (
            <a
              href={active.plan.checkoutUrl}
              onClick={handleEnroll}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border-2 border-text bg-cta py-3 text-center text-sm font-black text-text shadow-[0_4px_0_#0f172a] transition hover:-translate-y-0.5 hover:bg-amber-300 active:translate-y-1 active:shadow-none"
            >
              Enroll Today — ₹{offerPrices[selected].offer.toLocaleString("en-IN")}
            </a>
          ) : null}

          <p className="text-center text-xs text-mutedDim">
            {selected === "6months"
              ? "No-cost EMI available on the 6-month plan"
              : "Full access to all 10 courses"}
          </p>
        </div>
      </div>
    </section>
  );
}
