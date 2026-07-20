"use client";

import { useRef, useState, useEffect } from "react";
import type { Testimonial } from "@/data/content";

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-amber/40">
      <path
        d="M7 8a3 3 0 00-3 3v5h5v-5H6a2 2 0 012-2V8zm10 0a3 3 0 00-3 3v5h5v-5h-3a2 2 0 012-2V8z"
        fill="currentColor"
      />
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

export default function TestimonialSlider({
  items,
  heading,
}: {
  items: Testimonial[];
  heading?: string;
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
    <section className="max-w-6xl mx-auto px-6 py-16">
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
            <article
              key={i}
              itemScope
              itemType="https://schema.org/Review"
              className="snap-center shrink-0 w-[85%] sm:w-[46%] lg:w-[23%] rounded-2xl border border-line bg-surface p-6 flex flex-col"
            >
              <meta itemProp="itemReviewed" content="eTalVis Embedded Systems Foundation Courses" />
              <div itemProp="author" itemScope itemType="https://schema.org/Person">
                <meta itemProp="name" content={item.name} />
              </div>

              <QuoteIcon />

              <p
                itemProp="reviewBody"
                className="text-base text-muted leading-relaxed mt-3 mb-5 flex-1"
              >
                "{item.quote}"
              </p>

              <div className="mt-auto">
                <p className="font-display font-semibold text-amber">{item.name}</p>
                <p className="text-sm text-muted mt-1">{item.title}</p>

                <a href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-amber underline underline-offset-2 hover:text-ember transition-colors"
                >
                  View on LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>

        {isOverflowing && (
          <>
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-line items-center justify-center text-text hover:bg-amber hover:text-onAccent transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next testimonial"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-line items-center justify-center text-text hover:bg-amber hover:text-onAccent transition-colors disabled:opacity-30 disabled:pointer-events-none"
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