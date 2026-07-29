"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  cgEvent,
  CTA_LABEL,
  cgHero,
  cgPainPoints,
  cgQuestionGroups,
  cgAudience,
  cgOutcomes,
  cgInstructor,
  cgReviewCards,
  cgOffer,
  cgTrustStatement,
  cgFaqs,
  cgFinalCta,
  cgFoundationCourses,
} from "@/data/careerSessionV2";

// ---------- Colors ----------
// background: #FFFFFF, alt: #F0FDF4
// text: #111827, muted: #4B5563
// accent green: #16A34A, dark green: #15803D
// CTA yellow: #FFC400, text black, border black

function track(event: string) {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, session: "career-guidance-v2" });
  }
}

function useCountdown(targetISO: string) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  useEffect(() => {
    const tick = () => {
      const total = new Date(targetISO).getTime() - Date.now();
      const clamped = Math.max(0, total);
      setTime({
        total: clamped,
        days: Math.floor(clamped / 86400000),
        hours: Math.floor((clamped / 3600000) % 24),
        minutes: Math.floor((clamped / 60000) % 60),
        seconds: Math.floor((clamped / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);
  return time;
}

function GridBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

// ---------- Icons ----------
function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#15803D] shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#15803D] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconVideo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#15803D] shrink-0">
      <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 10l6-3v10l-6-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#15803D] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#16A34A] shrink-0 mt-0.5">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#16A34A] shrink-0 mt-0.5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconThought() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#16A34A] shrink-0 mt-0.5">
      <path
        d="M12 3C7 3 3.5 6.2 3.5 10.2c0 2.3 1.2 4.3 3.1 5.6-.2 1-.7 2.2-1.6 3.2 1.9-.2 3.4-.9 4.4-1.6.8.2 1.7.3 2.6.3 5 0 8.5-3.2 8.5-7.2S17 3 12 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#16A34A] shrink-0">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />
    </svg>
  );
}
function IconVerified() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A" className="shrink-0">
      <path d="M12 1l2.6 2.1 3.3-.5 1.2 3.1 3.1 1.2-.5 3.3L24 12l-2.3 2.6.5 3.3-3.1 1.2-1.2 3.1-3.3-.5L12 24l-2.6-2.1-3.3.5-1.2-3.1-3.1-1.2.5-3.3L0 12l2.3-2.6-.5-3.3 3.1-1.2 1.2-3.1 3.3.5L12 1z" />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CtaButton({ trackId, className = "" }: { trackId: string; className?: string }) {
  return (
    <a
      href={cgEvent.checkoutUrl}
      onClick={() => track(`${trackId}_cta_click`)}
      className={`inline-block px-8 py-4 rounded-full bg-[#FFC400] text-black font-bold text-base md:text-lg border-2 border-black hover:bg-[#111827] hover:text-white transition-colors ${className}`}
    >
      {CTA_LABEL}
    </a>
  );
}

// ---------- Hero ----------
function AnimatedUnderline() {
  return (
    <svg
      className="absolute left-0 -bottom-2 w-full h-3 pointer-events-none"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="cg-underline-draw"
        d="M2 6 C 50 2, 100 8, 150 4 C 170 2, 185 6, 198 5"
        stroke="#16A34A"
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative bg-white pt-0 pb-14 md:pb-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[1100px] mx-auto px-6">
        <div className="flex justify-center cg-hero-step-1">
          <span className="inline-block w-full max-w-[600px] text-center px-5 py-2.5 rounded-b-2xl bg-[#FFC400] text-black text-sm md:text-base font-bold border-2 border-t-0 border-black">
            {cgHero.announcement}
          </span>
        </div>

        <div className="flex justify-center mt-5 mb-6 cg-hero-step-1" style={{ animationDelay: "0.15s" }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-white" />
            {cgHero.attendLiveBadge}
          </span>
        </div>

        <h1
          className="text-[#111827] font-bold text-center leading-[1.15] mb-5 cg-hero-step-2"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(30px, 4.5vw, 54px)" }}
        >
          <span className="relative inline-block">
            {cgHero.headline}
            <AnimatedUnderline />
          </span>
        </h1>

        <p className="text-[#111827] text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 leading-relaxed cg-hero-step-3">
          {cgHero.subhead}
        </p>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 items-center max-w-[950px] mx-auto cg-hero-step-4">
          <div className="flex flex-col items-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#16A34A]">
              <Image
                src={cgInstructor.photo}
                alt="Balajee Seshadri"
                fill
                sizes="256px"
                quality={80}
                className="object-cover"
                priority
              />
            </div>
            <p className="font-bold text-[#111827] text-lg mt-4">{cgInstructor.name}</p>
            <p className="text-[#4B5563] text-sm text-center">{cgHero.instructorLine}</p>
            <p className="text-[#16A34A] font-bold text-sm mt-1">{cgHero.followersLine}</p>
          </div>

          <div className="rounded-2xl border-2 border-[#16A34A] bg-[#F0FDF4] p-6 md:p-7">
            <span className="inline-block px-3 py-1 rounded-full bg-[#16A34A] text-white text-xs font-bold uppercase mb-4">
              2 Hour Online Session
            </span>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="flex items-center gap-1.5 text-[#15803D] text-xs font-bold uppercase mb-1">
                  <IconCalendar /> Date
                </div>
                <p className="text-[#111827] font-semibold text-sm">{cgEvent.date}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#15803D] text-xs font-bold uppercase mb-1">
                  <IconClock /> Time
                </div>
                <p className="text-[#111827] font-semibold text-sm">{cgEvent.time}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#15803D] text-xs font-bold uppercase mb-1">
                  <IconVideo /> Format
                </div>
                <p className="text-[#111827] font-semibold text-sm">{cgEvent.format}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#15803D] text-xs font-bold uppercase mb-1">
                  <IconGlobe /> Language
                </div>
                <p className="text-[#111827] font-semibold text-sm">{cgEvent.language}</p>
              </div>
            </div>

            <ul className="flex flex-col gap-1.5 mb-5">
              {cgHero.benefitLine.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#111827] font-medium">
                  <IconCheck /> {b}
                </li>
              ))}
            </ul>

            <CtaButton trackId="hero" className="w-full text-center cg-hero-step-5" />
            <p className="text-[#6B7280] text-xs text-center mt-3">{cgHero.microcopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Sound Like You? (pain points + 17 questions merged) ----------
function SoundLikeYouSection() {
  const [openGroup, setOpenGroup] = useState<number | null>(0);

  return (
    <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[1000px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-3 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgPainPoints.heading}
        </h2>
        <p className="text-[#4B5563] text-center mb-10 max-w-2xl mx-auto">
          The thoughts running through most electronics students' heads right now:
        </p>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10 max-w-[880px] mx-auto">
          {cgPainPoints.points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border-2 border-[#111827] bg-white px-4 py-3.5 cg-card-fade"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <IconThought />
              <p className="text-[#111827] text-base md:text-lg font-bold leading-snug">{point}</p>
            </div>
          ))}
        </div>

        <p className="text-[#111827] font-semibold text-center text-base md:text-lg max-w-2xl mx-auto mb-12">
          {cgPainPoints.bridge}
        </p>

        <h3
          className="font-bold text-[#111827] text-center mb-8"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(22px, 3vw, 30px)" }}
        >
          {cgPainPoints.questionsSubheading}
        </h3>

        <div className="flex flex-col gap-3 mb-10 max-w-[800px] mx-auto">
          {cgQuestionGroups.map((group, gi) => (
            <div key={gi} className="rounded-xl border-2 border-[#111827] bg-white overflow-hidden">
              <button
                onClick={() => {
                  const next = openGroup === gi ? null : gi;
                  setOpenGroup(next);
                  if (next !== null) track(`pain_questions_group_open_${gi + 1}`);
                }}
                aria-expanded={openGroup === gi}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-bold text-[#16A34A] text-sm uppercase tracking-wide pr-4">
                  {group.heading}
                  <span className="text-[#6B7280] normal-case tracking-normal font-medium ml-2">
                    ({group.questions.length} questions)
                  </span>
                </span>
                <span className="text-[#16A34A] text-xl shrink-0">{openGroup === gi ? "-" : "+"}</span>
              </button>
              {openGroup === gi && (
                <ul className="flex flex-col gap-3 px-5 pb-5">
                  {group.questions.map((q, qi) => (
                    <li key={qi} className="flex items-start gap-2.5">
                      <IconCheck />
                      <span className="text-[#111827] text-sm md:text-base">{q}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <CtaButton trackId="sound_like_you" />
        </div>
      </div>
    </section>
  );
}

// ---------- Who is this session for ----------
function AudienceSection() {
  return (
    <section className="relative bg-white py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[1100px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-3 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgAudience.heading}
        </h2>
        <p className="text-[#4B5563] text-center mb-10 max-w-2xl mx-auto">{cgAudience.subline}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cgAudience.cards.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-[#111827] bg-white p-6 cg-card-fade"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] text-xs font-bold uppercase border border-[#16A34A]/30 mb-3">
                {item.stage}
              </span>
              <p className="text-[#111827] text-sm leading-relaxed font-medium">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <CtaButton trackId="audience" />
        </div>
      </div>
    </section>
  );
}

// ---------- Outcomes ----------
function OutcomesSection() {
  return (
    <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-[#111827] mb-8 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgOutcomes.heading}
        </h2>
        <ul className="flex flex-col gap-3 mb-8 text-left max-w-lg mx-auto">
          {cgOutcomes.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <IconCheck />
              <span className="text-[#111827] text-base">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-[#4B5563] leading-relaxed mb-8">{cgOutcomes.closing}</p>
        <CtaButton trackId="outcomes" />
      </div>
    </section>
  );
}

// ---------- Instructor ----------
function InstructorSection() {
  return (
    <section className="relative bg-white py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[900px] mx-auto px-6">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#16A34A]">
              <Image src={cgInstructor.photo} alt={cgInstructor.name} fill sizes="192px" quality={80} loading="lazy" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-[#16A34A] font-bold text-sm uppercase tracking-wide mb-2">Meet the Instructor</p>
            <h2
              className="font-bold text-[#111827] mb-4"
              style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(26px, 4vw, 34px)" }}
            >
              {cgInstructor.heading}
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-5">{cgInstructor.bio}</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {cgInstructor.trustPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <IconCheck />
                  <span className="text-[#111827] text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>
            <CtaButton trackId="instructor" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Review slider ----------
function ReviewSliderCard({ card, index }: { card: (typeof cgReviewCards)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="snap-center shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] rounded-2xl border-2 border-[#111827] bg-white p-6 flex flex-col">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span
          className="font-bold text-[#111827] text-base"
          style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {card.name}
        </span>
        <IconVerified />
      </div>
      <p
        className="text-[#6B7280] text-xs mb-3"
        style={{ minHeight: "32px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {card.designation}
      </p>

      <div className="mb-2" style={{ minHeight: "80px" }}>
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
              onClick={() => {
                setExpanded(true);
                track(`student_proof_read_more_click_${index + 1}`);
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
        onClick={() => track(`slider_review_${index}_linkedin_click`)}
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
          <meta itemProp="name" content="eTalVis Core Electronics Career Guidance Session" />
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-10 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          What Students Say About Learning From Balajee Seshadri
        </h2>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: "none" }}>
          {cgReviewCards.map((card, i) => (
            <ReviewSliderCard key={i} card={card} index={i} />
          ))}
        </div>
        <p className="text-[#6B7280] text-xs text-center mt-6 max-w-xl mx-auto">
          These describe past learning experiences with Balajee Seshadri. They are not job or placement guarantees.
        </p>
      </div>
    </section>
  );
}

// ---------- Foundation courses slider ----------
function FoundationCoursesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth + 20;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.min(cgFoundationCourses.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth + 20;
    el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative mt-6">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {cgFoundationCourses.map((course) => (
          <div
            key={course.number}
            className="snap-center shrink-0 w-[85%] sm:w-[50%] lg:w-[34%] rounded-2xl border-2 border-[#111827] bg-white p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] text-xs font-bold uppercase border border-[#16A34A]/30">
                {course.tag}
              </span>
              <span
                className="text-4xl font-extrabold text-[#E5E7EB]"
                style={{ fontFamily: "var(--font-headline, var(--font-display))" }}
              >
                {String(course.number).padStart(2, "0")}
              </span>
            </div>
            <h3
              className="font-bold text-lg text-[#111827] mb-3"
              style={{ minHeight: "56px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {course.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {course.topics.map((topic, ti) => (
                <span
                  key={ti}
                  className="px-2.5 py-1 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151] text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
            {course.highlight && (
              <span className="inline-block self-start px-3 py-1 rounded-full bg-[#FFC400] text-black text-xs font-bold border border-black mt-auto">
                {course.highlight}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {cgFoundationCourses.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to course ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-[#16A34A]" : "w-2 bg-[#D1D5DB]"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => { scroll(-1); track("foundation_slider_prev_click"); }}
        aria-label="Previous course"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#111827] items-center justify-center text-[#111827] hover:bg-[#FFC400] transition-colors shadow"
      >
        ←
      </button>
      <button
        onClick={() => { scroll(1); track("foundation_slider_next_click"); }}
        aria-label="Next course"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#111827] items-center justify-center text-[#111827] hover:bg-[#FFC400] transition-colors shadow"
      >
        →
      </button>
    </div>
  );
}

// ---------- Offer ----------
function OfferSection() {
  return (
    <section id="register" className="relative bg-white py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[1100px] mx-auto px-6">
        <div className="rounded-2xl border-2 border-[#111827] bg-white p-6 md:p-10">
          <h2
            className="font-bold text-[#111827] text-center mb-10 cg-section-fade"
            style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            {cgOffer.heading}
          </h2>

          <div className="max-w-[700px] mx-auto flex flex-col gap-4 mb-8">
            {cgOffer.items.map((item, i) => (
              <div key={i} className="rounded-xl bg-[#F0FDF4] border border-[#16A34A]/30 p-5">
                <h3 className="font-bold text-[#111827] text-base mb-1">{item.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#111827] font-semibold text-lg mb-1">
            All 10 Foundation Courses Included (Worth Rs. {cgEvent.foundationValue})
          </p>
          <p className="text-center text-[#6B7280] text-sm mb-2">
            10 courses, 1 registration. Swipe to explore.
          </p>
          <FoundationCoursesSlider />

          <div className="text-center mt-10">
            <p
              className="font-bold text-[#16A34A] mb-1"
              style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "48px" }}
            >
              Rs. {cgOffer.price}
            </p>
            <p className="text-[#6B7280] text-sm uppercase tracking-wide font-semibold mb-6">
              One Time Session Registration
            </p>
            <CtaButton trackId="offer" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Trust statement ----------
function TrustStatementSection() {
  return (
    <section className="relative bg-[#F0FDF4] py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-[#111827] mb-6 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgTrustStatement.heading}
        </h2>
        <p className="text-[#4B5563] leading-relaxed mb-6">{cgTrustStatement.intro}</p>
        <p className="text-[#111827] font-semibold mb-4">{cgTrustStatement.subheading}</p>
        <ul className="flex flex-col gap-3 mb-8 text-left max-w-md mx-auto">
          {cgTrustStatement.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <IconX />
              <span className="text-[#374151] text-base">{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-[#111827] font-semibold text-lg mb-8">{cgTrustStatement.closing}</p>
        <CtaButton trackId="trust" />
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative bg-white py-12 md:py-16 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[800px] mx-auto px-6">
        <h2
          className="font-bold text-[#111827] text-center mb-10 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3 mb-8">
          {cgFaqs.map((faq, i) => (
            <div key={i} className="rounded-xl border-2 border-[#111827] bg-white overflow-hidden">
              <button
                onClick={() => {
                  const next = open === i ? null : i;
                  setOpen(next);
                  if (next !== null) track(`faq_toggle_open_q${i + 1}`);
                }}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-[#111827] text-sm md:text-base pr-4">{faq.q}</span>
                <span className="text-[#16A34A] text-xl shrink-0">{open === i ? "-" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-[#4B5563] text-sm md:text-base leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <CtaButton trackId="faq" />
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCtaSection() {
  return (
    <section className="relative bg-[#F0FDF4] py-14 md:py-20 overflow-hidden">
      <GridBg />
      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wide mb-6">
          {cgFinalCta.attendLiveBadge}
        </span>
        <h2
          className="font-bold text-[#111827] mb-6 cg-section-fade"
          style={{ fontFamily: "var(--font-headline, var(--font-display))", fontSize: "clamp(28px, 4.5vw, 42px)" }}
        >
          {cgFinalCta.heading}
        </h2>
        <p className="text-[#4B5563] text-base md:text-lg leading-relaxed mb-8">{cgFinalCta.body}</p>
        <div className="rounded-2xl border-2 border-[#111827] bg-white p-6 mb-8 max-w-md mx-auto text-left">
          {cgFinalCta.recap.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <IconCheck />
              <span className="text-[#111827] text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <CtaButton trackId="final" />
      </div>
    </section>
  );
}

// ---------- Footer ----------
function CgFooter() {
  return (
    <footer className="relative bg-white pt-14 pb-32 md:pb-28 px-6 overflow-hidden border-t border-[#E5E7EB]">
      <GridBg />
      <div className="relative max-w-[1000px] mx-auto text-center">
        <Image src="/images/icon.png" alt="eTalVis" width={80} height={80} className="h-16 w-auto mx-auto mb-4" />
        <p className="text-[#111827] font-semibold mb-1">Core Electronics Career Guidance</p>
        <p className="text-[#6B7280] text-sm mb-1">Conducted by Balajee Seshadri</p>
        <p className="text-[#6B7280] text-sm mb-6">
          {cgEvent.date} &middot; {cgEvent.time}
        </p>

        <div className="flex flex-col items-center gap-1 mb-6 text-sm">
          <p className="text-[#6B7280]">Registration Support</p>
          <a href={cgEvent.whatsappLink} onClick={() => track("whatsapp_support_click")} className="text-[#111827] hover:text-[#16A34A]">
            WhatsApp: {cgEvent.whatsapp}
          </a>
          <a
            href={cgEvent.instructorLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("instructor_linkedin_footer_click")}
            className="text-[#111827] hover:text-[#16A34A]"
          >
            Balajee Seshadri's LinkedIn Profile
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-[#6B7280] mb-6">
          <a href="https://courses.etalvis.com" onClick={() => track("footer_etalvis_home_click")} className="hover:text-[#111827]">
            eTalVis Home
          </a>
          <span>&middot;</span>
          <a href="https://courses.etalvis.com/#plans" onClick={() => track("footer_all_plans_click")} className="hover:text-[#111827]">
            All Plans
          </a>
          <span>&middot;</span>
          <a href="/privacy-policy" onClick={() => track("privacy_policy_click")} className="hover:text-[#111827]">
            Privacy Policy
          </a>
        </div>

        <p className="text-[#9CA3AF] text-xs mb-3">© 2026 eTalVis. All rights reserved.</p>
        <p className="text-[#6B7280] text-sm sm:text-base font-medium leading-relaxed">
          Landing page, SEO and AI Discoverability by
          <br />
          <a
            href="https://www.linkedin.com/in/raghavkanva"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("footer_credit_link_click")}
            className="text-[#111827] hover:text-[#16A34A] transition-colors font-semibold"
          >
            Raghav Kanva
          </a>
        </p>
      </div>
    </footer>
  );
}

// ---------- Sticky bar ----------
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-0">
      <div className="bg-white text-[#111827] font-bold rounded-md text-xl md:text-2xl px-2.5 py-1.5 tabular-nums border-2 border-[#111827]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[8px] md:text-[9px] text-[#6B7280] mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function StickyBar() {
  const time = useCountdown(cgEvent.registrationClosesISO);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-[#111827] shadow-2xl">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="hidden md:flex items-center justify-between gap-6">
          <div className="text-center shrink-0">
            <p className="text-[#111827] font-bold text-sm">CORE ELECTRONICS CAREER GUIDANCE</p>
            <p className="text-[#6B7280] text-xs">
              {cgEvent.date} &middot; {cgEvent.time}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wide mb-1.5">Registration Closes In</p>
            <div className="flex items-center gap-1.5">
              <CountdownUnit value={time.days} label="Days" />
              <span className="text-[#9CA3AF] -mt-3">:</span>
              <CountdownUnit value={time.hours} label="Hrs" />
              <span className="text-[#9CA3AF] -mt-3">:</span>
              <CountdownUnit value={time.minutes} label="Min" />
              <span className="text-[#9CA3AF] -mt-3">:</span>
              <CountdownUnit value={time.seconds} label="Sec" />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <p className="text-[#16A34A] font-extrabold text-xl">Rs. {cgEvent.price}</p>
            <CtaButton trackId="sticky_bar" className="whitespace-nowrap" />
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p className="text-[#DC2626] text-[11px] font-bold uppercase tracking-wide">
              Registration Closes In
            </p>
            <span className="text-[#111827] font-bold text-sm tabular-nums">
              {String(time.days).padStart(2, "0")}d : {String(time.hours).padStart(2, "0")}h :{" "}
              {String(time.minutes).padStart(2, "0")}m : {String(time.seconds).padStart(2, "0")}s
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#16A34A] font-extrabold text-xl">Rs. {cgEvent.price}</span>
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("sticky_bar_mobile_cta_click")}
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-[#FFC400] text-black font-bold text-sm border-2 border-black"
            >
              Reserve My Seat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function CareerGuidanceClientV2() {
  // Route-scoped override: globals.css sets html { font-size: 120% } for the
  // rest of the site, which makes every rem-based size render 20% larger.
  // Inside Instagram's narrow in-app browser this reads as oversized text,
  // so this page runs at the standard 100% and restores 120% on unmount.
  useEffect(() => {
    const prev = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = "110%";
    return () => {
      document.documentElement.style.fontSize = prev;
    };
  }, []);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: cgEvent.sessionName,
    startDate: cgEvent.dateISO,
    endDate: cgEvent.endISO,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: "en",
    location: { "@type": "VirtualLocation", url: "https://courses.etalvis.com/career-guidance" },
    organizer: { "@type": "Organization", name: "eTalVis", url: "https://courses.etalvis.com" },
    performer: { "@type": "Person", name: "Balajee Seshadri", url: cgEvent.instructorLinkedin },
    offers: {
      "@type": "Offer",
      price: cgEvent.price,
      priceCurrency: "INR",
      url: cgEvent.checkoutUrl,
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cgFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-white text-[1.2rem] md:text-[1rem]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero />
      <SoundLikeYouSection />
      <AudienceSection />
      <OutcomesSection />
      <OfferSection />
      <InstructorSection />
      <ReviewsSection />
      <TrustStatementSection />
      <FaqSection />
      <FinalCtaSection />
      <CgFooter />
      <StickyBar />
    </main>
  );
}