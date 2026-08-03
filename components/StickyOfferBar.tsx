import { promoOffer } from "@/data/content";
import EnrollButton from "@/components/EnrollButton";

export default function StickyOfferBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-text bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl md:text-3xl text-amber">
              Rs. {promoOffer.offerPrice}
            </span>
            <span className="text-base md:text-lg text-mutedDim line-through">
              Rs. {promoOffer.regularPrice}
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted mt-0.5">
            {promoOffer.expiryText}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center text-xs font-mono font-semibold tracking-wide px-3 py-1.5 rounded-full bg-surface text-ember border border-amber/30">
            LIMITED TIME
          </span>
          <EnrollButton
            href={promoOffer.checkoutUrl}
            label="Enroll Now"
            className="px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-semibold text-base hover:bg-text hover:text-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
