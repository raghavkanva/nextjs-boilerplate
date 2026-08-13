"use client";

import { useState } from "react";
import { track, metaEvent } from "@/lib/analytics";

const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";
const INDEPENDENCE_END_MS = new Date("2026-08-15T23:59:59+05:30").getTime();
const isIndependenceDay = typeof window !== "undefined" ? Date.now() <= INDEPENDENCE_END_MS : true;

const STARTER_ORIGINAL = 639;
const STARTER_OFFER = 511;
const STARTER_PER_DAY = 17;
const STARTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26";

const SEMESTER_ORIGINAL = 2559;
const SEMESTER_OFFER = 2047;
const SEMESTER_PER_DAY = 11;
const SEMESTER_SAVINGS = 1019; // 6 × ₹511 = ₹3,066 vs ₹2,047
const SEMESTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca";

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
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/40 bg-slate-900/10 px-3 py-1.5 font-mono text-xs font-bold text-slate-900 transition hover:bg-slate-900/18"
    >
      {OFFER_CODE}
      <span aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="rgba(0,0,0,0.06)" />
          </svg>
        )}
      </span>
    </button>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-900/15 text-slate-900">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function IndependenceDayOfferSection() {
  const handleClick = (plan: "starter" | "semester") => {
    const isStarter = plan === "starter";
    track("independence_offer_section_click", {
      page: "embedded-systems",
      plan,
      offer_code: OFFER_CODE,
      price: isStarter ? STARTER_OFFER : SEMESTER_OFFER,
    });
    metaEvent("InitiateCheckout", {
      content_name: "Embedded Systems Foundation Course",
      content_type: isStarter ? "EF-01" : "EF-06",
      value: isStarter ? STARTER_OFFER : SEMESTER_OFFER,
      currency: "INR",
      num_items: 1,
    });
  };

  return (
    <section
      id="plans"
      aria-label="Independence Day Offer"
      className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8"
    >
      {/* Offer banner */}
      <div className="overflow-hidden rounded-2xl bg-[#ebd810]">
        <div className="relative px-6 py-7 sm:px-8 sm:py-8">
          {/* Glow accents */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-slate-900/6 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-slate-900/5 blur-3xl" />

          <div className="relative">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/25 bg-slate-900/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-800">
              {isIndependenceDay && <span>🇮🇳</span>}
              {isIndependenceDay ? "Independence Day Offer" : "20% Discount Offer"}
            </div>

            {/* Headline + validity */}
            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                  Independence Day Discount on All Plans
                </h2>
                <p className="mt-1 text-sm text-slate-700">
                  Valid until August 31, 2026 · Apply code at checkout
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 sm:mt-0">
                <span className="rounded-full bg-slate-900 px-4 py-1.5 font-display text-lg font-black text-[#ebd810]">
                  Special Offer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-0 border-t border-slate-900/10 sm:grid-cols-2">
          {/* Starter */}
          <div className="relative flex flex-col gap-4 border-b border-slate-900/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-700">
                Starter Plan
              </p>
              <p className="mt-0.5 text-xs text-slate-600">1 month access · All 10 courses</p>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-4xl font-black text-slate-900">
                ₹{STARTER_OFFER}
              </span>
              <span className="text-lg text-slate-500 line-through">₹{STARTER_ORIGINAL}</span>
              <span className="ml-auto rounded-full bg-slate-900/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                ≈₹{STARTER_PER_DAY}/day
              </span>
            </div>

            <ul className="space-y-1.5 text-[12px] text-slate-700">
              {[
                "All 10 foundation courses",
                "Pre-recorded, self-paced",
                "Doubt support on WhatsApp",
                "30-day access",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={STARTER_CHECKOUT}
              onClick={() => handleClick("starter")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-xl border border-slate-900/20 bg-slate-900/10 py-3 text-center text-sm font-black text-slate-900 transition hover:bg-slate-900/18"
            >
              Enroll — ₹{STARTER_OFFER}
            </a>
          </div>

          {/* Semester */}
          <div className="relative flex flex-col gap-4 p-6 sm:p-8">
            {/* Best Value badge */}
            <div className="absolute right-5 top-5 rounded-full bg-slate-900 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#ebd810] sm:right-6 sm:top-6">
              BEST VALUE
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-amber-800">
                Semester Plan
              </p>
              <p className="mt-0.5 text-xs text-slate-600">6 months access · All 10 courses + extras</p>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-4xl font-black text-slate-900">
                ₹{SEMESTER_OFFER.toLocaleString("en-IN")}
              </span>
              <span className="text-lg text-slate-500 line-through">₹{SEMESTER_ORIGINAL.toLocaleString("en-IN")}</span>
              <span className="ml-auto rounded-full bg-slate-900/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                ≈₹{SEMESTER_PER_DAY}/day
              </span>
            </div>

            <p className="text-[11px] font-semibold text-amber-800">
              Save ₹{SEMESTER_SAVINGS.toLocaleString("en-IN")} vs buying 6 Starter plans
            </p>

            <ul className="space-y-1.5 text-[12px] text-slate-700">
              {[
                "All 10 foundation courses",
                "Pre-recorded, self-paced",
                "Doubt support on WhatsApp",
                "180-day access",
                "Mock interview session",
                "Resume review by Balajee Seshadri",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={SEMESTER_CHECKOUT}
              onClick={() => handleClick("semester")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-xl border-2 border-slate-900 bg-slate-900 py-3 text-center text-sm font-black text-[#ebd810] shadow-[0_3px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0.5 active:shadow-none"
            >
              Enroll — ₹{SEMESTER_OFFER.toLocaleString("en-IN")}
            </a>
          </div>
        </div>

        {/* How to Redeem */}
        <div className="border-t border-slate-900/10 px-6 py-5 sm:px-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-700">
            How to redeem
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            {/* Steps */}
            <ol className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
              {[
                "Select a plan above",
                "Enter code at checkout",
                "Pay 20% less",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[9px] font-black text-[#ebd810]">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-700">{step}</span>
                  {i < 2 && (
                    <svg className="hidden shrink-0 sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>

            {/* Copyable code */}
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <p className="text-[10px] text-slate-600">Click to copy your code</p>
              <CopyCode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
