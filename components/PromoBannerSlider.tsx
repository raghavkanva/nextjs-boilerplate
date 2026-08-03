"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Gift,
  Tag,
} from "lucide-react";

const slides = [
  {
    id: "independence-offer",
    eyebrow: "Independence Day Offer",
    title: "Pay Only 80% on All Plans",
    detail: "Use code INDIA_80TH_INDEPENDENCE_DAY",
    note: "Valid until August 15, 2026",
    href: "https://courses.etalvis.com/independence-offer",
    cta: "Explore Plans",
    icon: Gift,
    theme: "green",
  },
  {
    id: "resume-session",
    eyebrow: "Upcoming Live Session",
    title: "Build a Resume for Core Electronics Jobs",
    detail: "Workshop fee: ₹80",
    note: "Practical resume guidance for electronics students",
    href: "https://courses.etalvis.com/resume-session",
    cta: "Join the Workshop",
    icon: CalendarDays,
    theme: "amber",
  },
];

export default function PromoBannerSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

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

  return (
    <section
      aria-label="Latest eTalVis offers and workshops"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] sm:rounded-3xl">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          const isActive = index === activeSlide;
          const isGreen = slide.theme === "green";

          return (
            <article
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-500 ${
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
                className={`absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl sm:h-96 sm:w-96 ${
                  isGreen ? "bg-emerald-200/60" : "bg-amber-200/70"
                }`}
              />

              <div
                aria-hidden="true"
                className={`absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl sm:h-80 sm:w-80 ${
                  isGreen ? "bg-teal-100/70" : "bg-orange-100/80"
                }`}
              />

              <div className="relative flex h-full items-center px-5 py-5 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
                <div className="grid w-full items-center gap-4 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
                  <div className="max-w-3xl">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] sm:text-xs ${
                        isGreen
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-amber-200 bg-amber-50 text-amber-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {slide.eyebrow}
                    </div>

                    <h2 className="mt-3 max-w-3xl text-2xl font-black leading-[1.04] tracking-tight text-slate-950 sm:mt-5 sm:text-4xl lg:text-5xl xl:text-6xl">
                      {slide.title}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-700 sm:mt-4 sm:text-lg lg:text-xl">
                      {slide.detail}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      {slide.note}
                    </p>

                    <a
                      href={slide.href}
                      className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-950 px-5 py-2.5 text-sm font-extrabold text-slate-950 shadow-[0_4px_0_#0f172a] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:mt-6 sm:text-base ${
                        isGreen
                          ? "bg-emerald-400 hover:bg-emerald-300"
                          : "bg-amber-400 hover:bg-amber-300"
                      }`}
                    >
                      {slide.cta}
                    </a>
                  </div>

                  <div className="hidden lg:block">
                    <div
                      className={`ml-auto aspect-square w-full max-w-[260px] rotate-3 rounded-[32px] border-2 border-slate-950 p-5 shadow-[12px_12px_0_#0f172a] ${
                        isGreen ? "bg-emerald-400" : "bg-amber-400"
                      }`}
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
                            {isGreen ? "80%" : "₹80"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Show previous banner"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white sm:flex"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next banner"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-950 shadow-md backdrop-blur transition hover:bg-white sm:flex"
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
