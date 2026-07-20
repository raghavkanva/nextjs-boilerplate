import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import DealCountdown from "@/components/DealCountdown";
import EnrollButton from "@/components/EnrollButton";
import StickyOfferBar from "@/components/StickyOfferBar";
import InstructorStrip from "@/components/InstructorStrip";
import PlatformFeatures from "@/components/PlatformFeatures";
import CourseCarousel from "@/components/CourseCarousel";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Prerequisites from "@/components/Prerequisites";
import FAQ from "@/components/FAQ";
import AssessmentNote from "@/components/AssessmentNote";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import {
  promoOffer,
  testimonialsTop,
  testimonialsBottom,
} from "@/data/content";

export const metadata = {
  title: "First Month, Rs. 99, eTalVis Embedded Systems Courses",
  description:
    "Get your first month of embedded systems foundation courses for Rs. 99. Regular price Rs. 999.",
};

function PromoOfferBlock() {
  return (
    <section id="plans" className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="inline-block text-sm md:text-base px-4 py-1.5 rounded-full border border-line text-amber font-mono mb-8 tracking-wide">
        limited time offer
      </div>

      <h2 className="font-display font-semibold text-3xl md:text-5xl leading-[1.1] mb-4 text-text">
        {promoOffer.headline}
      </h2>

      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-2xl md:text-3xl text-mutedDim line-through font-display">
          Rs. {promoOffer.regularPrice}
        </span>
        <span className="text-4xl md:text-5xl font-display font-semibold text-amber">
          Rs. {promoOffer.offerPrice}
        </span>
      </div>

      <div className="max-w-xs mx-auto mb-10">
        <DealCountdown targetDate="2026-07-31T23:59:59" />
      </div>

      <EnrollButton
        href={promoOffer.checkoutUrl}
        label="Enroll Now, Rs. 99"
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-semibold text-lg glow-amber transition-transform hover:scale-[1.02]"
      />
    </section>
  );
}

export default function OfferPage() {
  return (
    <main className="pb-24">
      <Hero />
      <TestimonialSlider
        items={testimonialsTop}
        heading="What Our Students Are Saying"
      />
      <InstructorStrip />
      <PromoOfferBlock />
      <CourseCarousel />
      <WhoIsThisFor />
      <Prerequisites />
      <TestimonialSlider
        items={testimonialsBottom}
        heading="Real Stories. Real Results."
      />
      <PlatformFeatures />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
      <StickyOfferBar />
    </main>
  );
}