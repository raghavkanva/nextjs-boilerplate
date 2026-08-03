"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
} from "lucide-react";

const promotions = [
  {
    id: "independence-offer",
    text: "India enters its 80th year of Independence! Pay only 80% on all plans.",
    mobileText: "Pay only 80% on all plans",
    extra: "Code: INDIA_80TH_INDEPENDENCE_DAY",
    href: "https://courses.etalvis.com/independence-offer",
    cta: "View Offer",
    icon: Gift,
    background: "bg-emerald-600",
    hoverBackground: "hover:bg-emerald-700",
    iconBackground: "bg-white/15",
    mutedText: "text-emerald-50",
  },
  {
    id: "resume-session",
    text: "Upcoming live session: Build an outstanding resume for core electronics jobs.",
    mobileText: "Core Electronics Resume Workshop",
    extra: "Join for ₹80",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Join Now",
    icon: CalendarDays,
    background: "bg-amber-400",
    hoverBackground: "hover:bg-amber-300",
    iconBackground: "bg-white/45",
    mutedText: "text-slate-800",
  },
  {
    id: "embedded-systems",
    text: "Master embedded systems fundamentals through 10 beginner-friendly courses.",
    mobileText: "10 Embedded Systems Foundation Courses",
    extra: "Learn anytime at your own pace",
    href: "https://courses.etalvis.com/embedded-systems",
    cta: "Explore Courses",
    icon: BookOpen,
    background: "bg-sky-500",
    hoverBackground: "hover:bg-sky-600",
    iconBackground: "bg-white/20",
    mutedText: "text-sky-50",
  },
];

export default function ThinPromotionHeaderSlider() {
  const [activePromotion, setActivePromotion] = useState(0);

  const showPrevious = () => {
    setActivePromotion((current) =>
      current === 0 ? promotions.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActivePromotion((current) =>
      current === promotions.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    const interval = window.setInterval(showNext, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const promotion = promotions[activePromotion];
  const Icon = promotion.icon;

  return (
    <aside
      aria-label="Current eTalVis promotions"
      className={`relative z-50 overflow-hidden text-slate-950 transition-colors duration-500 ${promotion.background}`}
    >
      <div className="mx-auto flex min-h-11 w-full max-w-7xl items-center px-2 sm:min-h-12 sm:px-4 lg:px-6">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous promotion"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <a
          href={promotion.href}
          className={`group mx-2 flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-center transition sm:mx-3 sm:gap-3 ${promotion.hoverBackground}`}
        >
          <span
            className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:flex ${promotion.iconBackground}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-xs font-extrabold sm:hidden">
              {promotion.mobileText}
            </span>

            <span className="hidden text-sm font-extrabold leading-5 sm:inline">
              {promotion.text}
            </span>

            <span
              className={`ml-0 block truncate text-[10px] font-semibold leading-4 sm:ml-2 sm:inline sm:text-xs ${promotion.mutedText}`}
            >
              {promotion.extra}
            </span>
          </span>

          <span className="hidden shrink-0 rounded-full border border-slate-950/20 bg-white/35 px-3 py-1 text-xs font-black sm:inline-flex">
            {promotion.cta}
          </span>
        </a>

        <button
          type="button"
          onClick={showNext}
          aria-label="Show next promotion"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex h-0.5">
        {promotions.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePromotion(index)}
            aria-label={`Show promotion ${index + 1}`}
            aria-current={activePromotion === index ? "true" : undefined}
            className={`flex-1 transition ${
              activePromotion === index
                ? "bg-slate-950"
                : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
