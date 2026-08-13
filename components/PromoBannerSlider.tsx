"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePromotionSlider } from "./PromotionSliderContext";

const slides = [
  {
    id: "independence-offer",
    eyebrow: "80th Independence Year Offer",
    title: "Pay Only 80% on All Plans",
    detail: "Use code: INDIA_80TH_INDEPENDENCE_DAY",
    note: "Valid until August 31, 2026",
    href: "https://courses.etalvis.com/courses",
    cta: "Explore Plans",
    badge: "80%",
    badgeSub: "OFF",
    accent: "#FFC400",
    bg: "from-[#0A3D1F] via-[#145A32] to-[#0A3D1F]",
    glow1: "bg-emerald-400/20",
    glow2: "bg-amber-400/15",
    pillBg: "bg-[#FFC400]/20 border-[#FFC400]/40 text-[#FFC400]",
    ctaClass: "bg-[#FFC400] hover:bg-amber-300 border-[#0A3D1F] text-[#0A3D1F]",
  },
  {
    id: "resume-session",
    eyebrow: "Upcoming Live Session",
    title: "Build a Resume for Core Electronics Jobs",
    detail: "Sunday, August 16, 2026 · 11 AM to 1 PM IST",
    note: "Workshop fee: ₹80 · Led by Balajee Seshadri",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Register — ₹80",
    badge: "₹80",
    badgeSub: "SEAT",
    accent: "#FFC400",
    bg: "from-slate-950 via-slate-900 to-slate-950",
    glow1: "bg-amber-400/15",
    glow2: "bg-emerald-400/10",
    pillBg: "bg-amber-400/15 border-amber-400/40 text-amber-300",
    ctaClass: "bg-[#FFC400] hover:bg-amber-300 border-slate-950 text-slate-950",
  },
  {
    id: "embedded-systems",
    eyebrow: "10 Foundation Courses",
    title: "Build the Fundamentals Interviewers Test",
    detail: "Electronics · C programming · Embedded hardware & software · Protocols · ARM · 8085 · Networking",
    note: "Self-paced · Doubts cleared on WhatsApp",
    href: "https://courses.etalvis.com/embedded-systems",
    cta: "Explore Course",
    badge: "10",
    badgeSub: "COURSES",
    accent: "#34D399",
    bg: "from-[#0A3D1F] via-[#0d4a25] to-[#0A3D1F]",
    glow1: "bg-emerald-300/20",
    glow2: "bg-teal-400/15",
    pillBg: "bg-emerald-400/20 border-emerald-400/40 text-emerald-300",
    ctaClass: "bg-[#FFC400] hover:bg-amber-300 border-[#0A3D1F] text-[#0A3D1F]",
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
        className="relative h-[170px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(10,61,31,0.22)] sm:h-[210px] lg:h-[232px] lg:rounded-[24px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <a
              key={slide.id}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${slide.eyebrow}: ${slide.title}`}
              className={`absolute inset-0 block cursor-pointer bg-gradient-to-br ${slide.bg} transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/40 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : index < activeSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              {/* Glows */}
              <div aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72 ${slide.glow1}`} />
              <div aria-hidden="true" className={`pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl ${slide.glow2}`} />

              {/* Content */}
              <div className="relative flex h-full items-center px-5 py-3 pb-10 sm:px-8 sm:pb-4 lg:px-10">
                <div className="flex w-full items-center gap-5 sm:gap-8">

                  {/* Badge tile */}
                  <div className="hidden shrink-0 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 sm:flex" style={{ minWidth: 72 }}>
                    <span className="font-display text-2xl font-black leading-none text-white lg:text-3xl"
                      style={{ color: slide.accent }}>
                      {slide.badge}
                    </span>
                    <span className="mt-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white/40">
                      {slide.badgeSub}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.10em] sm:text-[11px] ${slide.pillBg}`}>
                      {slide.eyebrow}
                    </div>

                    <h2 className="mt-1.5 font-display text-[20px] font-black leading-[1.1] tracking-tight text-white sm:mt-2 sm:text-[26px] lg:text-[32px]">
                      {slide.title}
                    </h2>

                    <p className="mt-1 text-[11px] font-semibold leading-[16px] text-white/60 sm:mt-1.5 sm:text-[13px] sm:leading-5 lg:text-[14px]">
                      {slide.detail}
                    </p>

                    <p className="mt-0.5 hidden text-[11px] text-white/40 sm:block lg:text-xs">
                      {slide.note}
                    </p>

                    <span
                      className={`mt-2.5 inline-flex min-h-[30px] items-center justify-center rounded-lg border px-3.5 py-1 text-[11px] font-extrabold shadow-[0_2px_0] sm:mt-3 sm:min-h-[34px] sm:px-4 sm:text-[12px] sm:shadow-[0_3px_0] ${slide.ctaClass}`}
                      style={{ boxShadow: `0 3px 0 rgba(0,0,0,0.35)` }}
                    >
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
          className="absolute left-2.5 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next banner"
          className="absolute right-2.5 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === index ? "w-5 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
