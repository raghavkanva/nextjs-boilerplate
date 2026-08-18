"use client";

import { ArrowRight } from "lucide-react";

const EMBEDDED_PROGRAM_URL = "https://courses.etalvis.com/courses";

const programStats = [
  { value: "10", label: "Foundation Courses" },
  { value: "10,000+", label: "Students Enrolled" },
  { value: "40+", label: "Years of Experience" },
  { value: "57,000+", label: "LinkedIn Followers" },
];

export default function PremiumProgramCards() {
  return (
    <section className="relative bg-white py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6">

        {/* Embedded systems card */}
        <a
          href={EMBEDDED_PROGRAM_URL}
          className="group relative flex flex-col overflow-hidden rounded-[24px] border-2 border-slate-950 shadow-[0_8px_32px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.18)] active:translate-y-0"
        >
          {/* Top band */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0A3D1F] via-[#145A32] to-[#0A3D1F] px-6 py-7 sm:px-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-emerald-300">
                  eTalVis Program
                </span>
                <h2 className="mt-3 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
                  Embedded Systems Foundation Course
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                  10 foundation courses covering electronics, C programming, embedded hardware, embedded software, protocols, microprocessor internals, ARM, 8085, and networking.
                </p>
              </div>
              <span className="inline-flex shrink-0 w-fit items-center gap-2 rounded-xl border-2 border-white/20 bg-[#FFC400] px-5 py-2.5 text-sm font-black text-slate-950 shadow-[0_3px_0_rgba(0,0,0,0.4)] transition group-hover:-translate-y-0.5 group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:shadow-none">
                See Plans
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 bg-white sm:grid-cols-4 sm:divide-y-0">
            {programStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center px-4 py-4 text-center">
                <p className="font-display text-2xl font-black text-[#0A3D1F]">{value}</p>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          {/* Features strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 bg-white px-6 py-3.5 sm:justify-start">
            {["Self-paced learning", "Beginner-friendly", "WhatsApp doubt support", "Pre-recorded · watch anytime"].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
