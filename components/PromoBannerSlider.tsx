"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
  Tag,
} from "lucide-react";

const slides = [
  {
    id: "independence-offer",
    eyebrow: "India Enters Its 80th Year of Independence!",
    mobileEyebrow: "80th Independence Year Offer",
    title: "Pay Only 80% on All Plans",
    mobileTitle: "Pay Only 80%",
    detail: "Use code : INDIA_80TH_INDEPENDENCE_DAY",
    mobileDetail: "Code: INDIA_80TH_INDEPENDENCE_DAY",
    note: "Valid until August 15, 2026",
    href: "https://courses.etalvis.com/independence-offer",
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
    mobileTitle: "Build a Job-Ready Resume",
    detail: "Workshop fee: ₹80",
    mobileDetail: "Core electronics resume workshop",
    note: "Practical guidance for electronics students",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Join for ₹80",
    icon: CalendarDays,
    theme: "amber",
    tileText: "₹80",
  },
  {
    id: "embedded-systems",
    eyebrow: "Embedded Systems Foundation",
    mobileEyebrow: "10 Foundation Courses",
    title: "Build Strong Fundamentals Through 10 Courses",
    mobileTitle: "Master Embedded Fundamentals",
    detail: "Learn electronics, C programming, hardware and embedded software",
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
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    const interval = window.setInterval(goToNext, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX =
      event.changedTouches[0]?.clientX ?? touchStartX.current;
    const touchEndY =
      event.changedTouches[0]?.clientY ?? touchStartY.current;

    const horizontalDistance = touchStartX.current - touchEndX;
    const verticalDistance = touchStartY.current - touchEndY;

    if (
      Math.abs(horizontalDistance) >= 40 &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance)
    ) {
      horizontalDistance > 0 ? goToNext() : goToPrevious();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      aria-label="Latest eTalVis offers, courses and workshops"
      className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-6 sm:py-6 lg:px-8"
    >
      <div
        className="relative min-h-[210px] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] sm:aspect-video sm:min-h-0 sm:rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          const isActive = index === activeSlide;

          const themeClasses =
            slide.theme === "green"
              ? {
                  pill: "border-emerald-200 bg-emerald-50 text-emerald-800",
                  glow: "bg-emerald-200/60",
                  bottomGlow: "bg-teal-100/70",
                  button: "bg-emerald-400 hover:bg-emerald-300",
                  tile: "bg-emerald-400",
                }
              : slide.theme === "amber"
                ? {
                    pill: "border-amber-200 bg-amber-50 text-amber-900",
                    glow: "bg-amber-200/70",
                    bottomGlow: "bg-orange-100/80",
                    button: "bg-amber-400 hover:bg-amber-300",
                    tile: "bg-amber-400",
                  }
                : {
                    pill: "border-sky-200 bg-sky-50 text-sky-900",
                    glow: "bg-sky-200/70",
                    bottomGlow: "bg-indigo-100/70",
                    button: "bg-sky-400 hover:bg-sky-300",
                    tile: "bg-sky-400",
                  };

          return (
            <a
              key={slide.id}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${slide.eyebrow}: ${slide.title}`}
              className={`absolute inset-0 block cursor-pointer transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-slate-950 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : index < activeSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(148,163,184,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.20) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              <div
                aria-hidden="true"
                className={`absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl sm:h-96 sm:w-96 ${themeClasses.glow}`}
              />

              <div
                aria-hidden="true"
                className={`absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl sm:h-80 sm:w-80 ${themeClasses.bottomGlow}`}
              />

              <div className="relative flex h-full items-center px-5 py-4 pb-12 sm:px-10 sm:py-8 sm:pb-8 lg:px-14 lg:py-10">
                <div className="grid w-full items-center gap-4 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
                  <div className="max-w-3xl">
                    <div
                      className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase leading-4 tracking-[0.08em] sm:text-xs sm:tracking-[0.12em] ${themeClasses.pill}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />

                      <span className="sm:hidden">{slide.mobileEyebrow}</span>
                      <span className="hidden sm:inline">{slide.eyebrow}</span>
                    </div>

                    <h2 className="mt-2 max-w-3xl text-[20px] font-black leading-[1.08] tracking-tight text-slate-950 sm:mt-5 sm:text-4xl lg:text-5xl xl:text-6xl">
                      <span className="sm:hidden">{slide.mobileTitle}</span>
                      <span className="hidden sm:inline">{slide.title}</span>
                    </h2>

                    <p className="mt-2 max-w-2xl break-words text-xs font-semibold leading-5 text-slate-700 sm:text-lg sm:leading-7 lg:text-xl">
                      <span className="sm:hidden">{slide.mobileDetail}</span>
                      <span className="hidden sm:inline">{slide.detail}</span>
                    </p>

                    <p className="hidden sm:block mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                      {slide.note}
                    </p>

                    <span
                      className={`mt-3 inline-flex min-h-8 items-center justify-center rounded-lg border border-slate-950 px-3 py-1.5 text-xs font-extrabold text-slate-950 shadow-[0_3px_0_#0f172a] transition sm:mt-6 sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-base sm:shadow-[0_4px_0_#0f172a] ${themeClasses.button}`}
                    >
                      {slide.cta}
                    </span>
                  </div>

                  <div className="hidden lg:block">
                    <div
                      className={`ml-auto aspect-square w-full max-w-[260px] rotate-3 rounded-[32px] border-2 border-slate-950 p-5 shadow-[12px_12px_0_#0f172a] ${themeClasses.tile}`}
                    >
                      <div
                        className="flex h-full flex-col justify-between rounded-2xl border border-slate-950/20 p-5"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(15,23,42,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.10) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      >
                        <Tag className="h-8 w-8" aria-hidden="true" />

                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-800">
                            eTalVis
                          </p>

                          <p className="mt-2 text-3xl font-black leading-none text-slate-950">
                            {slide.tileText}
                          </p>
                        </div>
                      </div>
                    </div>
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
          className="hidden sm:flex absolute left-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next banner"
          className="hidden sm:flex absolute right-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:bottom-5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-7 bg-slate-950"
                  : "w-2.5 bg-slate-300 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
