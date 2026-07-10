"use client";

import { useState } from "react";
import { faqs } from "@/data/content";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "faq_expand", { question: q });
    }
  };

  return (
    <div className="border-b border-line">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-display font-medium text-lg md:text-xl text-text pr-4">
          {q}
        </span>
        <span className="text-amber text-2xl leading-none shrink-0">
          {open ? "-" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-base md:text-lg text-muted leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-10">
        Questions Before You Enroll
      </h2>
      <div>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}