"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
} from "lucide-react";

import { usePromotionSlider } from "./PromotionSliderContext";

const promotions = [
  {
    id: "independence-offer",
    text:
      "India enters its 80th year of Independence! Pay only 80% on all plans.",
    mobileText: "Pay only 80% on all plans",
    extra: "Code: INDIA_80TH_INDEPENDENCE_DAY",
    href: "https://courses.etalvis.com/courses",
    cta: "View Offer",
    icon: Gift,
    background:
      "bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600",
    foreground: "text-white",
    hoverBackground: "hover:bg-white/10",
    iconBackground: "bg-white/15",
    mutedText: "text-emerald-50",
    buttonStyle:
      "border-white/30 bg-white/15 text-white hover:bg-white/25",
    arrowStyle: "bg-white/15 text-white hover:bg-white/25",
  },
  {
    id: "resume-session",
    text:
      "Upcoming live session: Build an outstanding resume for core electronics jobs.",
    mobileText: "Core Electronics Resume Workshop",
    extra: "Join for ₹80",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Join Now",
    icon: CalendarDays,
    background:
      "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400",
    foreground: "text-slate-950",
    hoverBackground: "hover:bg-black/5",
    iconBackground: "bg-white/45",
    mutedText: "text-slate-700",
    buttonStyle:
      "border-slate-950/20 bg-white/45 text-slate-950 hover:bg-white/65",
    arrowStyle: "bg-white/35 text-slate-950 hover:bg-white/55",
  },
  {
    id: "embedded-systems",
    text:
      "Master embedded systems fundamentals through 10 beginner-friendly courses.",
    mobileText: "10 Embedded Systems Foundation Courses",
    extra: "Learn anytime at your own pace",
    href: "https://courses.etalvis.com/courses",
    cta: "Explore Courses",
    icon: BookOpen,
    background: "bg-gradient-to-r from-sky-600 via-blue-500 to-sky-600",
    foreground: "text-white",
    hoverBackground: "hover:bg-white/10",
    iconBackground: "bg-white/20",
    mutedText: "text-sky-50",
    buttonStyle:
      "border-white/30 bg-white/15 text-white hover:bg-white/25",
    arrowStyle: "bg-white/15 text-white hover:bg-white/25",
  },
] as const;

export default function ThinPromotionHeaderSlider() {
  const {
    activePromotion,
    setActivePromotion,
    showPrevious,
    showNext,
  } = usePromotionSlider();

  const promotion = promotions[activePromotion];
  const Icon = promotion.icon;

  return (
    <>
      <div aria-hidden="true" className="h-11 sm:h-12" />

      <aside
        aria-label="Current eTalVis promotions"
        className={`fixed inset-x-0 top-0 z-[100] overflow-hidden shadow-md transition-colors duration-500 ${promotion.background} ${promotion.foreground}`}
      >
        <div className="mx-auto flex min-h-11 w-full max-w-7xl items-center px-2 sm:min-h-12 sm:px-4 lg:px-6">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous promotion"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${promotion.arrowStyle}`}
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
                className={`block truncate text-[10px] font-semibold leading-4 sm:ml-2 sm:inline sm:text-xs ${promotion.mutedText}`}
              >
                {promotion.extra}
              </span>
            </span>

            <span
              className={`hidden shrink-0 rounded-full border px-3 py-1 text-xs font-black transition sm:inline-flex ${promotion.buttonStyle}`}
            >
              {promotion.cta}
            </span>
          </a>

          <button
            type="button"
            onClick={showNext}
            aria-label="Show next promotion"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${promotion.arrowStyle}`}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-0.5">
          {promotions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePromotion(index)}
              aria-label={`Show ${item.id} promotion`}
              aria-current={activePromotion === index ? "true" : undefined}
              className={`flex-1 transition ${
                activePromotion === index
                  ? "bg-slate-950"
                  : "bg-white/40 hover:bg-white/65"
              }`}
            />
          ))}
        </div>
      </aside>
    </>
  );
}