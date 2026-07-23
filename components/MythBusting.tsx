"use client";

import { coreMyths } from "@/data/content";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-mutedDim shrink-0 mt-0.5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MythBusting() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 md:py-12">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text text-center mb-2">
        Myth vs. Reality
      </h2>
      <p className="text-muted text-center mb-10">
        What students get wrong about a core electronics career.
      </p>

      <div className="flex flex-col gap-4">
        {coreMyths.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-line bg-surface overflow-hidden opacity-0 animate-myth-reveal"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="flex items-start gap-3 p-5 bg-mutedDim/5">
              <XIcon />
              <p className="text-base text-mutedDim leading-relaxed line-through decoration-mutedDim/40">
                {item.myth}
              </p>
            </div>
            <div className="flex items-start gap-3 p-5 bg-amber/5 border-t border-amber/20">
              <CheckIcon />
              <p className="text-base md:text-lg text-text font-semibold leading-relaxed">
                {item.reality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}