"use client";

import { finalCta } from "@/data/content";

export default function FinalCta({ href = "#plans" }: { href?: string }) {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-4 leading-tight">
        {finalCta.heading}
      </h2>
      <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
        {finalCta.subline}
      </p>
      <a
        href={href}
        onClick={() =>
          typeof window !== "undefined" &&
          window.gtag &&
          window.gtag("event", "cta_click", { location: "final_cta" })
        }
        className="inline-block px-8 py-4 rounded-full bg-cta text-black border-2 border-text font-display font-semibold text-lg hover:bg-text hover:text-white transition-colors"
      >
        {finalCta.ctaLabel}
      </a>
    </section>
  );
}
