import Hero from "@/components/Hero";
import CopyCode from "@/components/CopyCode";
import TestimonialSlider from "@/components/TestimonialSlider";
import PlatformFeatures from "@/components/PlatformFeatures";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import PromoBannerSlider from "@/components/PromoBannerSlider";
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
        href="/courses"
        event="independence_offer_strip_click"
        params={{
          page: "home",
          offer_code: "INDIA_80TH_INDEPENDENCE_DAY",
        }}
        className="group relative block overflow-hidden rounded-[24px] border border-[#FFC400]/40 bg-[#78350F] px-5 py-5 shadow-[0_16px_45px_rgba(120,53,15,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(120,53,15,0.35)] sm:px-7 sm:py-6"
      >
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber-200">
              Independence Day Offer
            </p>

            <h2 className="font-display text-xl font-black leading-tight text-white sm:text-2xl">
              Get 20% Discount on All Plans
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-white/80 sm:text-base">
              Use code{" "}
              <CopyCode code="INDIA_80TH_INDEPENDENCE_DAY" className="text-[#FFC400] hover:text-amber-300" />
              <span className="hidden sm:inline">
                {" "}
                · Valid until August 31, 2026
              </span>
            </p>

            <p className="mt-1 text-xs font-semibold text-white/60 sm:hidden">
              Valid until August 31, 2026
            </p>
          </div>

          <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border-2 border-[#FFC400] bg-[#FFC400] px-5 text-sm font-black text-[#78350F] shadow-[0_4px_0_rgba(0,0,0,0.3)] transition group-hover:-translate-y-0.5 group-hover:bg-amber-300 group-active:translate-y-1 group-active:shadow-none sm:self-center">
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

      <FinalCta href="/courses#plans" />

      <Footer />

      <StickyExploreBar />
    </main>
  );
}