"use client";

import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function CourseHeroSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Main information box */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-300 bg-white/95 px-5 py-6 text-center shadow-[0_16px_45px_rgba(15,23,42,0.10)] backdrop-blur sm:px-8 sm:py-8 lg:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>

          <p className="mt-4 text-pretty text-xl font-bold leading-8 text-slate-950 sm:text-2xl sm:leading-9 lg:text-3xl lg:leading-10">
            Build strong fundamentals through 10 beginner-friendly foundation
            courses, taught by a{" "}
            <span className="text-emerald-700">
              40+ year industry veteran.
            </span>
          </p>
        </div>

        {/* Social proof and CTA */}
        <div className="mx-auto mt-5 flex max-w-4xl flex-col gap-3 md:mt-6 sm:flex-row">
          <div className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-900 bg-white px-4 py-4 text-center text-base font-extrabold text-slate-950 shadow-sm sm:px-6 sm:text-lg lg:text-xl">
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <span>10,000+ Students Already Enrolled</span>
          </div>

          <a
            href="https://courses.etalvis.com/embedded-systems"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-900 bg-amber-400 px-8 py-4 text-base font-extrabold text-slate-950 shadow-[0_6px_0_#0f172a] transition duration-200 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 active:translate-y-1 active:shadow-none sm:text-lg"
          >
            Enroll Today
          </a>
        </div>
      </div>
    </section>
  );
}
