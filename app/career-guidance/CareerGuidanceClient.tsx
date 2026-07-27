"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  cgEvent,
  cgHero,
  cgSection2,
  cgStageCards,
  cgQuestions,
  cgInterviewSplit,
  cgStages,
  cgWhenToStart,
  cgConfusions,
  cgInstructor,
  cgSessionNotFor,
  cgWhoIsThisFor,
  cgTopicSectionsHeading,
  cgTopicSections,
  cgReviewCards,
  cgFoundationCourses,
  cgWhatYouGet,
  cgTrustStatement,
  cgHowToRegister,
  cgFaqs,
  cgWhySessionExists,
} from "@/data/careerSession";

function track(event: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, { session: "career-guidance-aug2" });
  }
}

// ---------- Countdown hook ----------
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

// ---------- Icons (single accent color: orange) ----------
function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0 mt-0.5">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0 mt-0.5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#F97316] shrink-0">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />
    </svg>
  );
}
function IconVerified() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6" className="shrink-0">
      <path d="M12 1l2.6 2.1 3.3-.5 1.2 3.1 3.1 1.2-.5 3.3L24 12l-2.3 2.6.5 3.3-3.1 1.2-1.2 3.1-3.3-.5L12 24l-2.6-2.1-3.3.5-1.2-3.1-3.1-1.2.5-3.3L0 12l2.3-2.6-.5-3.3 3.1-1.2 1.2-3.1 3.3.5L12 1z" />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
function IconGraduationCap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M12 3L2 8l10 5 10-5-10-5zM6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.5 9.5l-1.8 4.8-4.7 1.8 1.8-4.8 4.7-1.8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function IconClockStage() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheckStage() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stageIconMap = {
  target: IconTarget,
  graduationCap: IconGraduationCap,
  book: IconBook,
  briefcase: IconBriefcase,
  compass: IconCompass,
  clock: IconClockStage,
  check: IconCheckStage,
};

function HandDrawnUnderline({ color = "#4ADE80" }: { color?: string }) {
  return (
    <svg
      className="absolute left-0 -bottom-1.5 w-full h-3 pointer-events-none"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 40 3, 80 10, 120 5 C 150 2, 175 9, 198 6"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

function Underline({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <HandDrawnUnderline color={color} />
    </span>
  );
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

// ---------- Header ----------
function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        solid ? "bg-[#16283D] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/icon.png" alt="eTalVis" width={72} height={72} className="h-16 md:h-[72px] w-auto" />
        </div>
        <a
          href={cgEvent.checkoutUrl}
          onClick={() => track("header_cta_click")}
          className="px-4 py-2 md:px-5 md:py-2.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-sm md:text-base transition-colors"
        >
          Register — ₹99
        </a>
      </div>
    </header>
  );
}

// ---------- Hero (stacked, no side-by-side, photo after all text) ----------
function Hero() {
  return (
    <section className="relative bg-[#16283D] pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] text-xs md:text-sm font-bold uppercase tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] cg-animate-pulse-dot" />
          {cgHero.label}
        </span>

        <h1
          className="text-white font-extrabold leading-[1.2] mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4.2vw, 52px)" }}
        >
          {cgHero.headline}
        </h1>

        <p className="text-[#D8E0EA] italic text-lg md:text-2xl font-medium leading-snug mb-6">
          "Mr. Balajee Sir will answer{" "}
          <span className="relative inline-block whitespace-nowrap not-italic font-semibold text-white">
            10+ important doubts
            <HandDrawnUnderline color="#4ADE80" />
          </span>{" "}
          regarding Core Electronics Industry career."
        </p>

        <div className="rounded-md border-2 border-white/20 bg-[#0F1D2E] p-5 md:p-6 mb-6 max-w-md mx-auto text-left">
          <p className="text-white font-semibold text-sm md:text-base leading-snug mb-4">
            {cgHero.instructorLine}
          </p>
          <div className="flex items-center gap-2 text-white mb-2">
            <IconCalendar />
            <span className="font-semibold text-sm md:text-base">{cgEvent.date}</span>
          </div>
          <div className="flex items-center gap-2 text-white mb-2">
            <IconClock />
            <span className="font-semibold text-sm md:text-base">{cgEvent.time}</span>
          </div>
          <p className="text-[#8393A6] text-sm mb-2">{cgEvent.format}</p>
          <p className="text-[#F97316] font-bold text-lg">Registration Fee: ₹{cgEvent.price}</p>
        </div>

        <p className="text-[#D8E0EA] text-lg md:text-xl font-semibold leading-relaxed mb-6">
          {cgHero.subhead}
        </p>

        <a
          href={cgEvent.checkoutUrl}
          onClick={() => track("hero_cta_click")}
          className="cg-cta-glow inline-block px-8 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base md:text-lg transition-colors mb-6"
        >
          {cgHero.ctaLabel}
        </a>

        <ul className="flex flex-col items-center gap-2 mb-10">
          {[
            "One-time fee, no hidden charges",
            "1-month recording access included",
            "1-month Foundation course access worth ₹999 included",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <IconCheck />
              <span className="text-white font-bold text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-md overflow-hidden border-2 border-white/20">
            <Image src={cgInstructor.photo} alt="Balajee Seshadri" fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Questions ----------
function QuestionsSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="relative max-w-[1000px] mx-auto px-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] text-sm md:text-base font-bold uppercase tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] cg-animate-pulse-dot" />
          17 questions, one session
        </span>
        <h2
          className="font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)" }}
        >
          The Questions Every Electronics Student Asks
        </h2>
        <p className="text-[#B8C4D3] text-base md:text-lg mb-10 max-w-2xl">
          You've probably heard different answers to most of these already. Here's what actually gets covered.
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {cgQuestions.map((q, i) => {
            const isEdge = i === 0 || i === cgQuestions.length - 1;
            const clusterDelay = Math.floor(i / 4) * 0.25 + (i % 4) * 0.08;
            return (
              <div
                key={i}
                className={`cg-tilt-hover cg-question-box group flex items-start gap-4 rounded-lg border bg-[#0F1D2E] px-5 py-4 cg-animate-clip-reveal ${
                  isEdge ? "border-[#F97316]/40 shadow-[0_0_24px_-10px_rgba(249,115,22,0.5)]" : "border-white/10"
                }`}
                style={{ animationDelay: `${clusterDelay}s` }}
              >
                <span
                  className="cg-question-number font-bold text-[#F97316] text-lg shrink-0 group-hover:text-[#FDBA74] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-plex-mono), monospace", animationDelay: `${clusterDelay + 0.15}s` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-white text-lg md:text-xl font-semibold leading-snug pt-0.5">{q}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("questions_cta_click")}
            className="cg-cta-glow inline-block px-8 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base md:text-lg transition-colors"
          >
            Get Answers to These Questions for ₹99
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Why This Session Exists ----------
function WhySessionExistsSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[720px] mx-auto px-6">
        <h2
          className="font-bold text-white mb-6 text-center"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)" }}
        >
          {cgWhySessionExists.heading}
        </h2>

        <p
          className="text-white font-semibold text-center mb-14"
          style={{ fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.5 }}
        >
          {cgWhySessionExists.openingStatement}
        </p>

        <div className="flex flex-col gap-5 mb-12">
          {cgWhySessionExists.stageLines.map((line, i) => (
            <p key={i} className="text-white text-lg md:text-xl leading-relaxed text-center">
              {line.before}
              <Underline color="#3B82F6">{line.underline}</Underline>
              {line.after}
            </p>
          ))}
        </div>

        <p className="text-[#B8C4D3] text-base md:text-lg leading-relaxed text-center mb-12 max-w-xl mx-auto">
          {cgWhySessionExists.intro}
        </p>

        <div className="flex flex-col gap-4 mb-14">
          {cgWhySessionExists.reassuranceLines.map((line, i) => {
            const colors = ["#FACC15", "#3B82F6", "#F97316", "#4ADE80"];
            return (
              <p key={i} className="text-white text-base md:text-lg leading-relaxed text-center">
                {line.before}
                <Underline color={colors[i]}>{line.underline}</Underline>
                {line.after}
              </p>
            );
          })}
        </div>

        <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed text-center mb-10">
          {cgWhySessionExists.closingBefore}
          <span className="text-[#F97316]">{cgWhySessionExists.closingHighlight1}</span>
          {cgWhySessionExists.closingMid}
          <span className="text-[#F97316]">{cgWhySessionExists.closingHighlight2}</span>
          {cgWhySessionExists.closingAfter}
        </p>

        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("why_session_exists_cta_click")}
            className="cg-cta-glow inline-block px-8 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base md:text-lg transition-colors"
          >
            {cgWhySessionExists.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Your Starting Line (renamed Stage Cards) ----------
// ---------- Who Is This For? ----------
function WhoIsThisForSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-white mb-8"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgWhoIsThisFor.heading}
        </h2>
        <ul className="flex flex-col gap-4 text-left max-w-lg mx-auto">
          {cgWhoIsThisFor.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <IconCheck />
              <span className="text-white text-base md:text-lg">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function YourStartingLineSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Your Starting Line
        </h2>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4">
          {cgStageCards.map((card, i) => {
            const Icon = stageIconMap[card.icon];
            return (
              <div
                key={i}
                className={`cg-tilt-hover snap-center shrink-0 w-[78%] sm:w-[46%] lg:w-[30%] rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 flex flex-col cg-animate-fade-up ${
                  i === 0 ? "border-2 border-[#F97316]/40" : ""
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="mb-3"><Icon /></span>
                <h3 className="font-bold text-lg md:text-xl text-white mb-2">{card.title}</h3>
                <p className="text-[#B8C4D3] text-sm md:text-base leading-relaxed mb-5 flex-1">{card.body}</p>
                <a
                  href={cgEvent.checkoutUrl}
                  onClick={() => track(`stage_card_${i}_cta_click`)}
                  className="text-[#1677FF] font-bold text-sm hover:text-[#0B5ED7] transition-colors"
                >
                  {card.ctaLabel} →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- What This Session Will Help You Solve ----------
function ConfusionsSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[1000px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          What This Session Will Help You Solve
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {cgConfusions.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border-2 border-white/20 bg-[#0F1D2E] px-4 py-3 cg-animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <IconX />
              <span className="text-white text-sm md:text-base">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-[#B8C4D3] text-center mb-2">
          This session will not decide your complete career for you.
        </p>
        <p className="text-[#B8C4D3] text-center mb-8">
          It will help you understand the questions you should ask before making that decision.
        </p>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("confusions_cta_click")}
            className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Get Career Clarity for ₹99
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- What Students Say (review-only slider) ----------
function ReviewSliderCard({ card, index }: { card: (typeof cgReviewCards)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="snap-center shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 flex flex-col">
      <div className="flex items-center gap-1.5 mb-0.5 min-h-[24px]">
        <span
          className="font-bold text-white text-base"
          style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {card.name}
        </span>
        <IconVerified />
      </div>
      <p
        className="text-[#8393A6] text-xs mb-3"
        style={{ minHeight: "32px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {card.designation}
      </p>

      <div className="mb-2" style={{ minHeight: "84px" }}>
        <p
          className="text-[#D8E0EA] text-sm leading-relaxed"
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
              className="text-[#F97316] font-semibold ml-1 hover:underline"
            >
              Read more...
            </button>
          )}
        </p>
      </div>

      <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-white/20 mb-3">
        <Image
          src={card.image}
          alt={`${card.name} LinkedIn post`}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(`slider_review_${index}_linkedin_click`)}
        className="text-[#1677FF] text-sm font-semibold hover:text-[#0B5ED7] mt-auto"
      >
        View on LinkedIn
      </a>

      {/* Review schema, per card */}
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

function WhatStudentsSaySection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          What Students Say
        </h2>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4">
          {cgReviewCards.map((card, i) => (
            <ReviewSliderCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Straight Answers, One at a Time (8 standalone topic sections) ----------
function TopicSectionBlock({ topic, index }: { topic: (typeof cgTopicSections)[number]; index: number }) {
  return (
    <div className="snap-center shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 flex flex-col">
      <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">{topic.heading}</h3>

      <div className="flex flex-col gap-3 mb-5 flex-1">
        {topic.layout === "twoColumn" && topic.columns
          ? topic.columns.map((col, i) => (
              <p key={i} className="text-[#B8C4D3] text-sm leading-relaxed">
                <span className="font-bold text-[#F97316]">{col.title}: </span>
                {col.body}
              </p>
            ))
          : topic.paragraphs.map((p, i) => (
              <p key={i} className="text-[#B8C4D3] text-sm leading-relaxed">
                {p}
              </p>
            ))}
      </div>

      <a
        href={cgEvent.checkoutUrl}
        onClick={() => track(`topic_section_${index}_cta_click`)}
        className="text-[#1677FF] font-bold text-sm hover:text-[#0B5ED7] transition-colors"
      >
        {topic.ctaLabel} →
      </a>
    </div>
  );
}

function TopicSectionsGroup() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgTopicSectionsHeading}
        </h2>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4">
          {cgTopicSections.map((topic, i) => (
            <TopicSectionBlock key={i} topic={topic} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Foundation Courses slider ----------
function FoundationCoursesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative mt-4">
      <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4">
        {cgFoundationCourses.map((course) => (
          <div
            key={course.number}
            className="snap-center shrink-0 w-[85%] sm:w-[50%] lg:w-[34%] min-h-[360px] rounded-md border border-[#E5E0D8] bg-[#F4EFE6] p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#F97316]/10 text-[#C2650A] text-xs font-bold uppercase">
                {course.tag}
              </span>
              <span className="text-4xl font-extrabold text-[#E5DDD0]" style={{ fontFamily: "var(--font-display)" }}>
                {String(course.number).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#142033] mb-2">{course.title}</h3>
            <p className="text-[#526176] text-sm leading-relaxed">{course.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => { scroll(-1); track("foundation_slider_prev_click"); }}
        aria-label="Previous course"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F1D2E] border-2 border-white/25 items-center justify-center text-white hover:bg-[#1677FF] transition-colors shadow"
      >
        ←
      </button>
      <button
        onClick={() => { scroll(1); track("foundation_slider_next_click"); }}
        aria-label="Next course"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F1D2E] border-2 border-white/25 items-center justify-center text-white hover:bg-[#1677FF] transition-colors shadow"
      >
        →
      </button>
    </div>
  );
}

// ---------- This Session Isn't For Everyone ----------
function SessionNotForSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 36px)" }}
        >
          {cgSessionNotFor.heading}
        </h2>
        <p className="text-[#B8C4D3] text-base md:text-lg leading-relaxed mb-6">{cgSessionNotFor.intro}</p>
        <p className="text-white font-semibold mb-4">{cgSessionNotFor.subheading}</p>
        <ul className="flex flex-col gap-3 mb-8 text-left max-w-md mx-auto">
          {cgSessionNotFor.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <IconX />
              <span className="text-[#D8E0EA] text-base">{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-white font-semibold text-lg">{cgSessionNotFor.closing}</p>
      </div>
    </section>
  );
}

// ---------- Meet the Instructor ----------
function InstructorSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[900px] mx-auto px-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
          <div className="relative w-full aspect-square rounded-md overflow-hidden border-2 border-white/20 mx-auto md:mx-0 max-w-[240px]">
            <Image src={cgInstructor.photo} alt={cgInstructor.name} fill loading="lazy" className="object-cover" />
          </div>
          <div>
            <p className="text-[#F97316] font-bold text-sm uppercase tracking-wide mb-2">Meet the Instructor</p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 36px)" }}
            >
              <Underline color="#F97316">Balajee Seshadri</Underline>
            </h2>
            <p className="text-[#B8C4D3] text-base leading-relaxed mb-4">
              <Underline color="#3B82F6">40+ years</Underline> in the Electronics Industry. Professional experience in India, plus
              work in the <Underline color="#4ADE80">USA</Underline>, <Underline color="#4ADE80">Germany</Underline>, and <Underline color="#4ADE80">Canada</Underline>.
            </p>
            <p className="text-[#B8C4D3] text-base leading-relaxed mb-4">
              Balajee Seshadri writes regularly about Electronics careers, industry expectations, fundamentals,
              modern skills, internships, interviews, and the real problems students face.
            </p>
            <p className="text-[#B8C4D3] text-base leading-relaxed mb-4">
              His guidance is direct. He doesn't hide the hard parts. He doesn't promise shortcuts. He asks
              students to understand where they actually stand, strengthen the fundamentals that matter, and
              prepare consistently from there.
            </p>
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("instructor_cta_click")}
              className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
            >
              {cgInstructor.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Generic text section (reused for Section2, Interview Split parts, Stage Markers) ----------
function TextSection({
  heading,
  paragraphs,
  ctaLabel,
  bg,
  trackId,
}: {
  heading: string;
  paragraphs: string[];
  ctaLabel: string;
  bg: string;
  trackId: string;
}) {
  return (
    <section className={`${bg} py-10 md:py-14`}>
      <div className="max-w-[800px] mx-auto px-6">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.6vw, 36px)" }}
        >
          {heading}
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#B8C4D3] text-base md:text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <a
          href={cgEvent.checkoutUrl}
          onClick={() => track(`${trackId}_cta_click`)}
          className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

// ---------- Interview Split (dedicated two-column design) ----------
function InterviewSplitSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgInterviewSplit.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {cgInterviewSplit.columns.map((col, i) => (
            <div key={i} className="rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 md:p-8">
              <h3 className="font-bold text-[#F97316] text-lg md:text-xl mb-3 uppercase tracking-wide">
                {col.title}
              </h3>
              <p className="text-[#B8C4D3] text-base leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>
        <p className="text-[#B8C4D3] text-base leading-relaxed text-center max-w-2xl mx-auto mb-8">
          {cgInterviewSplit.supporting}
        </p>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("interview_split_cta_click")}
            className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            {cgInterviewSplit.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Stage markers (When Should You Start Preparing) ----------
function StageMarkersSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[900px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgWhenToStart.heading}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {cgStages.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full border-2 border-white/25 bg-[#0F1D2E] text-white font-semibold text-sm md:text-base">
                {s}
              </span>
              {i < cgStages.length - 1 && <span className="text-white/20">→</span>}
            </div>
          ))}
        </div>
        {cgWhenToStart.paragraphs.map((p, i) => (
          <p key={i} className="text-[#B8C4D3] text-base md:text-lg leading-relaxed text-center mb-3">
            {p}
          </p>
        ))}
        <div className="text-center mt-6">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("when_to_start_cta_click")}
            className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            {cgWhenToStart.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- What You Get For This Session (merged Offer + Foundation Courses) ----------
function WhatYouGetSection() {
  return (
    <section id="register" className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden">
      <GridOverlay />
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 md:p-10">
          <h2
            className="font-bold text-white text-center mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            {cgWhatYouGet.heading}
            <span className="relative inline-block text-[#F97316]">
              {cgWhatYouGet.headingHighlight}
              <HandDrawnUnderline color="#F97316" />
            </span>
            {cgWhatYouGet.headingAfter}
          </h2>

          <div className="max-w-[720px] mx-auto">
            <div className="flex flex-col gap-4 mb-10">
              {cgWhatYouGet.items.map((item, i) => (
                <div key={i} className="rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6">
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-[#B8C4D3] text-base leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md border-2 border-white/20 bg-[#0F1D2E] p-6 mb-6">
              <h3 className="font-bold text-white text-lg mb-2">{cgWhatYouGet.subsectionHeading}</h3>
              <p className="text-[#B8C4D3] text-base leading-relaxed">{cgWhatYouGet.subsectionBody}</p>
            </div>
          </div>

          <p className="text-center text-white font-semibold text-lg mb-2">All 10 Foundation Courses Included</p>
          <FoundationCoursesSlider />

          <div className="text-center mt-10">
            <p className="font-display font-extrabold text-[#F97316] mb-1" style={{ fontSize: "48px" }}>
              ₹{cgEvent.price}
            </p>
            <p className="text-[#8393A6] text-sm uppercase tracking-wide font-semibold mb-6">
              One-Time Session Registration
            </p>
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("what_you_get_cta_click")}
              className="cg-cta-glow inline-block w-full sm:w-auto px-10 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-lg transition-colors"
            >
              {cgWhatYouGet.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Trust statement ----------
function TrustStatementSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgTrustStatement.heading}
        </h2>
        {cgTrustStatement.paragraphs.map((p, i) => (
          <p key={i} className="text-[#B8C4D3] text-base md:text-lg leading-relaxed mb-4">
            {p}
          </p>
        ))}
        <a
          href={cgEvent.checkoutUrl}
          onClick={() => track("trust_cta_click")}
          className="cg-cta-glow inline-block mt-4 px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
        >
          {cgTrustStatement.ctaLabel}
        </a>
      </div>
    </section>
  );
}

// ---------- How to register ----------
function HowToRegisterSection() {
  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[700px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          How to Register
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {cgHowToRegister.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#1677FF] text-white font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-white text-base leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("how_to_register_cta_click")}
            className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Complete My Registration
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#16283D] py-10 md:py-14 relative overflow-hidden border-t border-white/10">
      <GridOverlay />
      <div className="max-w-[800px] mx-auto px-6">
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3 mb-8">
          {cgFaqs.map((faq, i) => (
            <div key={i} className="rounded-lg border-2 border-white/20 bg-[#0F1D2E] overflow-hidden">
              <button
                onClick={() => {
                  const next = open === i ? null : i;
                  setOpen(next);
                  if (next !== null) track(`faq_toggle_open_q${i + 1}`);
                }}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-white text-sm md:text-base pr-4">{faq.q}</span>
                <span className="text-[#1677FF] text-xl shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-[#B8C4D3] text-sm md:text-base leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("faq_cta_click")}
            className="cg-cta-glow inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Register for ₹99
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function CgFooter() {
  return (
    <footer className="bg-[#16283D] pt-14 pb-44 sm:pb-36 md:pb-28 px-6 relative overflow-hidden">
      <GridOverlay />
      <div className="max-w-[1000px] mx-auto text-center">
        <Image src="/images/icon.png" alt="eTalVis" width={88} height={88} className="h-20 w-auto mx-auto mb-4" />
        <p className="text-white font-semibold mb-1">Core Electronics Career Guidance</p>
        <p className="text-[#8393A6] text-sm mb-1">Conducted by Balajee Seshadri</p>
        <p className="text-[#8393A6] text-sm mb-6">
          {cgEvent.date} · {cgEvent.time}
        </p>

        <div className="flex flex-col items-center gap-1 mb-6 text-sm">
          <p className="text-[#8393A6]">Registration Support</p>
          <a
            href={cgEvent.whatsappLink}
            onClick={() => track("whatsapp_support_click")}
            className="text-white hover:text-[#F97316]"
          >
            WhatsApp: {cgEvent.whatsapp}
          </a>
          <a
            href={cgEvent.instructorLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("instructor_linkedin_footer_click")}
            className="text-white hover:text-[#F97316]"
          >
            Balajee Seshadri's LinkedIn Profile
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-[#8393A6] mb-6">
          <a href="/privacy-policy" onClick={() => track("privacy_policy_click")} className="hover:text-white">Privacy Policy</a>
        </div>

        <p className="text-[#526176] text-xs mb-3">© 2026 eTalVis. All rights reserved.</p>
        <p className="text-[#7A8CA3] text-sm sm:text-base font-medium">
          Landing page, SEO & AI Discoverability by{" "}
          <a
            href="https://www.linkedin.com/in/raghavkanva"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("footer_credit_link_click")}
            className="text-[#4A5568] hover:text-[#F97316] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
          >
            Raghav Kanva
          </a>
        </p>
      </div>
    </footer>
  );
}

// ---------- Sticky bottom bar ----------
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-0">
      <div
        className="bg-[#0A1628] text-white font-bold rounded-md text-xl md:text-2xl px-2.5 py-1.5 tabular-nums border-2 border-white/20"
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[8px] md:text-[9px] text-white/50 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function StickyBar() {
  const time = useCountdown(cgEvent.registrationClosesISO);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A1628] border-t border-white/10 shadow-2xl cg-animate-fade-up">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <div className="shrink-0 text-center">
            <p className="text-white font-bold text-sm">CORE ELECTRONICS CAREER GUIDANCE</p>
            <p className="text-[#8393A6] text-xs">
              {cgEvent.date} · {cgEvent.time}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[#F97316] text-xs font-bold uppercase tracking-wide mb-1.5">
              Registration Closes In
            </p>
            <div className="flex items-center gap-1.5">
              <CountdownUnit value={time.days} label="Days" />
              <span className="text-white/30 -mt-3">:</span>
              <CountdownUnit value={time.hours} label="Hrs" />
              <span className="text-white/30 -mt-3">:</span>
              <CountdownUnit value={time.minutes} label="Min" />
              <span className="text-white/30 -mt-3">:</span>
              <CountdownUnit value={time.seconds} label="Sec" />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-[#F97316] font-extrabold text-xl">₹{cgEvent.price}</p>
              <p className="text-[#8393A6] text-[10px]">Recording + Foundation course included</p>
            </div>
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("sticky_bar_cta_click")}
              className="cg-cta-glow cg-border-cycle px-6 py-3 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-sm whitespace-nowrap transition-colors"
            >
              Register for ₹99
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-2">
          <p className="text-white font-bold text-xs text-center">
            CORE ELECTRONICS CAREER GUIDANCE
            <br />
            {cgEvent.date} · {cgEvent.time}
          </p>
          <div className="flex items-center justify-center gap-1">
            <CountdownUnit value={time.days} label="Days" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.hours} label="Hrs" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Min" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Sec" />
          </div>
          <p
            className="text-center text-[#F97316] text-xs font-bold uppercase tracking-wide cg-animate-pulse-dot"
            style={{ textShadow: "0 0 12px rgba(249,115,22,0.7)" }}
          >
            Registration Closes Soon
          </p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#F97316] font-extrabold text-xl">₹{cgEvent.price}</span>
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("sticky_bar_mobile_cta_click")}
              className="cg-border-cycle flex-1 text-center px-4 py-2.5 rounded-md bg-[#1677FF] text-white font-bold text-sm"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function CareerGuidanceClient() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: cgEvent.sessionName,
    startDate: cgEvent.dateISO,
    endDate: cgEvent.endISO,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Balajee Seshadri",
    url: cgEvent.instructorLinkedin,
    jobTitle: "Embedded Systems Engineer",
    description:
      "40+ years of Electronics Industry experience, including work in the USA, Germany, and Canada.",
  };

  return (
    <main className="bg-[#16283D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <Header />
      <Hero />
      <QuestionsSection />
      <WhySessionExistsSection />
      <WhoIsThisForSection />
      <YourStartingLineSection />
      <WhatStudentsSaySection />
      <ConfusionsSection />
      <TopicSectionsGroup />
      <InterviewSplitSection />
      <SessionNotForSection />
      <InstructorSection />
      <TextSection
        heading={cgSection2.heading}
        paragraphs={cgSection2.paragraphs}
        ctaLabel={cgSection2.ctaLabel}
        bg="bg-[#16283D]"
        trackId="next_step"
      />
      <StageMarkersSection />
      <WhatYouGetSection />
      <TrustStatementSection />
      <HowToRegisterSection />
      <FaqSection />
      <CgFooter />
      <StickyBar />
    </main>
  );
}