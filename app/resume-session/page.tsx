import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import ResumeSessionStickyFooter from "@/components/ResumeSessionStickyFooter";
import PageAnalytics from "@/components/PageAnalytics";
import TrackedLink from "@/components/TrackedLink";
import ReviewsSection from "./ReviewsSection";

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
    question: "Why is resume important for core job interviews?",
  },
  {
    number: "02",
    question: "What should a core electronics resume contain?",
  },
  {
    number: "03",
    question: "Can I use AI to generate my core electronics interview resume?",
  },
  {
    number: "04",
    question: "Should I list all my projects in my core electronics job resume?",
  },
  {
    number: "05",
    question: "Should I create an eye-catching resume for core electronics interview ?",
  },
];

function SessionDetails() {
  const details = [
    {
      label: "Date",
      value: "Sunday, August 9, 2026",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Time",
      value: "11 AM to 1 PM IST",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "For Students",
      value: "1st Year to Final Year",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M7 12.5V17c2.8 2 7.2 2 10 0v-4.5M21 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "After-session Support",
      value: "Doubts Cleared on WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 9.5c.6 2.2 1.8 3.4 4 4l1.2-1.1c.2-.2.5-.2.8-.1l2 .9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex min-h-[116px] items-center gap-3 rounded-2xl border border-[#0A3D1F]/10 bg-white px-3 py-4 text-left shadow-[0_12px_34px_rgba(10,61,31,0.08)] md:min-h-[138px] md:gap-5 md:px-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A3D1F] p-3 text-white md:h-16 md:w-16 md:rounded-2xl md:p-4">
              {detail.icon}
            </span>
            <span className="min-w-0">
              <span className="mb-1 block text-xs font-medium text-muted md:text-lg">
                {detail.label}
              </span>
              <strong className="block font-display text-sm font-extrabold leading-snug text-text md:text-xl">
                {detail.value}
              </strong>
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-7 overflow-visible rounded-2xl bg-gradient-to-r from-[#F6B900] to-[#FFD86B] px-5 pb-6 pt-10 text-center shadow-[0_16px_40px_rgba(10,61,31,0.12)] md:mt-9 md:px-8 md:pb-8 md:pt-12">
        <span className="absolute -top-4 left-5 inline-flex items-center gap-2 rounded-xl bg-[#0A3D1F] px-4 py-2 font-display text-sm font-extrabold text-white shadow-md md:left-8 md:text-base">
          <span className="h-3 w-3 rounded-full bg-white" />
          LIVE ONLINE SESSION
        </span>
        <h2 className="font-display text-xl font-extrabold leading-tight text-text md:text-3xl">
          Build a Resume for Core Electronics Jobs
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#253A31] md:text-lg">
          Learn how to prepare a focused resume from 1st year to final year.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
          <CtaButton location="hero_details" />
          <p className="text-sm font-medium text-[#253A31] md:text-base">
            One-time registration. No hidden charges.
          </p>
        </div>
      </div>
    </div>
  );
}

function CtaButton({ location }: { location: string }) {
  return (
    <TrackedLink
      href={CHECKOUT_URL}
      event="resume_enroll_click"
      params={{
        location,
        price: PRICE,
        currency: "INR",
        page: "resume-session",
      }}
      metaStdEvent="InitiateCheckout"
      metaStdParams={{
        content_name: "Resume Session",
        value: PRICE,
        currency: "INR",
      }}
      className="inline-block rounded-full border-2 border-text bg-cta px-8 py-4 font-display text-lg font-bold text-black transition-colors hover:bg-text hover:text-white"
    >
      Enroll Now for Rs. {PRICE}
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sessionSchema) }}
      />

      <PageAnalytics
        page="resume-session"
        contentName="Resume Session: Master the Art of Crafting an Outstanding Resume"
        contentCategory="Workshop"
      />

      {/* Hero */}
<section className="mx-auto max-w-3xl px-6 pb-8 pt-8 text-center md:pt-12">
  <p
    className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#B77900] md:text-base"
    style={{ fontFamily: "var(--font-inter)" }}
  >
    LIVE SESSION
  </p>

<h1
  className="mx-auto mb-6 max-w-4xl text-balance text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-[#111827] md:text-5xl lg:text-[3.6rem]"
  style={{ fontFamily: "var(--font-headline)" }}
>
  Master the Art of Crafting an{" "}
  <span className="text-[#D99A00]">
    Outstanding Resume
  </span>{" "}
  <span className="text-[#0A3D1F]">
    to Secure Core Electronics Jobs
  </span>
</h1>
  <SessionDetails />

  {/* Extra gap only after the session details */}
  <div className="mt-12 md:mt-16">
    <div className="mx-auto mb-7 max-w-2xl overflow-hidden rounded-2xl border-2 border-[#0A3D1F] bg-[#F0FDF4] text-left shadow-[0_12px_30px_rgba(10,61,31,0.10)]">
      <div className="px-5 py-5 md:px-7 md:py-6">
        <p className="text-lg font-semibold leading-relaxed text-[#111827] md:text-xl">
          The purpose of this session is to educate students from{" "}
          <span className="font-extrabold text-[#0A3D1F]">
            1st year to Final year
          </span>{" "}
          about{" "}
          <span className="font-extrabold text-[#0A3D1F]">
            resume preparation for Core Electronics Jobs.
          </span>
        </p>
      </div>

      <div className="border-t border-[#0A3D1F]/15 bg-white px-5 py-3 md:px-7">
        <p className="text-sm font-semibold text-[#374151] md:text-base">
          By{" "}
          <span className="font-extrabold text-[#111827]">
            Balajee Seshadri
          </span>
          ,{" "}
          <span className="font-extrabold text-[#0A3D1F]">
            40+ years in the Electronics Industry
          </span>
        </p>
      </div>
    </div>
  </div>
</section>

      {/* For Whom */}
      <section className="max-w-3xl mx-auto px-6 py-10 md:py-12">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text text-center mb-2">
          Who Is This Session For?
        </h2>
        <div className="w-16 h-1 bg-amber rounded-full mx-auto mb-8" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            <>
              <strong>First year and second year students</strong> who want to
              understand what a <strong>strong resume</strong> looks like early
            </>,
            <>
              <strong>Pre-final and final year students</strong> preparing for{" "}
              <strong>core electronics placements</strong>
            </>,
            <>
              Students applying to{" "}
              <strong>
                embedded systems, semiconductor, or core electronics companies
              </strong>
            </>,
            <>
              Students who have <strong>never written a resume for a core role</strong>{" "}
              and do not know where to start
            </>,
          ].map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border-2 border-[#111827] bg-white px-5 py-5 shadow-[0_8px_22px_rgba(17,24,39,0.06)]"
            >
              <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber" />
              <p className="text-base font-medium leading-relaxed text-[#111827] md:text-lg [&_strong]:font-extrabold [&_strong]:text-[#0A3D1F]">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-surface border-y border-line py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text text-center mb-2">
            What This Session Covers
          </h2>
          <div className="w-16 h-1 bg-amber rounded-full mx-auto mb-8" />
          <div className="flex flex-col gap-5">
            {topics.map((topic) => (
              <div
                key={topic.number}
                className="rounded-xl border-2 border-text bg-white px-6 py-5 flex gap-5 items-start"
              >
                <span className="font-display font-extrabold text-3xl text-line shrink-0 leading-none mt-0.5">
                  {topic.number}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-text">
                    {topic.question}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="grid items-start gap-8 md:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-[#16A34A]">
                <Image
                  src="/images/balajee-casual.png"
                  alt="Balajee Seshadri"
                  fill
                  sizes="192px"
                  quality={80}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#16A34A]">
                Meet the Instructor
              </p>

              <h2
                className="mb-4 font-bold text-[#111827]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 4vw, 34px)",
                }}
              >
                Balajee Seshadri
              </h2>

              <p className="mb-5 leading-relaxed text-[#4B5563]">
                Balajee Seshadri guides students on electronics careers,
                fundamentals, internships, and interviews. Direct,
                fundamentals first, no shortcuts.
              </p>

              <ul className="mb-6 grid gap-3 sm:grid-cols-2">
                {[
                  "40+ years of industry experience",
                  "Worked across India, USA, Germany, and Canada",
                  "57,000+ followers on LinkedIn",
                  "No job promises, no shortcuts",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 shrink-0 text-[#16A34A]"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12l5 5 9-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-sm font-medium text-[#111827]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <CtaButton location="instructor" />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* Final CTA */}
      <section className="bg-surface border-t border-line py-12 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text mb-3">
            Build a Resume That Gets You Noticed
          </h2>
          <p className="text-base text-muted leading-relaxed mb-6">
            Live online session on Sunday, August 9, 2026, 11 AM to 1 PM IST.
          </p>
          <CtaButton location="final_cta" />
          <p className="text-sm text-muted mt-3">Rs. {PRICE}, one-time registration.</p>
        </div>
      </section>

      <Footer />
      <ResumeSessionStickyFooter />
    </main>
  );
}