import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import InstructorStrip from "@/components/InstructorStrip";
import PlatformFeatures from "@/components/PlatformFeatures";
import CourseCarousel from "@/components/CourseCarousel";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import PlansGrid from "@/components/Plans";
import Prerequisites from "@/components/Prerequisites";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { testimonialsTop, testimonialsBottom } from "@/data/content";

export default function Home() {
  return (
    <main>
      <Hero />
      <TestimonialSlider
        items={testimonialsTop}
        heading="What Our Students Are Saying"
      />
      <TestimonialSlider items={testimonialsTop} />
      <InstructorStrip />
      <PlansGrid
        id="plans"
        heading="Choose How Long You Want Access"
        subline="Same 10 courses in every plan. Pick the timeframe that fits how you learn."
      />
      <CourseCarousel />
      <WhoIsThisFor />
      <Prerequisites />
      <TestimonialSlider
        items={testimonialsBottom}
        heading="Real Stories. Real Results."
      />
      <PlatformFeatures />
      <PlansGrid
        heading="Ready to Start?"
        subline="Pick your plan and get access to everything above."
      />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
    </main>
  );
}