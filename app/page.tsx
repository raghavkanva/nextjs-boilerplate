import BrandStrip from "@/components/BrandStrip";
import Hero from "@/components/Hero";
import { TestimonialLight, TestimonialDetailed } from "@/components/Testimonials";
import InstructorStrip from "@/components/InstructorStrip";
import PlatformFeatures from "@/components/PlatformFeatures";
import CourseList from "@/components/CourseList";
import PlansGrid from "@/components/Plans";
import Prerequisites from "@/components/Prerequisites";
import InstructorBio from "@/components/InstructorBio";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import {
  testimonialsTop,
  testimonialsBottom,
} from "@/data/content";

export default function Home() {
  return (
    <main>
      <BrandStrip />
      <Hero />
      <TestimonialLight items={testimonialsTop} />
      <InstructorStrip />
      <PlatformFeatures />
      <CourseList />
      <PlansGrid
        id="plans"
        heading="Choose How Long You Want Access"
        subline="Same 10 courses in every plan. Pick the timeframe that fits how you learn."
      />
      <Prerequisites />
      <TestimonialDetailed items={testimonialsBottom} />
      <PlansGrid
        heading="Ready to Start?"
        subline="Pick your plan and get access to everything above."
      />
      <InstructorBio />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
    </main>
  );
}
