import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import PlatformFeatures from "@/components/PlatformFeatures";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import PromoBannerSlider from "@/components/PromoBannerSlider";
import CourseHeroSection from "@/components/CourseHeroSection";
import StickyExploreBar from "@/components/StickyExploreBar";
import TrackedLink from "@/components/TrackedLink";
import PageAnalytics from "@/components/PageAnalytics";
import PremiumProgramCards from "@/components/PremiumProgramCards";
import InstructorStrip from "@/components/InstructorStrip";

import { testimonialsTop } from "@/data/content";

function IndependenceOfferStrip() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-8 sm:px-6">
      <TrackedLink
        href="/independence-offer"
        event="independence_offer_strip_click"
        params={{
          page: "home",
          offer_code: "INDIA_80TH_INDEPENDENCE_DAY",
        }}
        className="group relative block overflow-hidden rounded-[24px] border border-amber-400/50 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 px-5 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.01)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)] sm:px-7 sm:py-6"
      >
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber-200/60 blur-3xl"
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber-700">
              Independence Day Offer
            </p>

            <h2 className="font-display text-xl font-black leading-tight text-slate-950 sm:text-2xl">
              Pay Only 80% on All Plans
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-slate-700 sm:text-base">
              Use code{" "}
              <span className="font-mono font-black text-slate-950">
                INDIA_80TH_INDEPENDENCE_DAY
              </span>
              <span className="hidden sm:inline">
                {" "}
                · Valid until August 15, 2026
              </span>
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-600 sm:hidden">
              Valid until August 15, 2026
            </p>
          </div>

          <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border-2 border-slate-950 bg-amber-300 px-5 text-sm font-black text-slate-950 shadow-[0_4px_0_#0f172a] transition group-hover:-translate-y-0.5 group-hover:bg-amber-200 group-active:translate-y-1 group-active:shadow-none sm:self-center">
            See Offer

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </TrackedLink>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <PageAnalytics
        page="home"
        contentName="eTalVis Home"
        contentCategory="Landing Page"
      />

      <PromoBannerSlider />

      <Hero />

      <CourseHeroSection />

      {/* Premium aligned resume-session and embedded-program cards */}
      <PremiumProgramCards />

      <InstructorStrip />

      <TestimonialSlider
        items={testimonialsTop}
        heading="What Our Students Are Saying"
      />

      <WhoIsThisFor />

      <IndependenceOfferStrip />

      <PlatformFeatures />

      <FAQ />

      <AssessmentNote />

      <FinalCta href="/embedded-systems#plans" />

      <Footer />

      <StickyExploreBar />
    </main>
  );
}