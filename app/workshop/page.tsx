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

      {/* Back nav */}
      <div className="mx-auto max-w-4xl px-4 pt-5 sm:px-6">
        <a href="/courses" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-muted transition hover:bg-surfaceRaised hover:text-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Courses
        </a>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-5 text-center sm:px-6 sm:pt-7">
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

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:px-6">
        <p className="text-center text-sm text-muted">
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
