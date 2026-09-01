import TestimonialSlider from "@/components/TestimonialSlider";
import PlatformFeatures from "@/components/PlatformFeatures";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import PageAnalytics from "@/components/PageAnalytics";
import PremiumProgramCards from "@/components/PremiumProgramCards";
import InstructorStrip from "@/components/InstructorStrip";
import EmbeddedStarterPackHero from "@/components/EmbeddedStarterPackHero";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import { testimonialsTop } from "@/data/content";

export default function Home() {
  return (
    <main>
      <PageAnalytics
        page="home"
        contentName="eTalVis Home"
        contentCategory="Landing Page"
      />

      <EmbeddedStarterPackHero />

      <PremiumProgramCards />

      <InstructorStrip />

      <TestimonialSlider
        items={testimonialsTop}
        heading="What Our Students Are Saying"
      />

      <WhoIsThisFor />

      <PlatformFeatures />

      <FAQ />

      <AssessmentNote />

      <FinalCta href="/courses#plans" />

      <Footer />

      <WhatsAppFloat />
    </main>
  );
}
