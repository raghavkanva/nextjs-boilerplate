import Image from "next/image";
import BrandStrip from "@/components/BrandStrip";
import PromoCodeBox from "@/components/PromoCodeBox";
import Footer from "@/components/Footer";
import { promoOffer, instructor } from "@/data/content";

export const metadata = {
  title: "First Month, Rs. 99, eTalVis Embedded Systems Courses",
  description:
    "Get your first month of embedded systems foundation courses for Rs. 99 with code ETALVIS_PROMO. Regular price Rs. 999.",
};

export default function OfferPage() {
  return (
    <main>
      <BrandStrip />

      <section className="max-w-2xl mx-auto px-6 pt-16 pb-14 md:pt-20 text-center">
        <div className="inline-block text-sm md:text-base px-4 py-1.5 rounded-full border border-line text-amber font-mono mb-8 tracking-wide">
          limited time offer
        </div>

        <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.1] mb-4 text-text">
          {promoOffer.headline}
        </h1>

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

        <a
          href={promoOffer.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-md bg-amber text-bg font-display font-semibold text-lg glow-amber transition-transform hover:scale-[1.02] mb-4"
        >
          Enroll Now, Rs. 99
        </a>

        <p className="text-sm text-mutedDim">
          Remember to enter {promoOffer.promoCode} on the checkout page
        </p>
      </section>

      <section className="border-y border-line bg-surface py-8">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-line shrink-0">
            <Image
              src={instructor.photoFormal}
              alt={instructor.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-display font-semibold text-lg text-text">
              {instructor.name}
            </div>
            <div className="text-sm text-muted">
              {instructor.yearsExperience} years in the Electronics Industry,{" "}
              {instructor.studentsEnrolled} students enrolled
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
