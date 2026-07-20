"use client";

import { plans, type Plan } from "@/data/content";
import DealCountdown from "./DealCountdown";

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

function PlusCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function getFeatureIcon(feature: string) {
  if (feature.includes("foundation courses")) return <BookIcon />;
  if (feature.includes("Pre-recorded")) return <PlayCircleIcon />;
  if (feature.includes("Practice exercises")) return <PencilIcon />;
  if (feature.includes("Doubts cleared")) return <ChatIcon />;
  if (feature.includes("EMI")) return <CreditCardIcon />;
  if (feature.includes("meetup sessions")) return <CalendarIcon />;
  if (feature.includes("Extra Courses")) return <PlusCircleIcon />;
  return <BookIcon />;
}

function handlePlanClick(planName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "plan_enroll_click", { plan: planName });
  }
}
function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.5 9.5l-1.8 4.8-4.7 1.8 1.8-4.8 4.7-1.8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function getHighlightIcon(title: string) {
  if (title.includes("WhatsApp")) return <ChatIcon />;
  if (title.includes("EMI")) return <CreditCardIcon />;
  if (title.includes("Resume")) return <DocumentIcon />;
  if (title.includes("Career Guidance")) return <CompassIcon />;
  if (title.includes("Mock Interview")) return <MicIcon />;
  return <ChatIcon />;
}

function PlanCard({ plan, previousPlanName }: { plan: Plan; previousPlanName?: string }) {
  const isPopular = plan.tag === "Popular";
  const isStarterDeal = plan.name === "Starter";

  return (
    <div
      id={isStarterDeal ? "offer" : plan.name.toLowerCase()}
      className={`relative flex flex-col h-full rounded-2xl border p-6 md:p-8 bg-surface scroll-mt-24 ${
        isPopular ? "border-amber glow-popular" : "border-line"
      }`}
    >
      {plan.tag && (
        <span
          className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-onAccent text-xs font-display font-bold ${
            isStarterDeal ? "bg-ember" : isPopular ? "bg-amber" : "bg-text"
          }`}
        >
          {plan.tag}
        </span>
      )}

      <h3 className="font-display font-bold text-2xl text-text mb-1">{plan.name}</h3>
      <p className="text-muted text-base mb-4">{plan.duration}</p>

      {isStarterDeal ? (
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg text-mutedDim line-through font-display">
              Rs. 999
            </span>
            <span className="font-display font-extrabold text-3xl text-ember">
              Rs. 99
            </span>
          </div>
        </div>
      ) : (
        <div className="font-display font-extrabold text-3xl text-text mb-6">
          Rs. {plan.price.toLocaleString("en-IN")}
        </div>
      )}

      {isStarterDeal && <DealCountdown targetDate="2026-07-31T23:59:59" />}

      {previousPlanName && (
        <p className="text-base font-semibold text-muted mb-3">
          All of {previousPlanName}, and:
        </p>
      )}

      <ul className="space-y-3 mb-5">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-base text-muted">
            {getFeatureIcon(feature)}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.highlights && plan.highlights.length > 0 && (
        <div className="flex flex-col gap-3 mb-5">
          {plan.highlights.map((h, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-amber bg-amber/5 p-4"
            >
              <div className="flex items-start gap-2.5">
                {getHighlightIcon(h.title)}
                <div>
                  <p className="font-display font-semibold text-amber text-base leading-snug">
                    {h.title}
                  </p>
                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    {h.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <a href={plan.checkoutUrl}
        onClick={() => handlePlanClick(plan.name)}
        className="mt-auto inline-block text-center px-6 py-3.5 rounded-md bg-amber text-onAccent font-display font-bold text-base hover:scale-[1.02] transition-transform"
      >
        Enroll, {plan.name}
      </a>
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
    <section id={id} className="max-w-6xl mx-auto px-6 py-10 md:py-12">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text text-center mb-2">
        {heading}
      </h2>
      {subline && (
        <p className="text-muted text-center mb-10">{subline}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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