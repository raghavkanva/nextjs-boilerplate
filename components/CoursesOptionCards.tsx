"use client";

import { track } from "@/lib/analytics";

type Props = {
  starterPrice: number;
};

export default function CoursesOptionCards({ starterPrice }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* Bundle Course card */}
      <a
        href="/embedded-systems"
        onClick={() => track("courses_option_click", { option: "bundle", page: "courses" })}
        className="group relative flex flex-col overflow-hidden rounded-[28px] border-2 border-[#0A3D1F] shadow-[0_8px_32px_rgba(10,61,31,0.18)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,61,31,0.26)] active:translate-y-0"
      >
        {/* Thumbnail */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A3D1F] via-[#145A32] to-[#0A3D1F] sm:h-52">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal-300/15 blur-2xl" />

          <div className="relative flex flex-col items-center gap-2">
            <span className="font-display text-[80px] font-black leading-none tracking-tight text-white">
              10
            </span>
            <span className="rounded-full bg-[#FFC400] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0A3D1F]">
              Foundation Courses
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 bg-white px-5 py-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#16A34A]">
              Bundle Course
            </p>
            <h2 className="mt-1 font-display text-xl font-black leading-tight text-slate-950">
              Embedded Systems Foundation Course
            </h2>
            <p className="mt-2 text-sm leading-5 text-slate-600">
              All 10 courses. Electronics, C programming, embedded hardware, protocols, ARM, 8085, and networking. One enrollment covers everything.
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600">
            {[
              `From ₹${starterPrice.toLocaleString("en-IN")} · 1 or 6 months access`,
              "Semester plan includes resume help and mock interview",
              "No-cost EMI on semester plan",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-4 w-4 shrink-0 text-[#16A34A]">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-2">
            <span className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-950 bg-[#FFC400] py-2.5 text-sm font-black text-slate-950 shadow-[0_3px_0_#0f172a] transition group-hover:-translate-y-0.5 group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:shadow-none">
              See Plans
            </span>
          </div>
        </div>
      </a>

      {/* Individual Courses card */}
      <a
        href="/individual-courses"
        onClick={() => track("courses_option_click", { option: "individual", page: "courses" })}
        className="group relative flex flex-col overflow-hidden rounded-[28px] border-2 border-slate-950 shadow-[0_8px_32px_rgba(15,23,42,0.15)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.22)] active:translate-y-0"
      >
        {/* Thumbnail */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 sm:h-52">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-slate-700/30 blur-2xl" />
          <div className="relative flex flex-col items-center gap-3">
            <svg width="72" height="60" viewBox="0 0 72 60" fill="none" aria-hidden="true">
              <rect x="14" y="44" width="44" height="8" rx="3" fill="white" fillOpacity="0.12" />
              <rect x="8" y="30" width="52" height="16" rx="4" fill="white" fillOpacity="0.17" />
              <rect x="12" y="14" width="48" height="18" rx="4" fill="white" fillOpacity="0.25" />
              <circle cx="24" cy="23" r="3.5" fill="#FFC400" fillOpacity="0.9" />
              <rect x="32" y="21" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.55" />
              <rect x="32" y="26" width="14" height="2" rx="1" fill="white" fillOpacity="0.3" />
            </svg>
            <span className="rounded-full bg-[#FFC400] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-950">
              Individual Courses
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 bg-white px-5 py-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#16A34A]">
              Individual Courses
            </p>
            <h2 className="mt-1 font-display text-xl font-black leading-tight text-slate-950">
              Pick Only What You Need
            </h2>
            <p className="mt-2 text-sm leading-5 text-slate-600">
              Courses available individually. Each course sold separately with 1-month or 3-month access.
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600">
            {[
              "₹159 / 1 month · ₹319 / 3 months per course",
              "Multiple courses to choose from",
              "Same pre-recorded, self-paced format",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-4 w-4 shrink-0 text-[#16A34A]">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-2">
            <span className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-950 bg-[#FFC400] py-2.5 text-sm font-black text-slate-950 shadow-[0_3px_0_#0f172a] transition group-hover:-translate-y-0.5 group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:shadow-none">
              See Individual Courses
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
