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
  cgSpecialization,
  cgFundamentals,
  cgRewardedSkill,
  cgStages,
  cgWhenToStart,
  cgTier3,
  cgEnglish,
  cgCoaching,
  cgInternship,
  cgAI,
  cgConfusions,
  cgInstructor,
  cgStudentLinkedInProof,
  cgTestimonials,
  cgOffer,
  cgWhyFoundation,
  cgTrustStatement,
  cgHowToRegister,
  cgFaqs,
  cgFinalCta,
  cgFoundationCourses,
} from "@/data/careerSession";

// ---------- Colors (from brief, used as arbitrary Tailwind values) ----------
// dark navy: #081525   alt dark: #0A1628
// light: #F7FAFC       alt light: #F4F8FC
// text dark-on-light: #142033   secondary text: #526176
// CTA: #1677FF   CTA hover: #0B5ED7
// accent/urgency: #F97316   success/included: #16A34A

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#F97316] shrink-0">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />
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
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6H4a3 3 0 003 3M17 6h3a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconChatBubble() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconCpu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M7 3v2M17 3v2M7 19v2M17 19v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F97316] shrink-0">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function SectionIcon({ icon: Icon }: { icon: () => JSX.Element }) {
  return (
    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F97316]/10 mb-4">
      <Icon />
    </span>
  );
}

// ---------- Countdown display (digit-flip style) ----------
function CountdownUnit({ value, label, size = "md" }: { value: number; label: string; size?: "md" | "sm" }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 500);
      setPrev(value);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const boxSize = size === "sm" ? "text-base px-1.5 py-1" : "text-xl md:text-2xl px-2.5 py-1.5";

  return (
    <div className="flex flex-col items-center min-w-0">
      <div
        className={`bg-[#0A1628] text-white font-bold rounded-md ${boxSize} tabular-nums border border-white/10 ${flip ? "cg-animate-flip" : ""}`}
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[8px] md:text-[9px] text-white/50 mt-1 uppercase tracking-wide">{label}</span>
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
        solid ? "bg-[#081525] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/icon.png" alt="eTalVis" width={56} height={56} className="h-12 md:h-14 w-auto" />
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

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative bg-[#081525] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* subtle background details */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#1677FF] opacity-10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-start">
        <div className="cg-animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] text-xs md:text-sm font-bold uppercase tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] cg-animate-pulse-dot" />
            {cgHero.label}
          </span>

          <h1
            className="text-white font-extrabold leading-[1.2] mb-5 cg-animate-blur-in"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4.2vw, 52px)", animationDelay: "0.1s" }}
          >
            {cgHero.headline}
          </h1>

          <div
            className="rounded-lg border border-white/15 bg-white/[0.06] px-5 py-4 mb-3 cg-animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-white font-bold text-lg md:text-xl leading-snug">{cgHero.subhead}</p>
          </div>
          <div
            className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 mb-3 cg-animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-[#F97316] font-bold text-xs uppercase tracking-wide mb-2.5">This is for you if you are</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { icon: IconBriefcase, text: "Final-year students" },
                { icon: IconGraduationCap, text: "Students who just finished 12th, joining ECE, EEE, EIE, BME or Mechatronics" },
                { icon: IconTrophy, text: "Recent graduates" },
                { icon: IconBook, text: "2nd and 3rd year students" },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5"><Icon /></span>
                  <span className="text-white font-semibold text-base md:text-lg leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-lg border border-[#F97316]/30 bg-[#F97316]/10 px-5 py-4 mb-8 cg-animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-white font-bold text-base md:text-lg leading-snug">{cgHero.instructorLine}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-8 max-w-sm">
            <div className="flex items-center gap-2 text-white mb-2">
              <IconCalendar />
              <span className="font-semibold text-sm md:text-base">{cgEvent.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white mb-2">
              <IconClock />
              <span className="font-semibold text-sm md:text-base">{cgEvent.time}</span>
            </div>
            <p className="text-[#8393A6] text-sm">{cgEvent.format}</p>
            <p className="text-[#F97316] font-bold text-lg mt-2">Registration Fee: ₹{cgEvent.price}</p>
          </div>

          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("hero_cta_click")}
            className="cg-cta-glow inline-block px-8 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base md:text-lg transition-colors mb-5"
          >
            {cgHero.ctaLabel}
          </a>

          <p className="text-sm text-[#8393A6] leading-relaxed">{cgHero.benefitLine}</p>
        </div>

        <div className="cg-animate-fade-up flex justify-center lg:justify-end pt-2" style={{ animationDelay: "0.25s" }}>
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-white/10">
            <Image
              src={cgInstructor.photo}
              alt="Balajee Seshadri"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Generic light/dark text section ----------
function TextSection({
  heading,
  paragraphs,
  ctaLabel,
  dark = false,
  bg,
  trackId,
  icon,
}: {
  heading: string;
  paragraphs: string[];
  ctaLabel: string;
  dark?: boolean;
  bg?: string;
  trackId: string;
  icon?: () => JSX.Element;
}) {
  return (
    <section className={`${bg ?? (dark ? "bg-[#0A1628]" : "bg-[#F7FAFC]")} py-10 md:py-14`}>
      <div className="max-w-[800px] mx-auto px-6">
        {icon && <SectionIcon icon={icon} />}
        <h2
          className={`font-bold mb-6 cg-animate-fade-up ${dark ? "text-white" : "text-[#142033]"}`}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.6vw, 36px)" }}
        >
          {heading}
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-base md:text-lg leading-relaxed ${dark ? "text-[#B8C4D3]" : "text-[#526176]"}`}
            >
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

// ---------- Section 3: Stage cards ----------
function StageCardsSection() {
  return (
    <section className="bg-[#F7FAFC] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          This Session Is Relevant to Your Present Stage
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cgStageCards.map((card, i) => (
            <div
              key={i}
              className={`cg-tilt-hover rounded-xl border border-[#D5DEE8] bg-white p-6 flex flex-col cg-animate-fade-up ${
                i === 0 ? "border-2 border-[#F97316]/40" : ""
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <h3 className="font-bold text-lg md:text-xl text-[#142033] mb-2">{card.title}</h3>
              <p className="text-[#526176] text-sm md:text-base leading-relaxed mb-5 flex-1">{card.body}</p>
              <a
                href={cgEvent.checkoutUrl}
                onClick={() => track(`stage_card_${i}_cta_click`)}
                className="text-[#1677FF] font-bold text-sm hover:text-[#0B5ED7] transition-colors"
              >
                {card.ctaLabel} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Questions ----------
function QuestionsSection() {
  return (
    <section className="bg-[#081525] py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
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
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] cg-animate-pulse-dot" />
          17 questions, one session
        </span>
        <h2
          className="font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)" }}
        >
          This Session Addresses the Questions Students Commonly Ask
        </h2>
        <p className="text-[#B8C4D3] text-base md:text-lg mb-10 max-w-2xl">
          You've probably heard different answers to most of these already. Here's what actually gets covered.
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {cgQuestions.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 cg-animate-clip-reveal"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span
                className="font-bold text-[#F97316] text-lg shrink-0"
                style={{ fontFamily: "var(--font-plex-mono), monospace" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-white text-lg md:text-xl font-semibold leading-snug pt-0.5">{q}</p>
            </div>
          ))}
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

// ---------- Section 5: Interview split ----------
function InterviewSplitSection() {
  return (
    <section className="bg-[#081525] py-10 md:py-14">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex justify-center"><SectionIcon icon={IconChatBubble} /></div>
        <h2
          className="font-bold text-white text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgInterviewSplit.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {cgInterviewSplit.columns.map((col, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
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
            onClick={() => track("interview_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            {cgInterviewSplit.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 9: Stage markers ----------
function StageMarkersSection() {
  return (
    <section className="bg-[#F7FAFC] py-10 md:py-14">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="flex justify-center"><SectionIcon icon={IconArrowRight} /></div>
        <h2
          className="font-bold text-[#142033] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgWhenToStart.heading}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {cgStages.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full border border-[#D5DEE8] bg-white text-[#142033] font-semibold text-sm md:text-base">
                {s}
              </span>
              {i < cgStages.length - 1 && <span className="text-[#D5DEE8]">→</span>}
            </div>
          ))}
        </div>
        {cgWhenToStart.paragraphs.map((p, i) => (
          <p key={i} className="text-[#526176] text-base md:text-lg leading-relaxed text-center mb-3">
            {p}
          </p>
        ))}
        <div className="text-center mt-6">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("when_to_start_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            {cgWhenToStart.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 15: Confusions grid ----------
function ConfusionsSection() {
  return (
    <section className="bg-[#F4F8FC] py-10 md:py-14">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          What This Session Will Help You Solve
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {cgConfusions.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-[#D5DEE8] bg-white px-4 py-3 cg-animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <IconX />
              <span className="text-[#142033] text-sm md:text-base">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-[#526176] text-center mb-2">
          This session will not decide your complete career for you.
        </p>
        <p className="text-[#526176] text-center mb-8">
          It will help you understand the questions you should ask before making that decision.
        </p>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("confusions_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Get Career Clarity for ₹99
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 16: Instructor ----------
function InstructorSection() {
  return (
    <section className="bg-[#F7FAFC] py-10 md:py-14">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#D5DEE8] mx-auto md:mx-0 max-w-[240px]">
            <Image src={cgInstructor.photo} alt={cgInstructor.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#F97316] font-bold text-sm uppercase tracking-wide mb-2">Meet the Instructor</p>
            <h2
              className="font-bold text-[#142033] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 36px)" }}
            >
              {cgInstructor.name}
            </h2>
            {cgInstructor.bio.map((p, i) => (
              <p key={i} className="text-[#526176] text-base leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("instructor_cta_click")}
              className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
            >
              {cgInstructor.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 18: Student LinkedIn testimonial proof (separate) ----------
function StudentLinkedInProofSection() {
  return (
    <section className="bg-[#F7FAFC] py-10 md:py-14">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Students Sharing Their Own Experience
        </h2>
        <p className="text-[#526176] text-center max-w-2xl mx-auto mb-10">
          Real posts from students who've taken eTalVis courses, shared on their own LinkedIn profiles.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {cgStudentLinkedInProof.map((post, i) => (
            <div key={i} className="rounded-xl border border-[#D5DEE8] bg-white p-5 flex flex-col">
              <IconLinkedIn />
              <p className="font-bold text-[#142033] text-sm mt-3 mb-1">{post.name}</p>
              <p className="text-[#526176] text-sm leading-relaxed mb-4 flex-1">{post.summary}</p>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("student_linkedin_post_click")}
                className="text-[#1677FF] text-sm font-semibold hover:text-[#0B5ED7]"
              >
                View post →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 19: Testimonials carousel ----------
function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#F4F8FC] py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          What Students Say
        </h2>
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4"
        >
          {cgTestimonials.map((t, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] rounded-xl border border-[#D5DEE8] bg-white p-6 flex flex-col"
            >
              <p className="text-[#526176] text-sm md:text-base leading-relaxed mb-4 flex-1">"{t.quote}"</p>
              <p className="font-bold text-[#142033] text-sm">{t.name}</p>
              <p className="text-[#8393A6] text-xs mb-2">{t.title}</p>
              <a
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("testimonial_linkedin_click")}
                className="text-[#1677FF] text-xs font-semibold hover:text-[#0B5ED7]"
              >
                View on LinkedIn
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("testimonials_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Join Students Who Want to Prepare Seriously
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 20: Offer ----------
function OfferSection() {
  return (
    <section id="register" className="bg-[#F7FAFC] py-10 md:py-14">
      <div className="max-w-[700px] mx-auto px-6">
        <div className="rounded-2xl border-2 border-[#081525] bg-white p-6 md:p-10 shadow-lg">
          <h2
            className="font-bold text-[#142033] text-center mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 36px)" }}
          >
            {cgOffer.heading}
          </h2>
          <div className="flex flex-col gap-3 mb-8">
            {cgOffer.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <IconCheck />
                <span className="text-[#142033] text-base">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mb-6">
            <p
              className="font-extrabold text-[#F97316]"
              style={{ fontFamily: "var(--font-display)", fontSize: "56px" }}
            >
              ₹{cgEvent.price}
            </p>
            <p className="text-[#8393A6] text-sm uppercase tracking-wide font-semibold">
              One-Time Session Registration
            </p>
          </div>
          <div className="text-center">
            <a
              href={cgEvent.checkoutUrl}
              onClick={() => track("offer_cta_click")}
              className="cg-cta-glow inline-block w-full sm:w-auto px-10 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-lg transition-colors mb-4"
            >
              {cgOffer.ctaLabel}
            </a>
            <p className="text-[#526176] text-sm">
              {cgEvent.date} · {cgEvent.time} · {cgEvent.format}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 21: Foundation courses slider ----------
function FoundationCoursesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="bg-[#F4F8FC] py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          {cgWhyFoundation.heading}
        </h2>
        {cgWhyFoundation.paragraphs.map((p, i) => (
          <p key={i} className="text-[#526176] text-center max-w-2xl mx-auto mb-3">
            {p}
          </p>
        ))}

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory cg-scrollbar-hide pb-4"
          >
            {cgFoundationCourses.map((course) => (
              <div
                key={course.number}
                className="cg-tilt-hover snap-center shrink-0 w-[80%] sm:w-[46%] lg:w-[31%] rounded-2xl border border-[#D5DEE8] bg-white p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase">
                    {course.tag}
                  </span>
                  <span className="text-4xl font-extrabold text-[#E8EDF3]" style={{ fontFamily: "var(--font-display)" }}>
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
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#D5DEE8] items-center justify-center text-[#142033] hover:bg-[#1677FF] hover:text-white transition-colors shadow"
          >
            ←
          </button>
          <button
            onClick={() => { scroll(1); track("foundation_slider_next_click"); }}
            aria-label="Next course"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#D5DEE8] items-center justify-center text-[#142033] hover:bg-[#1677FF] hover:text-white transition-colors shadow"
          >
            →
          </button>
        </div>

        <div className="text-center mt-8">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("foundation_courses_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            {cgWhyFoundation.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 22: Trust statement ----------
function TrustStatementSection() {
  return (
    <section className="bg-[#081525] py-10 md:py-14">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <div className="flex justify-center"><SectionIcon icon={IconShield} /></div>
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
          className="inline-block mt-4 px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
        >
          {cgTrustStatement.ctaLabel}
        </a>
      </div>
    </section>
  );
}

// ---------- Section 23: How to register ----------
function HowToRegisterSection() {
  return (
    <section className="bg-[#F7FAFC] py-10 md:py-14">
      <div className="max-w-[700px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-10"
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
              <p className="text-[#142033] text-base leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("how_to_register_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Complete My Registration
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 24: FAQ ----------
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#F4F8FC] py-10 md:py-14">
      <div className="max-w-[800px] mx-auto px-6">
        <h2
          className="font-bold text-[#142033] text-center mb-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3 mb-8">
          {cgFaqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-[#D5DEE8] bg-white overflow-hidden">
              <button
                onClick={() => {
                  const next = open === i ? null : i;
                  setOpen(next);
                  if (next !== null) track(`faq_toggle_open_q${i + 1}`);
                }}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-[#142033] text-sm md:text-base pr-4">{faq.q}</span>
                <span className="text-[#1677FF] text-xl shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-[#526176] text-sm md:text-base leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={cgEvent.checkoutUrl}
            onClick={() => track("faq_cta_click")}
            className="inline-block px-7 py-3.5 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-base transition-colors"
          >
            Register for ₹99
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCtaSection() {
  return (
    <section className="bg-[#081525] py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2
          className="font-bold text-white mb-8"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 5vw, 44px)" }}
        >
          {cgFinalCta.heading}
        </h2>
        {cgFinalCta.paragraphs.map((p, i) => (
          <p key={i} className="text-[#B8C4D3] text-base md:text-lg leading-relaxed mb-3">
            {p}
          </p>
        ))}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 my-8 max-w-md mx-auto">
          <p className="text-white font-semibold">{cgEvent.date}</p>
          <p className="text-white font-semibold">{cgEvent.time}</p>
          <p className="text-[#8393A6] text-sm mt-1">{cgEvent.format}</p>
          <p className="text-[#F97316] font-bold text-lg mt-2">Registration Fee: ₹{cgEvent.price}</p>
        </div>
        <a
          href={cgEvent.checkoutUrl}
          onClick={() => track("final_cta_click")}
          className="cg-cta-glow inline-block px-10 py-4 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-lg transition-colors"
        >
          {cgFinalCta.ctaLabel}
        </a>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function CgFooter() {
  return (
    <footer className="bg-[#081525] pt-14 pb-44 sm:pb-36 md:pb-28 px-6">
      <div className="max-w-[1000px] mx-auto text-center">
        <Image src="/images/icon.png" alt="eTalVis" width={64} height={64} className="h-16 w-auto mx-auto mb-4" />
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
            href="https://raghavkanva.com"
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
function StickyBar() {
  const time = useCountdown(cgEvent.registrationClosesISO);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A1628] border-t border-white/10 shadow-2xl cg-animate-fade-up">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <div className="shrink-0">
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
              <CountdownUnit value={time.days} label="Days" size="sm" />
              <span className="text-white/30 -mt-2.5">:</span>
              <CountdownUnit value={time.hours} label="Hrs" size="sm" />
              <span className="text-white/30 -mt-2.5">:</span>
              <CountdownUnit value={time.minutes} label="Min" size="sm" />
              <span className="text-white/30 -mt-2.5">:</span>
              <CountdownUnit value={time.seconds} label="Sec" size="sm" />
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
              className="cg-cta-glow px-6 py-3 rounded-md bg-[#1677FF] hover:bg-[#0B5ED7] text-white font-bold text-sm whitespace-nowrap transition-colors"
            >
              Register for ₹99
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-2.5">
          <div className="text-white font-semibold text-xs">
            {cgEvent.date.replace(", 2026", "")} · {cgEvent.time.split("–")[0].trim()}
          </div>
          <div className="flex items-center justify-center gap-1">
            <CountdownUnit value={time.days} label="Days" size="sm" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.hours} label="Hrs" size="sm" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Min" size="sm" />
            <span className="text-white/30 -mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Sec" size="sm" />
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
              className="flex-1 text-center px-4 py-2.5 rounded-md bg-[#1677FF] text-white font-bold text-sm"
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
    <main className="bg-[#F7FAFC]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <Header />
      <Hero />
      <QuestionsSection />
      <TestimonialsSection />

      <TextSection
        heading={cgSection2.heading}
        paragraphs={cgSection2.paragraphs}
        ctaLabel={cgSection2.ctaLabel}
        trackId="next_step"
        icon={IconMap}
      />

      <StageCardsSection />

      <TextSection
        heading={cgSpecialization.heading}
        paragraphs={cgSpecialization.paragraphs}
        ctaLabel={cgSpecialization.ctaLabel}
        bg="bg-[#F7FAFC]"
        trackId="specialization"
        icon={IconCompass}
      />

      <TextSection
        heading={cgFundamentals.heading}
        paragraphs={cgFundamentals.paragraphs}
        ctaLabel={cgFundamentals.ctaLabel}
        bg="bg-[#F4F8FC]"
        trackId="fundamentals"
        icon={IconBook}
      />

      <TextSection
        heading={cgRewardedSkill.heading}
        paragraphs={cgRewardedSkill.paragraphs}
        ctaLabel={cgRewardedSkill.ctaLabel}
        dark
        trackId="rewarded_skill"
        icon={IconTrophy}
      />

      <StageMarkersSection />

      <TextSection
        heading={cgTier3.heading}
        paragraphs={cgTier3.paragraphs}
        ctaLabel={cgTier3.ctaLabel}
        bg="bg-[#F4F8FC]"
        trackId="tier3"
        icon={IconBuilding}
      />

      <TextSection
        heading={cgEnglish.heading}
        paragraphs={cgEnglish.paragraphs}
        ctaLabel={cgEnglish.ctaLabel}
        bg="bg-[#F7FAFC]"
        trackId="english"
        icon={IconChatBubble}
      />

      <TextSection
        heading={cgCoaching.heading}
        paragraphs={cgCoaching.paragraphs}
        ctaLabel={cgCoaching.ctaLabel}
        bg="bg-[#F4F8FC]"
        trackId="coaching"
        icon={IconGraduationCap}
      />

      <TextSection
        heading={cgInternship.heading}
        paragraphs={cgInternship.paragraphs}
        ctaLabel={cgInternship.ctaLabel}
        bg="bg-[#F7FAFC]"
        trackId="internship"
        icon={IconBriefcase}
      />

      <TextSection
        heading={cgAI.heading}
        paragraphs={cgAI.paragraphs}
        ctaLabel={cgAI.ctaLabel}
        dark
        bg="bg-[#081525]"
        trackId="ai_future"
        icon={IconCpu}
      />

      <ConfusionsSection />
      <InstructorSection />
      <StudentLinkedInProofSection />
      <OfferSection />
      <FoundationCoursesSlider />
      <TrustStatementSection />
      <HowToRegisterSection />
      <InterviewSplitSection />
      <FaqSection />
      <FinalCtaSection />
      <CgFooter />
      <StickyBar />
    </main>
  );
}