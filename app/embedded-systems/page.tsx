import type { Metadata } from "next";
import CourseCarousel from "@/components/CourseCarousel";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import PlansGrid from "@/components/Plans";
import Prerequisites from "@/components/Prerequisites";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import InstructorStrip from "@/components/InstructorStrip";
import { testimonialsBottom, plans } from "@/data/content";

export const metadata: Metadata = {
  title: "Embedded Systems Foundation Mastery Program | eTalVis",
  description:
    "Online embedded systems course for beginners in India. 10 foundation courses taught by a 40+ year industry veteran. Self-paced, doubts cleared directly on WhatsApp. courses.etalvis.com",
  keywords: [
    "embedded systems course",
    "embedded systems foundation",
    "electronics foundation course",
    "C programming embedded systems",
    "ARM microcontroller course",
    "8085 microprocessor",
    "eTalVis",
    "Balajee Seshadri",
    "embedded systems online course India",
    "electronics career guidance",
  ],
  openGraph: {
    title: "Embedded Systems Foundation Mastery Program | eTalVis",
    description:
      "10 self-paced foundation courses covering everything from electronics basics to ARM and networking. Taught by Balajee Seshadri, 40+ years of industry experience.",
    url: "https://courses.etalvis.com/embedded-systems",
    siteName: "eTalVis",
    images: [
      {
        url: "https://courses.etalvis.com/images/icon.png",
        width: 512,
        height: 512,
        alt: "eTalVis Embedded Systems Foundation Mastery Program",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Embedded Systems Foundation Mastery Program | eTalVis",
    description:
      "10 self-paced foundation courses. Taught by Balajee Seshadri, 40+ years in the Electronics Industry. Doubts cleared on WhatsApp.",
    images: ["https://courses.etalvis.com/images/icon.png"],
  },
  alternates: {
    canonical: "https://courses.etalvis.com/embedded-systems",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Embedded Systems Foundation Mastery Program",
  description:
    "10 self-paced foundation courses covering electronics, C programming, embedded hardware, embedded software, interface protocols, microprocessor internals, ARM, 8085, and networking concepts. Taught by Balajee Seshadri with 40+ years in the Electronics Industry.",
  url: "https://courses.etalvis.com/embedded-systems",
  provider: {
    "@type": "EducationalOrganization",
    name: "eTalVis",
    sameAs: "https://etalvis.com",
  },
  instructor: {
    "@type": "Person",
    name: "Balajee Seshadri",
    sameAs: "https://www.linkedin.com/in/balajeeseshadri/",
    description:
      "40+ years in the Electronics Industry. Work across India, USA, Germany, and Canada. 55,000+ LinkedIn followers.",
  },
  courseMode: "Online",
  educationalLevel: "Beginner to Intermediate",
  inLanguage: "en",
  isAccessibleForFree: false,
  hasCourseInstance: plans.map((plan) => ({
    "@type": "CourseInstance",
    courseMode: "online",
    name: `${plan.name} access`,
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: plan.checkoutUrl,
    },
  })),
};

function ProgramHero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-8 pb-6 md:pt-10 md:pb-8 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-amber/40 text-amber text-sm font-semibold mb-4">
        eTalVis Program
      </div>
      <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.2] mb-4 text-text">
        Embedded Systems{" "}
        <span className="text-amber">Foundation Mastery Program</span>
      </h1>
      <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-muted leading-relaxed">
        10 self-paced foundation courses built for ECE and EEE students who want real understanding, not just certificates. Electronics, C programming, embedded hardware, embedded software, protocols, microprocessor internals, ARM, 8085, and networking.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm md:text-base text-muted mb-6">
        <span className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
          </svg>
          Pre-recorded, self-paced
        </span>
        <span className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
            <path d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Doubts cleared on WhatsApp
        </span>
        <span className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
            <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          10,000+ students enrolled
        </span>
      </div>
      <a
        href="#plans"
        className="inline-block px-8 py-4 rounded-full bg-cta text-black border-2 border-text font-display font-bold text-lg hover:bg-text hover:text-white transition-colors"
      >
        Enroll Today
      </a>
      <p className="text-xs text-muted mt-4">
        Hosted at{" "}
        <a href="https://courses.etalvis.com" className="underline hover:text-amber transition-colors">
          courses.etalvis.com
        </a>
      </p>
    </section>
  );
}

export default function EmbeddedSystemsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <ProgramHero />
      <WhoIsThisFor />
      <InstructorStrip />
      <CourseCarousel />
      <Prerequisites />
      <PlansGrid
        id="plans"
        heading="Choose How Long You Want Access"
        subline="Same 10 courses in every plan. Pick the timeframe that fits how you learn."
      />
      <TestimonialSlider
        items={testimonialsBottom}
        heading="Real Stories. Real Results."
      />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
    </main>
  );
}
