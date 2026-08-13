"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePromotionSlider } from "./PromotionSliderContext";

const INDEPENDENCE_END_MS = new Date("2026-08-15T23:59:59+05:30").getTime();
const isIndependenceDay = typeof window !== "undefined"
  ? Date.now() <= INDEPENDENCE_END_MS
  : true;

const slides = [
  {
    id: "independence-offer",
    eyebrow: isIndependenceDay ? "80th Independence Year Offer" : "20% Discount Offer",
    title: "Get 20% Discount on All Plans",
    detail: "Use code: INDIA_80TH_INDEPENDENCE_DAY",
    note: "Valid until August 31, 2026",
    href: "https://courses.etalvis.com/courses",
    cta: "Explore Plans",
    badge: "20%",
    badgeSub: "OFF",
  },
  {
    id: "resume-session",
    eyebrow: "Upcoming Live Session",
    title: "Build a Resume for Core Electronics Jobs",
    detail: "Sunday, August 16, 2026 · 11 AM to 1 PM IST",
    note: "Workshop fee: ₹159 · Led by Balajee Seshadri",
    href: "https://courses.etalvis.com/workshop",
    cta: "Join Workshop",
    badge: "₹159",
    badgeSub: "SEAT",
  },
  {
    id: "embedded-systems",
    eyebrow: "10 Foundation Courses",
    title: "From Electronics to ARM. Built for Core Jobs.",
    detail: "C programming · Embedded hardware & software · Protocols · ARM · 8085 · Networking",
    note: "Self-paced · Doubts cleared on WhatsApp",
    href: "https://courses.etalvis.com/embedded-systems",
    cta: "Explore Course",
    badge: "10",
    badgeSub: "COURSES",
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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY.current;
    const hDist = touchStartX.current - touchEndX;
    const vDist = touchStartY.current - touchEndY;
    if (Math.abs(hDist) >= 40 && Math.abs(hDist) > Math.abs(vDist)) {
      hDist > 0 ? goToNext() : goToPrevious();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      aria-label="Latest eTalVis offers, courses and workshops"
      className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-4 lg:px-6"
    >
      <div
        className="relative h-[172px] overflow-hidden rounded-2xl bg-[#ebd810] shadow-[0_10px_36px_rgba(235,216,16,0.35)] sm:h-[184px] lg:h-[200px] lg:rounded-[22px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Shared background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-800/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-900/8 blur-3xl" />

        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <a
              key={slide.id}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${slide.eyebrow}: ${slide.title}`}
              className={`absolute inset-0 block cursor-pointer transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-slate-900/30 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : index < activeSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              {/* Content */}
              <div className="relative flex h-full items-center px-5 py-3 pb-9 sm:px-7 sm:pb-4 lg:px-9">
                <div className="flex w-full items-center gap-4 sm:gap-6">

                  {/* Badge tile */}
                  <div className="hidden shrink-0 flex-col items-center justify-center rounded-xl border border-slate-900/15 bg-slate-900/10 px-4 py-3 sm:flex" style={{ minWidth: 68 }}>
                    <span className="font-display text-2xl font-black leading-none text-slate-900 lg:text-3xl">
                      {slide.badge}
                    </span>
                    <span className="mt-0.5 text-[9px] font-extrabold uppercase tracking-widest text-slate-700">
                      {slide.badgeSub}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/25 bg-slate-900/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.10em] text-slate-800 sm:text-[11px]">
                      {slide.eyebrow}
                    </div>

                    <h2 className="mt-1.5 font-display text-[16px] font-black leading-[1.15] tracking-tight text-slate-900 sm:mt-2 sm:text-[22px] lg:text-[28px]">
                      {slide.title}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-[14px] text-slate-700 sm:line-clamp-none sm:mt-1 sm:text-[12px] sm:leading-[18px] lg:text-[13px]">
                      {slide.detail}
                    </p>

                    <p className="mt-0.5 hidden text-[10px] text-slate-600 sm:block">
                      {slide.note}
                    </p>

                    <span className="mt-2 inline-flex min-h-[28px] items-center justify-center rounded-lg border border-slate-900 bg-slate-900 px-3.5 py-1 text-[11px] font-extrabold text-[#ebd810] shadow-[0_2px_0_rgba(0,0,0,0.3)] transition hover:bg-slate-800 sm:mt-2.5 sm:min-h-[32px] sm:px-4 sm:text-[12px]">
                      {slide.cta}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {/* Prev/Next buttons */}
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Show previous banner"
          className="absolute left-2 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900/20 bg-slate-900/10 text-slate-900 backdrop-blur transition hover:bg-slate-900/20 sm:flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next banner"
          className="absolute right-2 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900/20 bg-slate-900/10 text-slate-900 backdrop-blur transition hover:bg-slate-900/20 sm:flex"
        >
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === index ? "w-5 bg-slate-900" : "w-1.5 bg-slate-900/30 hover:bg-slate-900/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
