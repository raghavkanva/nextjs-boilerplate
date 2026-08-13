"use client";

import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
} from "lucide-react";

import { usePromotionSlider } from "./PromotionSliderContext";

const slides = [
  {
    id: "independence-offer",
    eyebrow: "India Enters Its 80th Year of Independence!",
    mobileEyebrow: "80th Independence Year Offer",
    title: "Pay Only 80% on All Plans",
    mobileTitle: "Pay Only 80%",
    detail: "Use code: INDIA_80TH_INDEPENDENCE_DAY",
    mobileDetail: "Code: INDIA_80TH_INDEPENDENCE_DAY",
    note: "Valid until August 31, 2026",
    href: "https://courses.etalvis.com/courses",
    cta: "Explore Plans",
    icon: Gift,
    theme: "green",
    tileText: "80%",
  },
  {
    id: "resume-session",
    eyebrow: "Upcoming Live Session",
    mobileEyebrow: "Live Resume Workshop",
    title: "Build a Resume for Core Electronics Jobs",
    mobileTitle: "Build a Core Job-Ready Resume",
    detail: "Workshop fee: ₹80",
    mobileDetail: "Core electronics resume workshop",
    note: "Sunday, August 16, 2026 · 11 AM to 1 PM IST",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Join for ₹80",
    icon: CalendarDays,
    theme: "yellow",
    tileText: "₹80",
  },
  {
    id: "embedded-systems",
    eyebrow: "Embedded Systems Foundation",
    mobileEyebrow: "10 Foundation Courses",
    title: "Build Strong Fundamentals Through 10 Courses",
    mobileTitle: "Master Embedded Fundamentals",
    detail:
      "Learn electronics, C programming, hardware and embedded software",
    mobileDetail: "Electronics, C, hardware and embedded software",
    note: "Beginner-friendly and self-paced",
    href: "https://courses.etalvis.com/embedded-systems",
    cta: "Explore Courses",
    icon: BookOpen,
    theme: "blue",
    tileText: "10",
  },
];

export default function PromoBannerSlider() {
  const {
    activePromotion: activeSlide,
    setActivePromotion: setActiveSlide,
    showPrevious: goToPrevious,
    showNext: goToNext,
  } = usePromotionSlider();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touchEndX =
      event.changedTouches[0]?.clientX ?? touchStartX.current;

    const touchEndY =
      event.changedTouches[0]?.clientY ?? touchStartY.current;

    const horizontalDistance =
      touchStartX.current - touchEndX;

    const verticalDistance =
      touchStartY.current - touchEndY;

    if (
      Math.abs(horizontalDistance) >= 40 &&
      Math.abs(horizontalDistance) >
        Math.abs(verticalDistance)
    ) {
      horizontalDistance > 0
        ? goToNext()
        : goToPrevious();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      aria-label="Latest eTalVis offers, courses and workshops"
      className="mx-auto w-full max-w-6xl px-2.5 py-2.5 sm:px-4 sm:py-3 lg:px-6"
    >
      <div
        className="relative h-[158px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] sm:h-[205px] lg:h-[228px] lg:rounded-[26px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          const isActive = index === activeSlide;

          const themeClasses =
            slide.theme === "green"
              ? {
                  pill:
                    "border-emerald-200 bg-emerald-50 text-emerald-800",
                  surface:
                    "bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/70",
                  glow: "bg-emerald-200/50",
                  bottomGlow: "bg-teal-100/60",
                  button:
                    "bg-emerald-400 hover:bg-emerald-300",
                }
              : slide.theme === "yellow"
                ? {
                    pill:
                      "border-yellow-200 bg-yellow-50 text-yellow-900",
                    surface:
                      "bg-gradient-to-br from-yellow-50/90 via-white to-amber-50/70",
                    glow: "bg-yellow-200/55",
                    bottomGlow: "bg-amber-100/65",
                    button:
                      "bg-yellow-400 hover:bg-yellow-300",
                  }
                : {
                    pill:
                      "border-blue-200 bg-blue-50 text-blue-900",
                    surface:
                      "bg-gradient-to-br from-blue-50/85 via-white to-sky-50/70",
                    glow: "bg-blue-200/55",
                    bottomGlow: "bg-sky-100/65",
                    button:
                      "bg-blue-400 hover:bg-blue-300",
                  };

          return (
            <a
              key={slide.id}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${slide.eyebrow}: ${slide.title}`}
              className={`absolute inset-0 block cursor-pointer transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-slate-950 ${themeClasses.surface} ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : index < activeSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute -right-14 -top-20 h-52 w-52 rounded-full blur-3xl sm:h-72 sm:w-72 ${themeClasses.glow}`}
              />

              <div
                aria-hidden="true"
                className={`absolute -bottom-24 -left-14 h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64 ${themeClasses.bottomGlow}`}
              />

              <div className="relative flex h-full items-center px-4 py-2.5 pb-8 sm:px-7 sm:py-3.5 sm:pb-4 lg:px-9 lg:py-4">
                <div className="w-full">
                  <div className="max-w-3xl">
                    <div
                      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase leading-4 tracking-[0.08em] sm:text-[11px] sm:tracking-[0.11em] ${themeClasses.pill}`}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />

                      <span className="sm:hidden">
                        {slide.mobileEyebrow}
                      </span>

                      <span className="hidden sm:inline">
                        {slide.eyebrow}
                      </span>
                    </div>

                    <h2 className="mt-1 max-w-3xl text-[22px] font-black leading-[1.08] tracking-tight text-slate-950 sm:mt-2.5 sm:text-[28px] lg:text-[36px] xl:text-[38px]">
                      <span className="sm:hidden">
                        {slide.mobileTitle}
                      </span>

                      <span className="hidden sm:inline">
                        {slide.title}
                      </span>
                    </h2>

                    <p className="mt-1 max-w-2xl break-words text-[12px] font-semibold leading-[18px] text-slate-700 sm:mt-1.5 sm:text-[13px] sm:leading-5 lg:text-[15px]">
                      <span className="sm:hidden">
                        {slide.mobileDetail}
                      </span>

                      <span className="hidden sm:inline">
                        {slide.detail}
                      </span>
                    </p>

                    <p className="mt-1 hidden max-w-2xl text-xs leading-4 text-slate-500 sm:block">
                      {slide.note}
                    </p>

                    <span
                      className={`mt-2 inline-flex min-h-8 items-center justify-center rounded-lg border border-slate-950 px-3 py-1 text-[12px] font-extrabold text-slate-950 shadow-[0_2px_0_#0f172a] transition sm:mt-3 sm:min-h-9 sm:px-4 sm:py-1.5 sm:text-[13px] sm:shadow-[0_3px_0_#0f172a] ${themeClasses.button}`}
                    >
                      {slide.cta}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Show previous banner"
          className="absolute left-2.5 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white sm:flex"
        >
          <ArrowLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next banner"
          className="absolute right-2.5 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white sm:flex"
        >
          <ArrowRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>

        <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur sm:bottom-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={
                activeSlide === index
                  ? "true"
                  : undefined
              }
              className={`h-2 rounded-full transition-all ${
                activeSlide === index
                  ? "w-6 bg-slate-950"
                  : "w-2 bg-slate-300 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}