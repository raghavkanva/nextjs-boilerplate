import type { Metadata } from "next";
import Footer from "@/components/Footer";

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

function DeliveryBox() {
  return (
    <div className="rounded-xl border-2 border-text bg-surface px-6 py-5 max-w-sm mx-auto text-left">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-3 text-base text-text">
          <span className="shrink-0 w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-amber">
              <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Live online session — Sunday, August 9, 2026
        </li>
        <li className="flex items-center gap-3 text-base text-text">
          <span className="shrink-0 w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-amber">
              <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          11 AM – 1 PM IST
        </li>
        <li className="flex items-center gap-3 text-base text-text">
          <span className="shrink-0 w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-amber">
              <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Doubts cleared directly on WhatsApp
        </li>
      </ul>
    </div>
  );
}

function CtaButton({ location }: { location: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      data-track-location={location}
      className="inline-block px-8 py-4 rounded-full bg-cta text-black border-2 border-text font-display font-bold text-lg hover:bg-text hover:text-white transition-colors"
    >
      Enroll Now, Rs. {PRICE}
    </a>
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

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-8 pb-8 md:pt-12 text-center">
        <p className="text-sm font-semibold text-amber uppercase tracking-wide mb-3">
          eTalVis Session
        </p>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.2] mb-4 text-text">
          Master the Art of Crafting an{" "}
          <span className="text-amber">Outstanding Resume</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed mb-2 max-w-xl mx-auto">
          To Secure Core Electronics Jobs
        </p>
        <p className="text-sm text-muted mb-6">
          By Balajee Seshadri, 40+ years in the Electronics Industry
        </p>
        <div className="mb-8">
          <DeliveryBox />
        </div>
        <CtaButton location="hero" />
        <p className="text-sm text-muted mt-3">Rs. {PRICE} — one-time registration.</p>
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
                  <h3 className="font-display font-bold text-lg text-text mb-1">
                    {topic.question}
                  </h3>
                  <p className="text-base text-muted leading-relaxed">{topic.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="max-w-2xl mx-auto px-6 py-10 text-center">
        <p className="text-sm font-semibold text-amber uppercase tracking-wide mb-2">
          Your Instructor
        </p>
        <h2 className="font-display font-bold text-xl md:text-2xl text-text mb-3">
          Balajee Seshadri
        </h2>
        <p className="text-base text-muted leading-relaxed mb-4">
          Balajee Seshadri guides students on electronics careers, fundamentals, internships, and interviews. Direct, fundamentals first, no shortcuts.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-muted text-left max-w-xs mx-auto mb-6">
          {[
            "40+ years of industry experience",
            "Work across India, USA, Germany, and Canada",
            "57,000+ followers on LinkedIn",
            "No job promises, no shortcuts",
          ].map((p, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="bg-surface border-t border-line py-12 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text mb-3">
            Build a Resume That Gets You Noticed
          </h2>
          <p className="text-base text-muted leading-relaxed mb-6">
            Live online session on Sunday, August 9, 2026, 11 AM to 1 PM IST. Doubts cleared directly on WhatsApp by Balajee Seshadri.
          </p>
          <CtaButton location="final_cta" />
          <p className="text-sm text-muted mt-3">Rs. {PRICE} — one-time registration.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
