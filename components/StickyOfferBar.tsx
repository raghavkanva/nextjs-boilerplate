import { promoOffer } from "@/data/content";
import EnrollButton from "@/components/EnrollButton";

export default function StickyOfferBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-bg shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
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
          <span className="hidden sm:inline-flex items-center text-xs font-mono font-semibold tracking-wide px-3 py-1.5 rounded-full bg-ember/15 text-ember">
            LIMITED TIME
          </span>
          <EnrollButton
            href={promoOffer.checkoutUrl}
            label="Enroll Now"
            className="px-6 py-3 rounded-md bg-amber text-onAccent font-display font-semibold text-base glow-amber transition-transform hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
}
