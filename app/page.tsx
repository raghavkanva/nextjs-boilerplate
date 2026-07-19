import Hero from "@/components/Hero";
import FeaturedTestimonial from "@/components/FeaturedTestimonial";
import { TestimonialLight, TestimonialDetailed } from "@/components/Testimonials";
import InstructorCard from "@/components/InstructorCard";
import PlatformFeatures from "@/components/PlatformFeatures";
import CourseCarousel from "@/components/CourseCarousel";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import PlansGrid from "@/components/Plans";
import Prerequisites from "@/components/Prerequisites";
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
      <FeaturedTestimonial />
      <TestimonialLight items={testimonialsTop} />
      <InstructorCard />
      <PlansGrid
        id="plans"
        heading="Choose How Long You Want Access"
        subline="Same 10 courses in every plan. Pick the timeframe that fits how you learn."
      />
      <CourseCarousel />
      <WhoIsThisFor />
      <Prerequisites />
      <TestimonialDetailed items={testimonialsBottom} />
      <PlansGrid
        heading="Ready to Start?"
        subline="Pick your plan and get access to everything above."
      />
      <PlatformFeatures />
      <InstructorCard />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
    </main>
  );
}