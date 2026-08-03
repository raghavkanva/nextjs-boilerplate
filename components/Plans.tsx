"use client";

import { plans, type Plan } from "@/data/content";

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

function handlePlanClick(planName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "plan_enroll_click", { plan: planName });
  }
}

function PlanCard({ plan, previousPlanName }: { plan: Plan; previousPlanName?: string }) {
  const isPopular = plan.tag === "Popular";
  const isAcademic = plan.tag === "For Institutions";

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
      <p className="text-muted text-sm mb-4">{plan.duration}</p>

      {plan.price !== null ? (
        <div className="font-display font-extrabold text-3xl text-text mb-6">
          Rs. {plan.price.toLocaleString("en-IN")}
        </div>
      ) : (
        <div className="font-display font-extrabold text-2xl text-text mb-6">
          Custom Pricing
        </div>
      )}

      {previousPlanName && (
        <p className="text-sm font-semibold text-muted mb-3">
          All of {previousPlanName}, and:
        </p>
      )}

      <ul className="space-y-3 mb-6 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted">
            {getFeatureIcon(feature)}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.highlights?.map((h, i) => (
        <div key={i} className="mb-4 rounded-xl border-2 border-amber bg-surface p-4">
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
        <div className="mt-auto flex flex-col gap-3">
          <a
            href={plan.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handlePlanClick(plan.name)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
          >
            <WhatsAppIcon /> Contact on WhatsApp
          </a>
          <a
            href={plan.emailUrl}
            onClick={() => handlePlanClick(plan.name)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-text border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
          >
            <EmailIcon /> Email Us
          </a>
        </div>
      ) : plan.checkoutUrl ? (
        <a
          href={plan.checkoutUrl}
          onClick={() => handlePlanClick(plan.name)}
          className="mt-auto inline-block text-center px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
        >
          Enroll, {plan.name}
        </a>
      ) : null}
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
