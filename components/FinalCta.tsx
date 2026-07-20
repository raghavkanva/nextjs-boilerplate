"use client";

import { finalCta } from "@/data/content";

export default function FinalCta() {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-4 leading-tight">
        {finalCta.heading}
      </h2>
      <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
        {finalCta.subline}
      </p>
      <a
        href="#plans"
        onClick={() =>
          typeof window !== "undefined" &&
          window.gtag &&
          window.gtag("event", "cta_click", { location: "final_cta" })
        }
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-semibold text-lg glow-amber transition-transform hover:scale-[1.02]"
      >
        {finalCta.ctaLabel}
      </a>
    </section>
  );
}
