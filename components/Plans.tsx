"use client";

import { useState } from "react";
import { plans, type Plan } from "@/data/content";
import { track, metaEvent } from "@/lib/analytics";

const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";
const INDEPENDENCE_END_MS = new Date("2026-08-15T23:59:59+05:30").getTime();
const isIndependenceDay = typeof window !== "undefined" ? Date.now() <= INDEPENDENCE_END_MS : true;

const offerPrices: Record<string, { price: number; perDay: number; perDayLabel: string; savings?: string }> = {
  "EF-01": { price: 511,  perDay: 17, perDayLabel: "≈₹17/day" },
  "EF-06": { price: 2047, perDay: 11, perDayLabel: "≈₹11/day", savings: "Save ₹1,019 vs buying 6 Starter plans" },
};

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 20a6 6 0 0112 0M16 8a3 3 0 110 6M21 20a6 6 0 00-6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <path d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getFeatureIcon(feature: string) {
  if (feature.includes("foundation courses")) return <BookIcon />;
  if (feature.includes("Pre-recorded")) return <PlayCircleIcon />;
  if (feature.includes("Practice exercises")) return <PencilIcon />;
  if (feature.includes("meetup sessions")) return <CalendarIcon />;
  if (feature.includes("Weekend Sessions")) return <CalendarIcon />;
  if (feature.includes("Bulk discount")) return <GroupIcon />;
  if (feature.includes("Contact Balajee")) return <ChatIcon />;
  return <BookIcon />;
}

function getHighlightIcon(title: string) {
  if (title.includes("WhatsApp")) return <ChatIcon />;
  if (title.includes("EMI")) return <CreditCardIcon />;
  if (title.includes("Resume")) return <DocumentIcon />;
  if (title.includes("Mock Interview")) return <MicIcon />;
  return <ChatIcon />;
}

function CopyOfferCode() {
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
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/40 bg-slate-900/10 px-3 py-1.5 font-mono text-xs font-bold text-slate-900 transition hover:bg-slate-900/20"
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
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="rgba(255,196,0,0.08)" />
          </svg>
        )}
      </span>
    </button>
  );
}

function PlanCard({ plan, previousPlanName }: { plan: Plan; previousPlanName?: string }) {
  const isPopular = plan.tag === "Popular";
  const isAcademic = plan.tag === "For Institutions";
  const offer = offerPrices[plan.code];
  const displayPrice = offer ? offer.price : plan.price;

  const handleClick = () => {
    const price = displayPrice ?? 0;
    track("plan_enroll_click", {
      plan_code: plan.code,
      plan_name: plan.name,
      price,
      currency: "INR",
      page: "embedded-systems",
    });
    metaEvent("InitiateCheckout", {
      content_name: plan.name,
      content_type: plan.code,
      value: price,
      currency: "INR",
      num_items: 1,
    });
  };

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border-2 p-6 md:p-8 bg-white ${
        isPopular ? "border-amber glow-popular" : isAcademic ? "border-amber/50" : "border-line"
      }`}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-cta text-black border border-text text-xs font-display font-bold">
          {plan.tag}
        </span>
      )}

      <h3 className="font-display font-bold text-2xl text-text mb-1">{plan.name}</h3>
      <p className="text-muted text-sm mb-3">{plan.duration}</p>

      {/* Price display */}
      {plan.price !== null ? (
        <div className="mb-2">
          {offer ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-display font-extrabold text-3xl text-text">
                ₹{offer.price.toLocaleString("en-IN")}
              </span>
              <span className="text-lg text-muted line-through">
                ₹{plan.price.toLocaleString("en-IN")}
              </span>
              <span className="ml-1 rounded-full bg-amber/10 px-2 py-0.5 text-[10px] font-bold text-amber">
                {offer.perDayLabel}
              </span>
            </div>
          ) : (
            <div className="font-display font-extrabold text-3xl text-text">
              ₹{plan.price.toLocaleString("en-IN")}
            </div>
          )}
          {offer?.savings && (
            <p className="mt-1 text-[11px] font-semibold text-amber">{offer.savings}</p>
          )}
          {offer && (
            <p className="mt-1 text-[10px] text-mutedDim">
              Independence offer · Code:{" "}
              <span className="font-mono font-bold text-text">{OFFER_CODE}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="font-display font-extrabold text-2xl text-text mb-3">
          Custom Pricing
        </div>
      )}

      {previousPlanName && (
        <p className="text-sm font-semibold text-muted mb-3 mt-2">
          All of {previousPlanName}, and:
        </p>
      )}

      <ul className="space-y-3 mb-6 mt-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted">
            {getFeatureIcon(feature)}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3">
        {plan.highlights?.map((h, i) => (
          <div key={i} className="rounded-xl border-2 border-amber bg-surface p-4">
            <div className="flex items-start gap-2">
              {getHighlightIcon(h.title)}
              <div>
                <p className="font-display font-semibold text-amber text-sm">{h.title}</p>
                <p className="text-xs text-muted mt-1">{h.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {isAcademic ? (
          <>
            <a
              href={plan.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
            >
              <WhatsAppIcon /> Contact on WhatsApp
            </a>
            <a
              href={plan.emailUrl}
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-text border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
            >
              <EmailIcon /> Email Us
            </a>
          </>
        ) : plan.checkoutUrl ? (
          <a
            href={plan.checkoutUrl}
            onClick={handleClick}
            className="inline-block text-center px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
          >
            Enroll{offer ? ` — ₹${offer.price.toLocaleString("en-IN")}` : `, ${plan.name}`}
          </a>
        ) : null}
      </div>
    </div>
  );
}

type PlansGridProps = {
  id?: string;
  heading: string;
  subline?: string;
};

export default function PlansGrid({ id, heading, subline }: PlansGridProps) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-10 md:py-12 sm:px-6">

      {/* Independence Day Offer banner */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-[#ebd810]">
        <div className="relative px-6 py-6 sm:px-8 sm:py-7">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-slate-900/8 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-slate-900/6 blur-3xl" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/25 bg-slate-900/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-800">
                {isIndependenceDay && <span>🇮🇳</span>}
                {isIndependenceDay ? "Independence Day Offer" : "20% Discount Offer"}
              </div>
              <h2 className="mt-2 font-display text-2xl font-black text-slate-900 sm:text-3xl">
                {heading}
              </h2>
              {subline && (
                <p className="mt-1 text-sm text-slate-700">{subline}</p>
              )}
              <p className="mt-1 text-xs text-slate-600">Valid until August 31, 2026 · Apply code at checkout</p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end sm:shrink-0">
              <p className="text-[10px] text-slate-600">Click to copy your code</p>
              <CopyOfferCode />
            </div>
          </div>
        </div>

        {/* How to redeem */}
        <div className="border-t border-slate-900/10 px-6 py-4 sm:px-8">
          <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            {["Select a plan below", "Enter code at checkout", "Pay 20% less"].map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[9px] font-black text-[#ebd810]">
                  {i + 1}
                </span>
                <span className="text-xs text-slate-700">{step}</span>
                {i < 2 && (
                  <svg className="hidden shrink-0 sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" className="text-slate-400" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.code}
            plan={plan}
            previousPlanName={i > 0 ? plans[i - 1].name : undefined}
          />
        ))}
      </div>
    </section>
  );
}
