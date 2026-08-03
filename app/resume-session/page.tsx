import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import ResumeSessionStickyFooter from "@/components/ResumeSessionStickyFooter";
import PageAnalytics from "@/components/PageAnalytics";
import TrackedLink from "@/components/TrackedLink";
import TopicsAccordion from "./TopicsAccordion";

export const metadata: Metadata = {
  title: "Master the Art of Crafting an Outstanding Resume | eTalVis",
  description:
    "A live online session by Balajee Seshadri on building a resume that gets core electronics companies to call. Sunday, August 9, 2026, 11 AM to 1 PM IST. Rs. 80.",
  keywords: [
    "resume for core electronics jobs",
    "electronics resume tips",
    "how to write resume for embedded systems",
    "core electronics job resume",
    "ECE resume guidance",
    "Balajee Seshadri resume session",
    "eTalVis",
  ],
  openGraph: {
    title: "Master the Art of Crafting an Outstanding Resume | eTalVis",
    description:
      "Live online session by Balajee Seshadri. Sunday, August 9, 2026, 11 AM to 1 PM IST. Build a resume that gets core electronics companies to call. Rs. 80.",
    url: "https://courses.etalvis.com/resume-session",
    siteName: "eTalVis",
    images: [
      {
        url: "https://courses.etalvis.com/images/icon.png",
        width: 512,
        height: 512,
        alt: "eTalVis Resume Session",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master the Art of Crafting an Outstanding Resume | eTalVis",
    description:
      "Live online session. Sunday, August 9, 2026, 11 AM – 1 PM IST. Build a resume that gets core electronics companies to call. Rs. 80.",
    images: ["https://courses.etalvis.com/images/icon.png"],
  },
  alternates: {
    canonical: "https://courses.etalvis.com/resume-session",
  },
};

const CHECKOUT_URL = "https://learn.etalvis.com/web/checkout/6a705fab512af2dc942ae7d6";
const PRICE = 80;

const topics = [
  {
    number: "01",
    question: "Why Resume is important",
    body: "The resume is not just a document. For core electronics roles, it is the first filter. Understanding why it matters, and what it signals to a recruiter, changes how you approach building one.",
  },
  {
    number: "02",
    question: "What should it contain?",
    body: "What belongs in a core electronics resume is different from what general advice tells you. Learn what recruiters in embedded systems and semiconductor companies actually look for.",
  },
  {
    number: "03",
    question: "Can I use AI to generate my Resume?",
    body: "AI tools can help, but knowing when to use them, what to verify, and where they mislead you is the part no one talks about. This session covers it directly.",
  },
  {
    number: "04",
    question: "Should I list all my projects in Resume?",
    body: "Listing everything is not the same as listing the right things. Learn how to decide which projects to include, how to describe them, and what signals they send to a core company.",
  },
  {
    number: "05",
    question: "Should I create an Eye catching resume?",
    body: "Design matters less than most students think. What the resume says and how it is structured matters more. This covers the right balance for core electronics applications.",
  },
];

const audience = [
  "First year and second year students who want to understand what a strong resume looks like early",
  "Pre-final and final year students preparing for core electronics placements",
  "Students applying to embedded systems, semiconductor, or core electronics companies",
  "Students who have never written a resume for a core role and don't know where to start",
];

function GridBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#16A34A] shrink-0">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnrollCta({ location }: { location: string }) {
  return (
    <TrackedLink
      href={CHECKOUT_URL}
      event="resume_enroll_click"
      params={{ location, price: PRICE, currency: "INR", page: "resume-session" }}
      metaStdEvent="InitiateCheckout"
      metaStdParams={{ content_name: "Resume Session", value: PRICE, currency: "INR" }}
      className="inline-block px-8 py-4 rounded-full bg-[#FFC400] text-black border-2 border-[#111827] font-bold text-lg hover:bg-[#111827] hover:text-white transition-colors"
    >
      Enroll Now — Rs. {PRICE}
    </TrackedLink>
  );
}

export default function ResumeSessionPage() {
  const sessionSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Master the Art of Crafting an Outstanding Resume to Secure Core Electronics Jobs",
    description:
      "Live online session by Balajee Seshadri covering why resume matters, what to include, AI usage, project listing, and resume design for core electronics job applications.",
    url: "https://courses.etalvis.com/resume-session",
    startDate: "2026-08-09T11:00:00+05:30",
    endDate: "2026-08-09T13:00:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    organizer: {
      "@type": "EducationalOrganization",
      name: "eTalVis",
      sameAs: "https://courses.etalvis.com",
    },
    performer: {
      "@type": "Person",
      name: "Balajee Seshadri",
      sameAs: "https://www.linkedin.com/in/balajeeseshadri/",
    },
    offers: {
      "@type": "Offer",
      price: PRICE,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: CHECKOUT_URL,
    },
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sessionSchema) }}
      />

      <PageAnalytics
        page="resume-session"
        contentName="Resume Session: Master the Art of Crafting an Outstanding Resume"
        contentCategory="Workshop"
      />

      {/* ── Hero ── */}
      <section className="relative bg-white pt-10 md:pt-14 pb-14 md:pb-16 overflow-hidden">
        <GridBg />
        <div className="relative max-w-[1100px] mx-auto px-6">

          {/* Eyebrow + heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16A34A] text-white text-sm font-bold uppercase tracking-wide mb-5">
              eTalVis Session
            </span>
            <h1
              className="font-bold text-[#111827] leading-[1.15] mb-0 max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Master the Art of Crafting an{" "}
              <span className="text-[#16A34A]">Outstanding Resume</span>{" "}
              <span className="text-[#0A3D1F]">to Secure Core Electronics Jobs</span>
            </h1>
          </div>

          {/* Two-column */}
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-center max-w-[950px] mx-auto">

            {/* Left: instructor identity */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#16A34A] mb-5">
                <Image
                  src="/images/balajee-casual.png"
                  alt="Balajee Seshadri"
                  fill
                  sizes="256px"
                  priority
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-[#111827] text-xl md:text-2xl">Balajee Seshadri</p>
              <p className="text-[#4B5563] text-base mt-1">40+ years in the Electronics Industry</p>
              <p className="text-[#16A34A] font-bold text-base mt-1">57,000+ LinkedIn followers</p>
            </div>

            {/* Right: session card */}
            <div className="rounded-2xl border-2 border-[#16A34A] bg-[#F0FDF4] p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#16A34A] text-white text-sm font-bold uppercase mb-5">
                Live Online Session
              </span>
              <p className="text-[#111827] text-base md:text-lg leading-relaxed mb-6">
                The purpose of this session is to educate students from 1st year to Final year about Resume preparation for Core Electronics Jobs.
              </p>
              <ul className="flex flex-col gap-3 mb-7">
                {[
                  "Sunday, August 9, 2026",
                  "11 AM – 1 PM IST",
                  "Doubts cleared directly on WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-[#111827] font-medium">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <EnrollCta location="hero" />
              <p className="text-[#4B5563] text-base text-center mt-3">
                Rs. {PRICE} — one-time registration. No hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
        <GridBg />
        <div className="relative max-w-[1100px] mx-auto px-6">
          <h2
            className="font-bold text-[#111827] text-center mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)" }}
          >
            Who Is This Session For?
          </h2>
          <div className="w-16 h-1 bg-[#16A34A] rounded-full mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 gap-5 max-w-[880px] mx-auto">
            {audience.map((point, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-[#111827] bg-white px-6 py-5 flex items-start gap-4"
              >
                <CheckIcon />
                <p className="text-base md:text-lg text-[#4B5563] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What This Session Covers ── */}
      <section className="relative bg-white py-12 md:py-16 overflow-hidden">
        <GridBg />
        <div className="relative max-w-[900px] mx-auto px-6">
          <h2
            className="font-bold text-[#111827] text-center mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)" }}
          >
            What This Session Covers
          </h2>
          <div className="w-16 h-1 bg-[#16A34A] rounded-full mx-auto mb-10" />
          <TopicsAccordion topics={topics} />
          <div className="text-center mt-10">
            <EnrollCta location="topics" />
          </div>
        </div>
      </section>

      {/* ── Instructor ── */}
      <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
        <GridBg />
        <div className="relative max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">

            {/* Photo */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#16A34A]">
                <Image
                  src="/images/balajee-casual.png"
                  alt="Balajee Seshadri"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-[#16A34A] font-bold text-sm uppercase tracking-wide mb-2">
                Meet the Instructor
              </p>
              <h2
                className="font-bold text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 34px)" }}
              >
                Balajee Seshadri
              </h2>
              <p className="text-[#4B5563] text-base md:text-lg leading-relaxed mb-6">
                Balajee Seshadri guides students on electronics careers, fundamentals, internships, and interviews. Direct, fundamentals first, no shortcuts.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-7">
                {[
                  "40+ years of industry experience",
                  "Work across India, USA, Germany, and Canada",
                  "57,000+ followers on LinkedIn",
                  "No job promises, no shortcuts",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-[#111827] text-base font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <EnrollCta location="instructor" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative bg-white py-14 md:py-20 overflow-hidden">
        <GridBg />
        <div className="relative max-w-[800px] mx-auto px-6 text-center">
          <h2
            className="font-bold text-[#111827] mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Build a Resume That Gets You Noticed
          </h2>
          <p className="text-[#4B5563] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Live online session on Sunday, August 9, 2026, 11 AM to 1 PM IST. Doubts cleared directly on WhatsApp by Balajee Seshadri.
          </p>
          <div className="rounded-2xl border-2 border-[#111827] bg-[#F0FDF4] p-6 mb-8 max-w-md mx-auto text-left">
            {[
              "Live session — ask questions in real time",
              "Sunday, August 9, 2026 · 11 AM – 1 PM IST",
              "Doubts cleared on WhatsApp after the session",
              "Rs. 80 — one-time, no subscriptions",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-3 last:mb-0">
                <CheckIcon />
                <span className="text-[#111827] text-base font-medium">{item}</span>
              </div>
            ))}
          </div>
          <EnrollCta location="final_cta" />
          <p className="text-[#4B5563] text-base mt-4">Rs. {PRICE} — one-time registration.</p>
        </div>
      </section>

      <Footer />
      <ResumeSessionStickyFooter />
    </main>
  );
}
