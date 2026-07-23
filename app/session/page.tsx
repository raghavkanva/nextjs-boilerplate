import Hero from "@/components/Hero";
import SessionDetails from "@/components/SessionDetails";
import InstructorStrip from "@/components/InstructorStrip";
import MythBusting from "@/components/MythBusting";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import RegisterAndWhatYouGet from "@/components/RegisterAndWhatYouGet";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { sessionOffer, sessionAudience, sessionFaqs } from "@/data/content";

export const metadata = {
  title: "Demystifying the Myths of the Core Electronics Industry Career",
  description:
    "Live online session for EEE, ECE, EIE, BME, and Mechatronics students. Register for Rs. 99 and get a free Starter plan worth Rs. 999.",
};

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
      <WhoIsThisFor items={sessionAudience} heading="Who Is This For?" />
      <RegisterAndWhatYouGet />
      <FAQ items={sessionFaqs} heading="Questions Before You Register" />
      <Footer />
    </main>
  );
}