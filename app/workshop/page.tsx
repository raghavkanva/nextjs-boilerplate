import type { Metadata } from "next";
import PageAnalytics from "@/components/PageAnalytics";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Workshops | eTalVis",
  description:
    "Live online workshops by Balajee Seshadri. Practical, focused sessions for core electronics students. Next session: Resume Preparation for Core Electronics Jobs. Sunday, August 16, 2026.",
  openGraph: {
    title: "Workshops | eTalVis",
    description:
      "Live online workshops by Balajee Seshadri. Focused sessions for core electronics students.",
    url: "https://courses.etalvis.com/workshop",
    siteName: "eTalVis",
    images: [{ url: "https://courses.etalvis.com/images/icon.png", width: 512, height: 512 }],
    type: "website",
    locale: "en_IN",
  },
  alternates: { canonical: "https://courses.etalvis.com/workshop" },
};

export default function WorkshopPage() {
  return (
    <main>
      <PageAnalytics page="workshop" contentName="eTalVis Workshops" contentCategory="Workshop" />

      {/* Header */}
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-10 text-center sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-surfaceRaised px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber">
          Live Online Sessions
        </div>
        <h1 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
          Workshops by{" "}
          <span className="text-ember">Balajee Seshadri</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Focused live sessions for core electronics students. Real problems, direct answers, no fluff.
        </p>
      </section>

      {/* Session cards */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:px-6">
        {/* Resume Session card */}
        <a
          href="/resume-session"
          className="group relative flex flex-col overflow-hidden rounded-[28px] border-2 border-[#0A3D1F] shadow-[0_8px_32px_rgba(10,61,31,0.18)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,61,31,0.26)] active:translate-y-0"
        >
          {/* Thumbnail */}
          <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A3D1F] via-[#145A32] to-[#0A3D1F] sm:h-64">
            {/* Decorative glows */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

            {/* Document visual */}
            <div className="relative flex flex-col items-center gap-4">
              {/* Resume icon composition */}
              <div className="relative">
                <div className="flex h-28 w-20 flex-col gap-1.5 rounded-lg border-2 border-white/30 bg-white/10 px-3 py-3 backdrop-blur-sm sm:h-32 sm:w-24">
                  {/* Header line */}
                  <div className="h-2.5 w-14 rounded-full bg-[#FFC400]" />
                  <div className="h-1.5 w-10 rounded-full bg-white/40" />
                  <div className="mt-1 space-y-1">
                    <div className="h-1 w-full rounded-full bg-white/25" />
                    <div className="h-1 w-5/6 rounded-full bg-white/20" />
                    <div className="h-1 w-4/5 rounded-full bg-white/20" />
                  </div>
                  <div className="mt-0.5 space-y-1">
                    <div className="h-1 w-full rounded-full bg-white/25" />
                    <div className="h-1 w-3/4 rounded-full bg-white/20" />
                  </div>
                  {/* Checkmark badge */}
                  <div className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0A3D1F] bg-[#FFC400]">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="#0A3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-[#FFC400] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0A3D1F]">
                Live Online Session
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-4 bg-white px-6 py-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Upcoming
                </span>
                <span className="text-xs font-semibold text-muted">Sunday, August 16, 2026 · 11 AM–1 PM IST</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                Resume Preparation for Core Electronics Jobs
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                A focused 2-hour live session on building a resume that works for core electronics roles. Led by Balajee Seshadri — direct feedback, no generic templates.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "Why your resume gets ignored by core companies",
                "What a core electronics resume must contain",
                "Using AI for your resume — what works, what doesn't",
                "Project selection: which projects to list",
                "Should you use a fancy design?",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-col items-start gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-display text-3xl font-black text-slate-950">₹80</span>
                <span className="ml-2 text-sm text-slate-500">per seat · limited capacity</span>
              </div>
              <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-950 bg-[#FFC400] px-7 text-sm font-black text-slate-950 shadow-[0_3px_0_#0f172a] transition group-hover:-translate-y-0.5 group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:shadow-none">
                Register — ₹80
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </a>

        <p className="mt-6 text-center text-sm text-muted">
          More workshops will be announced. Follow{" "}
          <a href="https://www.linkedin.com/in/balajeeseshadri/" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber hover:underline">
            Balajee Seshadri on LinkedIn
          </a>{" "}
          to stay updated.
        </p>
      </section>

      <Footer />
    </main>
  );
}
