"use client";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  MonitorPlay,
  Sparkles,
  Users,
} from "lucide-react";

const RESUME_SESSION_URL = "https://courses.etalvis.com/resume-session";
const EMBEDDED_PROGRAM_URL = "https://courses.etalvis.com/embedded-systems";

const programStats = [
  {
    value: "10",
    label: "Foundation Courses",
    icon: GraduationCap,
  },
  {
    value: "10,000+",
    label: "Students Enrolled",
    icon: Users,
  },
  {
    value: "40+",
    label: "Years of Experience",
    icon: Sparkles,
  },
  {
    value: "57,000+",
    label: "LinkedIn Followers",
    icon: Users,
  },
];

export default function PremiumProgramCards() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.22) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
        {/* Resume session card */}
        <article className="group relative overflow-hidden rounded-[28px] border border-emerald-950/15 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-500"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-100/80 blur-3xl"
          />

          <div className="relative grid items-center gap-7 px-6 py-8 text-center sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto] lg:text-left">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-emerald-800">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Upcoming Live Session
              </div>

              <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[34px]">
                Resume Preparation for Core Interviews
              </h2>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-700 lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-emerald-700" />
                  Sunday, August 9, 2026
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-emerald-700" />
                  11 AM to 1 PM IST
                </span>
              </div>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base lg:mx-0">
                A focused live session on building a resume that works for core
                electronics roles, led by{" "}
                <strong className="font-extrabold text-slate-900">
                  Balajee Seshadri
                </strong>
                .
              </p>
            </div>

            <a
              href={RESUME_SESSION_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-slate-950 bg-amber-300 px-6 text-sm font-black text-slate-950 shadow-[0_5px_0_#0f172a] transition hover:-translate-y-0.5 hover:bg-amber-200 active:translate-y-1 active:shadow-none sm:text-base"
            >
              See Session Details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>

        {/* Embedded systems program card */}
        <article className="group relative overflow-hidden rounded-[28px] border border-slate-950/15 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500"
          />

          <div
            aria-hidden="true"
            className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl"
          />

          <div className="relative px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-emerald-800">
                  <MonitorPlay className="h-4 w-4" aria-hidden="true" />
                  eTalVis Program
                </div>

                <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[34px]">
                  Embedded Systems Foundation Mastery Program
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  10 foundation courses covering electronics, C programming,
                  embedded hardware, embedded software, protocols,
                  microprocessor internals, ARM, 8085, and networking.
                  Self-paced, with doubts cleared directly on WhatsApp.
                </p>
              </div>

              <a
                href={EMBEDDED_PROGRAM_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-slate-950 bg-amber-300 px-6 text-sm font-black text-slate-950 shadow-[0_5px_0_#0f172a] transition hover:-translate-y-0.5 hover:bg-amber-200 active:translate-y-1 active:shadow-none sm:text-base"
              >
                Explore Program
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {programStats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-4 text-center transition group-hover:bg-white sm:px-4"
                >
                  <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <p className="font-display text-xl font-black leading-none text-emerald-700 sm:text-2xl">
                    {value}
                  </p>

                  <p className="mt-1.5 text-[10px] font-semibold leading-4 text-slate-600 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-6 sm:justify-start">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                Self-paced learning
              </span>

              <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">
                Beginner-friendly
              </span>

              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                WhatsApp doubt support
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}