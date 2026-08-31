import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import PlatformFeatures from "@/components/PlatformFeatures";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import PromoBannerSlider from "@/components/PromoBannerSlider";
import StickyExploreBar from "@/components/StickyExploreBar";
import PageAnalytics from "@/components/PageAnalytics";
import PremiumProgramCards from "@/components/PremiumProgramCards";
import InstructorStrip from "@/components/InstructorStrip";

import { testimonialsTop } from "@/data/content";

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

      <PlatformFeatures />

      <FAQ />

      <AssessmentNote />

      <FinalCta href="/courses#plans" />

      <Footer />

      <StickyExploreBar />
    </main>
  );
}