"use client";

import { track } from "@/lib/analytics";

const STARTER_PACK_URL = "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48";

type Props = {
  starterPrice: number;
};

export default function CoursesOptionCards({ starterPrice }: Props) {
  return (
    <div className="flex flex-col gap-5">

      {/* ── Embedded Starter Pack — featured row ── */}
      <a
        href="/embedded-starter-pack"
        onClick={() => track("courses_option_click", { option: "starter_pack", page: "courses" })}
        className="group relative flex flex-col overflow-hidden rounded-[28px] border-2 border-[#111827] shadow-[0_8px_32px_rgba(17,24,39,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,24,39,0.20)] active:translate-y-0 sm:flex-row"
        style={{ background: "#F8F8F4" }}
      >
        {/* Left accent block — product identity focus */}
        <div
          className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden sm:h-auto sm:w-56"
          style={{ background: "#ECFDF3" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-200/50 blur-2xl" />
          <div className="relative flex flex-col items-start gap-1.5 px-6 py-6">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em] font-medium"
              style={{ color: "#15803D" }}
            >
              eTalVis
            </span>
            <span
              className="font-display text-[17px] font-extrabold leading-tight"
              style={{ color: "#111827" }}
            >
              Embedded<br />Starter Pack
            </span>
            <div className="mt-1 flex flex-col gap-0.5">
              <span className="font-mono text-[10px]" style={{ color: "#4B5563" }}>Electronics +</span>
              <span className="font-mono text-[10px]" style={{ color: "#4B5563" }}>C Programming</span>
            </div>
            <span
              className="mt-2 font-display font-bold text-[15px]"
              style={{ color: "#111827" }}
            >
              ₹239
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 px-6 py-6">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.14em] font-medium"
              style={{ color: "#16A34A" }}
            >
              Embedded Starter Pack
            </p>
            <h2 className="mt-1 font-display text-xl font-black leading-tight text-[#111827]">
              Every Electronics Engineering Student&apos;s First Step Starts Here.
            </h2>
            <p className="mt-2 text-sm leading-5 text-[#4B5563]">
              Electronics Foundation Course + C Programming Foundation Course. The two foundations Embedded Systems begins with.
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-[#4B5563]">
            {[
              "01 Electronics Foundation Course",
              "02 C Programming Foundation Course",
              "For ECE, EEE, EIE, Mechatronics, Electrical & related branches",
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

          <div className="mt-auto pt-2 flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-full border-2 border-[#111827] px-6 py-2.5 text-sm font-black text-[#111827] shadow-[0_3px_0_#111827] transition group-hover:-translate-y-0.5 group-hover:bg-[#F4B800] group-active:translate-y-0.5 group-active:shadow-none"
              style={{ background: "#FFC400" }}
            >
              Start Here · ₹239
            </span>
            <span className="text-xs text-[#6B7280]">2 months access</span>
          </div>
        </div>
      </a>

      {/* ── Existing two cards ── */}
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
    </div>
  );
}
