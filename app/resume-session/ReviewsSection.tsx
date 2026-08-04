"use client";

import { useState } from "react";
import Image from "next/image";
import { cgReviewCards } from "@/data/careerSessionV2";
import { track } from "@/lib/analytics";

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#16A34A] shrink-0">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />
    </svg>
  );
}

function IconVerified() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A" className="shrink-0">
      <path d="M12 1l2.6 2.1 3.3-.5 1.2 3.1 3.1 1.2-.5 3.3L24 12l-2.3 2.6.5 3.3-3.1 1.2-1.2 3.1-3.3-.5L12 24l-2.6-2.1-3.3.5-1.2-3.1-3.1-1.2.5-3.3L0 12l2.3-2.6-.5-3.3 3.1-1.2 1.2-3.1 3.3.5L12 1z" />
    </svg>
  );
}

function ReviewCard({ card, index }: { card: (typeof cgReviewCards)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="snap-center shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] rounded-2xl border-2 border-[#111827] bg-white p-5 flex flex-col">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span
          className="font-bold text-[#111827] text-sm"
          style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {card.name}
        </span>
        <IconVerified />
      </div>
      <p
        className="text-[#6B7280] text-xs mb-3"
        style={{ minHeight: "28px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {card.designation}
      </p>

      <div className="mb-3" style={{ minHeight: "72px" }}>
        <p
          className="text-[#374151] text-sm leading-relaxed"
          style={
            expanded
              ? undefined
              : { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }
          }
        >
          {expanded ? card.fullSummary : card.shortSummary}
          {!expanded && (
            <button
              type="button"
              onClick={() => {
                setExpanded(true);
                track("resume_review_read_more_click", { review_index: index + 1, reviewer: card.name, page: "resume-session" });
              }}
              className="text-[#16A34A] font-semibold ml-1 hover:underline"
            >
              Read more...
            </button>
          )}
        </p>
      </div>

      <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-[#111827] mb-3">
        <Image
          src={card.image}
          alt={`${card.name} LinkedIn post`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 30vw"
          quality={70}
          className="object-cover"
        />
      </div>

      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("resume_review_linkedin_click", { review_index: index + 1, reviewer: card.name, page: "resume-session" })}
        className="flex items-center gap-1.5 text-[#16A34A] text-sm font-semibold hover:underline mt-auto"
      >
        <IconLinkedIn /> View on LinkedIn
      </a>

      <div itemScope itemType="https://schema.org/Review" style={{ display: "none" }}>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content={card.name} />
        </div>
        <meta itemProp="reviewBody" content={card.fullSummary} />
        <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Course">
          <meta itemProp="name" content="eTalVis Resume Masterclass" />
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)" }}
        >
          What Students Say About Learning From Balajee Seshadri
        </h2>
        <div className="w-16 h-1 bg-[#16A34A] rounded-full mx-auto mb-10" />
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: "none" }}>
          {cgReviewCards.map((card, i) => (
            <ReviewCard key={i} card={card} index={i} />
          ))}
        </div>
        <p className="text-[#6B7280] text-sm text-center mt-6 max-w-xl mx-auto">
          These describe past learning experiences with Balajee Seshadri. They are not job or placement guarantees.
        </p>
      </div>
    </section>
  );
}