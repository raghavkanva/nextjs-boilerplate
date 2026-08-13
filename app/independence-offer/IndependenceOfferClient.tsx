"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { plans } from "@/data/content";
import SharedFooter from "@/components/Footer";
import { track as _track, metaEvent } from "@/lib/analytics";

const DEADLINE_ISO = "2026-08-31T23:59:59+05:30";
const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";

const offerPricing: Record<string, { regularPrice: number; saveAmount: number; offerPrice: number }> = {
  "EF-01": { regularPrice: 639, saveAmount: 128, offerPrice: 511 },
  "EF-06": { regularPrice: 2559, saveAmount: 511, offerPrice: 2048 },
};

function track(event: string, params: Record<string, string | number | boolean> = {}) {
  _track(event, { page: "independence-offer", ...params });
}

function useCountdown(targetISO: string) {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const total = new Date(targetISO).getTime() - Date.now();
      if (total <= 0) {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setState({
        days: Math.floor(total / 86400000),
        hours: Math.floor((total / 3600000) % 24),
        minutes: Math.floor((total / 60000) % 60),
        seconds: Math.floor((total / 1000) % 60),
        expired: false,
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  return state;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-[#111827] font-bold rounded-lg text-xl sm:text-2xl md:text-3xl px-2 sm:px-3 py-2 tabular-nums border-2 border-[#111827] min-w-[2.5rem] sm:min-w-[3rem] text-center">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-[#6B7280] mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(OFFER_CODE).then(() => {
      setCopied(true);
      track("offer_code_copy", { offer_code: OFFER_CODE });
      metaEvent("Lead", { content_name: "Independence Day Offer Code Copy", offer_code: OFFER_CODE });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#111827] bg-white text-[#111827] font-bold text-sm hover:bg-[#FFC400] transition-colors"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5 9-9" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Copy Code
        </>
      )}
    </button>
  );
}

// ---------- Hero ----------
function HeroSection({ expired }: { expired: boolean }) {
  const countdown = useCountdown(DEADLINE_ISO);

  return (
    <section className="relative bg-white pt-10 pb-14 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/images/icon.png" alt="eTalVis" width={80} height={80} className="h-14 w-auto" priority />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC400] border-2 border-[#111827] text-[#111827] text-xs font-bold uppercase tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-[#111827]" />
          Independence Day Offer
        </div>

        <h1
          className="font-bold text-[#111827] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          India’s 80th Independence Day.
          <br />
          <span className="text-[#0A3D1F]">#PayOnly80</span> on every plan.
        </h1>

        <p className="text-[#4B5563] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
          To celebrate India entering its 80th year of Independence, every eTalVis plan is discounted until August 31, 2026, 11:59 PM IST.
        </p>

        {!expired ? (
          <div className="mb-8">
            <p className="text-[#4B5563] text-sm font-semibold uppercase tracking-wide mb-3">Offer Ends In</p>
            <div className="flex items-end justify-center gap-1.5 sm:gap-3">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="text-[#9CA3AF] text-xl sm:text-2xl font-bold mb-5">:</span>
              <CountdownUnit value={countdown.hours} label="Hours" />
              <span className="text-[#9CA3AF] text-xl sm:text-2xl font-bold mb-5">:</span>
              <CountdownUnit value={countdown.minutes} label="Min" />
              <span className="text-[#9CA3AF] text-xl sm:text-2xl font-bold mb-5">:</span>
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </div>
        ) : (
          <div className="mb-8 px-6 py-4 rounded-xl border-2 border-[#E5E7EB] bg-[#F9FAFB] max-w-sm mx-auto">
            <p className="text-[#6B7280] text-sm font-semibold">This offer has ended. Regular prices apply below.</p>
          </div>
        )}

        {!expired && (
          <div className="flex flex-col items-center gap-3 mb-4">
            <p className="text-[#4B5563] text-sm font-semibold">Your offer code:</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#111827] bg-[#F0FDF4]">
              <code className="font-mono font-bold text-[#111827] text-sm md:text-base tracking-widest break-all">
                {OFFER_CODE}
              </code>
              <CopyButton />
            </div>
            <p className="text-[#6B7280] text-sm">Copy and apply at checkout</p>
          </div>
        )}

        <a
          href="#plans"
          onClick={() => track("cta_click", { location: "hero", offer_code: OFFER_CODE })}
          className="inline-block px-8 py-4 rounded-full bg-[#FFC400] text-black border-2 border-[#111827] font-bold text-base md:text-lg hover:bg-[#111827] hover:text-white transition-colors"
        >
          See All Plans
        </a>
      </div>
    </section>
  );
}

// ---------- How it works ----------
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      heading: "Choose your plan",
      body: "Pick Starter, Semester, or Annual below.",
    },
    {
      number: "02",
      heading: "Copy the offer code",
      body: `Use ${OFFER_CODE} at checkout.`,
    },
    {
      number: "03",
      heading: "Apply at checkout",
      body: "Paste the code in the coupon field. Your discount is applied instantly.",
    },
    {
      number: "04",
      heading: "Start learning",
      body: "All 10 Foundation Courses unlock immediately after payment.",
    },
  ];

  return (
    <section className="bg-[#F0FDF4] py-12">
      <div className="max-w-[900px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 36px)" }}
        >
          How to Redeem
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div key={step.number} className="rounded-xl border-2 border-[#111827] bg-white p-5">
              <span
                className="block text-4xl font-extrabold text-[#E5E7EB] mb-3 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </span>
              <h3 className="font-bold text-[#111827] text-base mb-1">{step.heading}</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Plan card ----------
function OfferPlanCard({ plan, expired }: { plan: (typeof plans)[number]; expired: boolean }) {
  const pricing = offerPricing[plan.code];
  if (!pricing) return null;

  const displayPrice = expired ? pricing.regularPrice : pricing.offerPrice;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-6 bg-white ${
        plan.tag === "Popular" ? "border-[#16A34A]" : "border-[#111827]"
      }`}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#FFC400] text-black border border-[#111827] text-xs font-bold">
          {plan.tag}
        </span>
      )}

      <h3
        className="font-bold text-[#111827] text-xl mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {plan.name}
      </h3>
      <p className="text-[#6B7280] text-sm mb-4">{plan.duration}</p>

      <div className="mb-2">
        {!expired && (
          <span className="text-[#9CA3AF] line-through text-base font-semibold mr-2">
            Rs. {pricing.regularPrice.toLocaleString("en-IN")}
          </span>
        )}
        <span
          className="font-extrabold text-[#16A34A] text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Rs. {displayPrice.toLocaleString("en-IN")}
        </span>
      </div>

      {!expired && (
        <p className="text-[#16A34A] text-sm font-semibold mb-4">
          You save Rs. {pricing.saveAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      )}

      {expired && <div className="mb-4" />}

      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#16A34A] shrink-0 mt-0.5">
              <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.checkoutUrl && (
        <a
          href={plan.checkoutUrl}
          onClick={() => {
            track("independence_plan_select", {
              plan_code: plan.code,
              plan_name: plan.name,
              price: displayPrice,
              offer_active: expired ? 0 : 1,
              offer_code: OFFER_CODE,
            });
            metaEvent("InitiateCheckout", {
              content_name: plan.name,
              content_type: plan.code,
              value: displayPrice,
              currency: "INR",
              num_items: 1,
            });
          }}
          className="inline-block text-center px-6 py-3 rounded-full bg-[#FFC400] text-black border-2 border-[#111827] font-bold hover:bg-[#111827] hover:text-white transition-colors mb-3"
        >
          {expired ? `Enroll, ${plan.name}` : `Enroll at Rs. ${displayPrice.toLocaleString("en-IN")}`}
        </a>
      )}
      <a
        href="/embedded-systems"
        className="text-center text-sm text-[#16A34A] hover:underline"
      >
        Learn more about the program
      </a>
    </div>
  );
}

// ---------- Plans ----------
function PlansSection({ expired }: { expired: boolean }) {
  const offerPlans = plans.filter((p) => p.code !== "EF-EDU");

  return (
    <section id="plans" className="py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 36px)" }}
        >
          {expired ? "Choose Your Plan" : "Choose Your Plan at a Discount"}
        </h2>
        {!expired && (
          <p className="text-[#4B5563] text-center mb-10 max-w-xl mx-auto">
            Apply code <code className="font-mono font-bold text-[#16A34A]">{OFFER_CODE}</code> at checkout. Valid until August 31, 2026, 11:59 PM IST.
          </p>
        )}
        {expired && <div className="mb-10" />}

        <div className="grid md:grid-cols-3 gap-6">
          {offerPlans.map((plan) => (
            <OfferPlanCard key={plan.code} plan={plan} expired={expired} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCtaSection({ expired }: { expired: boolean }) {
  return (
    <section className="bg-[#F0FDF4] py-14">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-[#111827] mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 38px)" }}
        >
          {expired ? "Start Learning Today" : "Offer Ends August 15. Don't Miss It."}
        </h2>
        <p className="text-[#4B5563] leading-relaxed mb-8">
          {expired
            ? "All 10 Foundation Courses are available at regular price. Same content, same instructor, same WhatsApp support."
            : `India is entering its 80th year of Independence. Get a discount on any plan with code ${OFFER_CODE} before 11:59 PM on August 31, 2026.`}
        </p>
        <a
          href="#plans"
          onClick={() => track("cta_click", { location: "final_cta", offer_code: OFFER_CODE })}
          className="inline-block px-8 py-4 rounded-full bg-[#FFC400] text-black border-2 border-[#111827] font-bold text-lg hover:bg-[#111827] hover:text-white transition-colors"
        >
          {expired ? "See Plans" : "Enroll at a Discount"}
        </a>
      </div>
    </section>
  );
}

// ---------- Page ----------
export default function IndependenceOfferClient() {
  const { expired } = useCountdown(DEADLINE_ISO);

  useEffect(() => {
    track("page_view", { content_name: "Independence Day Offer", content_category: "Offer" });
    metaEvent("ViewContent", {
      content_name: "Independence Day Offer",
      content_category: "Offer",
      page: "independence-offer",
    });
  }, []);

  return (
    <main className="bg-white">
      <HeroSection expired={expired} />
      <PlansSection expired={expired} />
      <HowItWorksSection />
      <FinalCtaSection expired={expired} />
      <SharedFooter />
    </main>
  );
}
