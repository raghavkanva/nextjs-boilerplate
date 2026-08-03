"use client";

import { useRef, useState, useEffect } from "react";
import type { Testimonial } from "@/data/content";

function IconVerified() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A" className="shrink-0">
      <path d="M12 1l2.6 2.1 3.3-.5 1.2 3.1 3.1 1.2-.5 3.3L24 12l-2.3 2.6.5 3.3-3.1 1.2-1.2 3.1-3.3-.5L12 24l-2.6-2.1-3.3.5-1.2-3.1-3.1-1.2.5-3.3L0 12l2.3-2.6-.5-3.3 3.1-1.2 1.2-3.1 3.3.5L12 1z" />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="snap-center shrink-0 w-[85%] sm:w-[46%] lg:w-[23%] rounded-2xl border-2 border-text bg-white p-6 flex flex-col"
    >
      <meta itemProp="itemReviewed" content="eTalVis Embedded Systems Foundation Courses" />
      <div itemProp="author" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content={item.name} />
      </div>

      <div className="flex items-center gap-1.5 mb-0.5">
        <span
          className="font-bold text-text text-base"
          style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {item.name}
        </span>
        <IconVerified />
      </div>

      <p
        className="text-mutedDim text-sm mb-3"
        style={{ minHeight: "32px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {item.title}
      </p>

      <div className="mb-4 flex-1" style={{ minHeight: "80px" }}>
        <p
          itemProp="reviewBody"
          className="text-sm text-muted leading-relaxed"
          style={
            expanded
              ? undefined
              : { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }
          }
        >
          &ldquo;{item.quote}&rdquo;
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-amber font-semibold ml-1 hover:underline"
            >
              Read more...
            </button>
          )}
        </p>
      </div>

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-amber text-sm font-semibold hover:underline mt-auto"
      >
        <IconLinkedIn /> View on LinkedIn
      </a>
    </article>
  );
}

export default function TestimonialSlider({
  items,
  heading,
  id,
}: {
  items: Testimonial[];
  heading?: string;
  id?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const checkOverflow = () => {
      setIsOverflowing(track.scrollWidth > track.clientWidth + 4);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [items]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const next = Math.max(0, activeIndex - 1);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(items.length - 1, activeIndex + 1);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
      const index = Math.round(scrollLeft / (cardWidth + 20));
      setActiveIndex(index);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-6 md:py-8 scroll-mt-24">
      {heading && (
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-10">
          {heading}
        </h2>
      )}

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide"
        >
          {items.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>

        {isOverflowing && (
          <>
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-text items-center justify-center text-text hover:bg-cta transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next testimonial"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-text items-center justify-center text-text hover:bg-cta transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {isOverflowing && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-amber" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
