import Hero from "@/components/Hero";
import SessionDetails from "@/components/SessionDetails";
import InstructorStrip from "@/components/InstructorStrip";
import MythBusting from "@/components/MythBusting";
import WhatYouGet from "@/components/WhatYouGet";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import DealCountdown from "@/components/DealCountdown";
import { sessionOffer, sessionAudience, sessionFaqs } from "@/data/content";

export const metadata = {
  title: "Demystifying the Myths of the Core Electronics Industry Career",
  description:
    "Live online session for EEE, ECE, EIE, BME, and Mechatronics students. Register for Rs. 99 and get a free Starter plan worth Rs. 999.",
};

function RegistrationBlock() {
  return (
    <section id="register" className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="inline-block text-sm md:text-base px-4 py-1.5 rounded-full border border-line text-amber font-mono mb-8 tracking-wide">
        registration open
      </div>

      <h2 className="font-display font-semibold text-3xl md:text-5xl leading-[1.1] mb-4 text-text">
        Register for Rs. 99
      </h2>

      <p className="text-muted mb-6">
        Includes a free Starter plan worth Rs. 999
      </p>

      <div className="max-w-xs mx-auto mb-8">
        <DealCountdown
          targetDate="2026-07-26T10:00:00"
          label="Registration closes in"
        />
      </div>

      <a href={sessionOffer.checkoutUrl}
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-bold text-lg glow-amber transition-transform hover:scale-[1.02]"
      >
        Register Now, Rs. 99
      </a>
    </section>
  );
}

export default function SessionPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: sessionOffer.title,
    startDate: "2026-07-26T11:00:00+05:30",
    endDate: "2026-07-26T13:00:00+05:30",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://courses.etalvis.com/session",
    },
    organizer: {
      "@type": "Organization",
      name: "eTalVis",
      url: "https://courses.etalvis.com",
    },
    performer: {
      "@type": "Person",
      name: "Balajee Seshadri",
      url: "https://www.linkedin.com/in/balajeeseshadri/",
    },
    offers: {
      "@type": "Offer",
      price: sessionOffer.price,
      priceCurrency: "INR",
      url: sessionOffer.checkoutUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Hero variant="session" />
      <SessionDetails />
      <InstructorStrip />
      <MythBusting />
      <WhatYouGet />
      <WhoIsThisFor items={sessionAudience} heading="Who Is This For?" />
      <RegistrationBlock />
      <FAQ items={sessionFaqs} heading="Questions Before You Register" />
      <FinalCta />
      <Footer />
    </main>
  );
}