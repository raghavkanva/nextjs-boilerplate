import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import InstructorStrip from "@/components/InstructorStrip";
import UpcomingEvent from "@/components/UpcomingEvent";
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
import { testimonialsTop } from "@/data/content";

function ProgramCard() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <div className="rounded-2xl border-2 border-text bg-white p-6 md:p-8">
        <p className="text-sm font-semibold text-amber uppercase tracking-wide mb-2">
          eTalVis Program
        </p>
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text mb-3 leading-snug">
          Embedded Systems Foundation Mastery Program
        </h2>
        <p className="text-base md:text-lg text-muted leading-relaxed mb-6">
          10 foundation courses covering electronics, C programming, embedded hardware, embedded software, protocols, microprocessor internals, ARM, 8085, and networking. Self-paced. Doubts cleared directly on WhatsApp.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { value: "10", label: "Foundation Courses" },
            { value: "10,000+", label: "Students Enrolled" },
            { value: "40+", label: "Years of Experience" },
            { value: "57,000+", label: "LinkedIn Followers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-extrabold text-2xl text-amber">{stat.value}</div>
              <div className="text-xs text-muted mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <TrackedLink
            href="/embedded-systems"
            event="program_card_explore_click"
            params={{ page: "home", destination: "embedded-systems" }}
            className="inline-block px-7 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-semibold hover:bg-text hover:text-white transition-colors"
          >
            Explore Program
          </TrackedLink>
          <a
            href="https://courses.etalvis.com"
            className="text-sm text-muted underline hover:text-amber transition-colors"
          >
            courses.etalvis.com
          </a>
        </div>
      </div>
    </section>
  );
}

function IndependenceOfferStrip() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-6">
      <TrackedLink
        href="/independence-offer"
        event="independence_offer_strip_click"
        params={{ page: "home", offer_code: "INDIA_80TH_INDEPENDENCE_DAY" }}
        className="block rounded-xl border-2 border-amber bg-amber/10 px-5 py-4 hover:bg-amber/20 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-display font-bold text-text text-base md:text-lg">
              Independence Day Offer — Pay Only 80% on all plans
            </p>
            <p className="text-sm text-muted mt-0.5">
              Code: <span className="font-mono font-bold text-text">INDIA_80TH_INDEPENDENCE_DAY</span> — valid until August 15, 2026
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-text">
            See Offer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <PageAnalytics page="home" contentName="eTalVis Home" contentCategory="Landing Page" />
      <PromoBannerSlider />
      <Hero />
      <CourseHeroSection />
      <UpcomingEvent />
      <ProgramCard />
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
