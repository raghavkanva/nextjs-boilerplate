import BrandStrip from "@/components/BrandStrip";
import Hero from "@/components/Hero";
import PromoCodeBox from "@/components/PromoCodeBox";
import EnrollButton from "@/components/EnrollButton";
import StickyOfferBar from "@/components/StickyOfferBar";
import { TestimonialLight, TestimonialDetailed } from "@/components/Testimonials";
import InstructorStrip from "@/components/InstructorStrip";
import PlatformFeatures from "@/components/PlatformFeatures";
import CourseCarousel from "@/components/CourseCarousel";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Prerequisites from "@/components/Prerequisites";
import InstructorBio from "@/components/InstructorBio";
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
    "Get your first month of embedded systems foundation courses for Rs. 99 with code ETALVIS_PROMO. Regular price Rs. 999.",
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

      <p className="text-base md:text-lg text-muted mb-10">
        {promoOffer.expiryText}
      </p>

      <PromoCodeBox code={promoOffer.promoCode} />
      <p className="text-sm text-mutedDim mb-10">
        Copy this code, you'll need it at checkout
      </p>

      <div className="text-left max-w-sm mx-auto mb-10 flex flex-col gap-3">
        {promoOffer.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="font-mono text-amber text-sm mt-0.5 shrink-0">
              {i + 1}
            </span>
            <span className="text-base text-muted leading-relaxed">
              {step}
            </span>
          </div>
        ))}
      </div>

      <EnrollButton
        href={promoOffer.checkoutUrl}
        label="Enroll Now, Rs. 99"
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-semibold text-lg glow-amber transition-transform hover:scale-[1.02] mb-4"
      />

      <p className="text-sm text-mutedDim">
        Remember to enter {promoOffer.promoCode} on the checkout page
      </p>
    </section>
  );
}

export default function OfferPage() {
  return (
    <main className="pb-24">
      <BrandStrip />
      <Hero />
      <TestimonialLight items={testimonialsTop} />
      <InstructorStrip />
      <PromoOfferBlock />
      <CourseCarousel />
      <WhoIsThisFor />
      <Prerequisites />
      <TestimonialDetailed items={testimonialsBottom} />
      <PromoOfferBlock />
      <PlatformFeatures />
      <InstructorBio />
      <FAQ />
      <AssessmentNote />
      <FinalCta />
      <Footer />
      <StickyOfferBar />
    </main>
  );
}
