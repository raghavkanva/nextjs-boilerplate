"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHECKOUT_URL =
  "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48";
const LINKEDIN_URL = "https://www.linkedin.com/in/balajeeseshadri/";
const WHATSAPP_URL = "https://wa.me/919790873099";

const ELECTRONICS_SECTIONS = [
  "Electrical Fundamentals",
  "Electronics Fundamentals",
  "Number Systems",
  "Digital Electronics",
];

const C_SECTIONS = [
  "Introduction to Programming",
  "Introduction to C Programming",
  "Simple Programming Practice",
  "Decision Making and Loops",
  "Arrays, Strings, and Pointers",
  "Structures",
  "Storage Class",
];

const FAQ_ITEMS = [
  {
    q: "Who is this pack for?",
    a: "The pack is designed for Electronics Engineering students and beginners who are interested in the Embedded Systems field and want to strengthen their Electronics and C Programming foundations first.",
  },
  {
    q: "What courses are included?",
    a: "The Starter Pack includes the Electronics Foundation Course and the C Programming Foundation Course.",
  },
  {
    q: "How long can I access the courses?",
    a: "The pack is valid for 2 months from the date of purchase.",
  },
  {
    q: "Where can I watch the courses?",
    a: "After purchasing, visit learn.etalvis.com or use the eTalVis Android or iOS app.",
  },
  {
    q: "Do I need prior knowledge before joining?",
    a: "No. This pack is intended as a starting point for students who are interested in the field and want to build their foundations first.",
  },
  {
    q: "Why are Electronics and C Programming included together?",
    a: "Working with hardware requires an understanding of Electronics. Writing software for it requires C Programming. These are the two starting foundations.",
  },
  {
    q: "Does this pack include the full Foundation Course?",
    a: "No. This pack contains two foundation courses: Electronics Foundation and C Programming Foundation. It is designed as an entry point.",
  },
  {
    q: "What comes after completing these courses?",
    a: "After strengthening these two foundations, you can continue into deeper topics through the eTalVis learning pathway.",
  },
];

// ─── Design helpers ──────────────────────────────────────────────────────────

const LABEL =
  "font-mono text-[13px] uppercase tracking-[0.1em] text-[#64748B] font-medium";

// ─── SVG: Noise → Clarity (mobile-friendly) ──────────────────────────────────

function NoiseToClarityDiagram() {
  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xl mx-auto"
      aria-label="Diagram showing how advanced topics converge into two foundations: Electronics and C Programming"
      role="img"
    >
      {/* Top label */}
      <text x={210} y={18} textAnchor="middle" fill="#9CA3AF" fontSize={10} fontFamily="monospace" letterSpacing={1} fontWeight={500}>
        LATER TOPICS
      </text>

      {/* Upper nodes - condensed */}
      {[
        { x: 55, label: "ARM" },
        { x: 130, label: "RTOS" },
        { x: 210, label: "GPIO" },
        { x: 290, label: "PROTOCOLS" },
        { x: 365, label: "MCU" },
      ].map(({ x, label }) => (
        <g key={label}>
          <rect
            x={x - 30}
            y={26}
            width={label.length * 7 + 4}
            height={22}
            rx={5}
            fill="#F4F7F5"
            stroke="#E5E7EB"
            strokeWidth={1}
          />
          <text
            x={x + (label.length * 7 + 4) / 2 - 30}
            y={41}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize={9}
            fontFamily="monospace"
            letterSpacing={0.8}
            fontWeight={500}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Converging lines */}
      {[55, 130, 210].map((x) => (
        <line key={x} x1={x + 5} y1={48} x2={140} y2={150} stroke="#E5E7EB" strokeWidth={1} strokeLinecap="round" />
      ))}
      {[210, 290, 365].map((x) => (
        <line key={x} x1={x + 5} y1={48} x2={280} y2={150} stroke="#E5E7EB" strokeWidth={1} strokeLinecap="round" />
      ))}

      {/* Active convergence lines */}
      <line x1={140} y1={150} x2={140} y2={170} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <line x1={280} y1={150} x2={280} y2={170} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />

      {/* Foundation nodes */}
      <rect x={60} y={170} width={160} height={44} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={140} y={189} textAnchor="middle" fill="#15803D" fontSize={11} fontFamily="monospace" letterSpacing={0.8} fontWeight={700}>
        ELECTRONICS
      </text>
      <text x={140} y={205} textAnchor="middle" fill="#15803D" fontSize={9} fontFamily="monospace" letterSpacing={0.6} fontWeight={500}>
        FOUNDATION
      </text>

      <rect x={200} y={170} width={160} height={44} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={280} y={189} textAnchor="middle" fill="#15803D" fontSize={11} fontFamily="monospace" letterSpacing={0.8} fontWeight={700}>
        C PROGRAMMING
      </text>
      <text x={280} y={205} textAnchor="middle" fill="#15803D" fontSize={9} fontFamily="monospace" letterSpacing={0.6} fontWeight={500}>
        FOUNDATION
      </text>

      {/* Lines to bottom node */}
      <line x1={140} y1={214} x2={210} y2={240} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <line x1={280} y1={214} x2={210} y2={240} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />

      {/* Bottom node */}
      <rect x={120} y={240} width={180} height={16} rx={8} fill="#22C55E" />
      <text x={210} y={252} textAnchor="middle" fill="white" fontSize={9} fontFamily="monospace" letterSpacing={0.8} fontWeight={700}>
        YOUR JOURNEY BEGINS HERE
      </text>
    </svg>
  );
}

// ─── SVG: Learning Path ───────────────────────────────────────────────────────

function StarterLearningPath() {
  return (
    <svg
      viewBox="0 0 640 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Learning path: Step 1 Electronics, Step 2 C Programming, then future stages"
      role="img"
    >
      <text x={10} y={14} fill="#22C55E" fontSize={8} fontFamily="monospace" letterSpacing={1} fontWeight={700}>INCLUDED IN STARTER PACK</text>

      <rect x={10} y={22} width={140} height={64} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={24} y={42} fill="#22C55E" fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={700}>STEP_01</text>
      <text x={24} y={58} fill="#111827" fontSize={11} fontFamily="sans-serif" fontWeight={700}>Electronics</text>
      <text x={24} y={73} fill="#4B5563" fontSize={9} fontFamily="monospace">Foundation</text>

      <line x1={150} y1={54} x2={168} y2={54} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <polyline points="164,49 169,54 164,59" stroke="#22C55E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <rect x={170} y={22} width={140} height={64} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={184} y={42} fill="#22C55E" fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={700}>STEP_02</text>
      <text x={184} y={58} fill="#111827" fontSize={11} fontFamily="sans-serif" fontWeight={700}>C Programming</text>
      <text x={184} y={73} fill="#4B5563" fontSize={9} fontFamily="monospace">Foundation</text>

      <line x1={312} y1={54} x2={340} y2={54} stroke="#D1D5DB" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="4 3" />

      <text x={344} y={14} fill="#9CA3AF" fontSize={8} fontFamily="monospace" letterSpacing={1} fontWeight={600}>YOUR NEXT LEARNING STAGES</text>

      {[
        { x: 344, label1: "Embedded", label2: "Hardware" },
        { x: 464, label1: "Protocols", label2: "+ GPIO" },
        { x: 560, label1: "ARM", label2: "+ More" },
      ].map(({ x, label1, label2 }, i) => (
        <g key={i}>
          <rect x={x} y={22} width={104} height={64} rx={10} fill="#F9FAFB" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={x + 52} y={51} textAnchor="middle" fill="#9CA3AF" fontSize={10} fontFamily="sans-serif" fontWeight={600}>{label1}</text>
          <text x={x + 52} y={66} textAnchor="middle" fill="#9CA3AF" fontSize={10} fontFamily="monospace">{label2}</text>
          {i < 2 && (
            <line x1={x + 104} y1={54} x2={x + 114} y2={54} stroke="#D1D5DB" strokeWidth={1} strokeLinecap="round" strokeDasharray="3 3" />
          )}
        </g>
      ))}
    </svg>
  );
}

// ─── MiniNav ─────────────────────────────────────────────────────────────────

function MiniNav() {
  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB]"
      aria-label="Page navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" aria-label="eTalVis home" className="flex items-center gap-2">
          <Image
            src="/images/icon.png"
            alt="eTalVis"
            width={36}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </a>

        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B7280]">
          Embedded Starter Pack
        </span>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-mono text-sm text-[#111827] font-medium">
            ₹239 · 2 Months
          </span>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#FFC400] px-4 py-1.5 text-sm font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_2px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
          >
            Start Your Foundation
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

function HeroSection({ heroRef }: { heroRef: React.RefObject<HTMLDivElement> }) {
  return (
    <section
      ref={heroRef}
      className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20"
      aria-label="Hero"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">

        {/* LEFT: content */}
        <div className="flex-1 min-w-0 lg:max-w-[58%]">
          {/* Product title — Sora, prominent */}
          <p
            className="font-display font-semibold mb-4"
            style={{ fontSize: "clamp(20px, 2.5vw, 24px)", color: "#15803D" }}
          >
            eTalVis Embedded Starter Pack
          </p>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-[36px] leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-[48px] lg:text-[58px] lg:leading-[1.05]">
            Every Electronics Engineering Student&apos;s First Step Starts Here.
          </h1>

          {/* Supporting copy */}
          <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] sm:text-[18px] max-w-xl">
            If the Embedded Systems field is where you are headed, begin by
            strengthening the two foundations that come first: Electronics and
            C Programming.
          </p>

          {/* Course pair */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] font-bold text-[#22C55E] mt-0.5 shrink-0">01</span>
              <div>
                <div className="font-display font-semibold text-[15px] text-[#111827]">Electronics Foundation Course</div>
                <div
                  className="font-display font-semibold mt-0.5"
                  style={{ fontSize: "12px", color: "#64748B" }}
                >
                  Hardware understanding
                </div>
              </div>
            </div>

            <div className="flex items-center self-start mt-2 sm:mt-1 shrink-0">
              <span className="font-mono text-[13px] font-bold text-[#D1D5DB]">+</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] font-bold text-[#22C55E] mt-0.5 shrink-0">02</span>
              <div>
                <div className="font-display font-semibold text-[15px] text-[#111827]">C Programming Foundation Course</div>
                <div
                  className="font-display font-semibold mt-0.5"
                  style={{ fontSize: "12px", color: "#64748B" }}
                >
                  Programming logic
                </div>
              </div>
            </div>
          </div>

          {/* Price + validity */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-display text-[38px] font-extrabold text-[#111827] leading-none">₹239</span>
            <div className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">
              <span className="font-mono text-[11px] text-[#4B5563] font-medium">2 Months Access</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FFC400] px-8 py-4 text-[16px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Start Your Foundation
            </a>
          </div>

          {/* Audience microcopy */}
          <p className="mt-3 text-[13px] font-semibold text-[#6B7280]">
            For ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related branches.
          </p>
        </div>

        {/* RIGHT: Balajee photo */}
        <div className="flex flex-col items-center lg:items-start lg:max-w-[42%] shrink-0">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-2xl bg-[#ECFDF3]"
            />
            <div className="relative">
              <Image
                src="/images/balajee-formal.png"
                alt="Balajee Seshadri, eTalVis instructor"
                width={420}
                height={520}
                className="relative z-10 w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] rounded-xl"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          {/* Caption — grouped immediately below photo */}
          <div className="mt-4 text-center lg:text-left">
            <div className="font-display font-bold text-[17px] text-[#111827]">
              Balajee Seshadri
            </div>
            <div
              className="font-mono font-medium mt-0.5 uppercase tracking-[0.1em]"
              style={{ fontSize: "12px", color: "#64748B" }}
            >
              40+ Years in Electronics
            </div>
            <div className="mt-1 text-[13px] text-[#6B7280]">
              Guiding students to build the fundamentals first.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Section: You Don't Need Everything ──────────────────────────────────────

function NoiseToClaritySection() {
  return (
    <section className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`${LABEL} mb-4 text-center`}>The First Decision</div>

        <h2 className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827] text-center"
          style={{ fontSize: "clamp(30px, 4vw, 40px)" }}>
          You Don&apos;t Need to Start With Everything.
        </h2>

        <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
          Start with the foundations that make the later technical concepts easier to understand.
        </p>

        {/* Foundation highlight */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="font-display font-bold text-[16px] text-[#111827] px-5 py-3 rounded-xl bg-[#ECFDF3] border border-[#22C55E]">
            Electronics
          </div>
          <span className="font-mono text-[20px] text-[#22C55E] font-bold">+</span>
          <div className="font-display font-bold text-[16px] text-[#111827] px-5 py-3 rounded-xl bg-[#ECFDF3] border border-[#22C55E]">
            C Programming
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Section: Why These Two ───────────────────────────────────────────────────

function WhyTheseTwoSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${LABEL} mb-4 text-center`}>Foundation_01 + Foundation_02</div>

      <h2 className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827] text-center"
        style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
        Why Electronics and C Programming?
      </h2>

      <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
        Working with hardware requires an understanding of Electronics. Writing
        software for it requires C Programming. These are the two starting
        foundations — that is why the pack begins with both.
      </p>

      {/* Two-column editorial */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* Electronics */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <div className="font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.14em] font-bold mb-3">01</div>
          <h3 className="font-display font-bold text-[#111827] mb-2"
            style={{ fontSize: "clamp(18px, 2vw, 22px)" }}>
            Electronics Foundation
          </h3>
          <p className="font-display font-semibold text-[18px] text-[#22C55E] mb-3">
            Hardware Understanding
          </p>
          <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
            Understand what happens in the hardware before writing code for it.
          </p>
          <div className="w-10 h-px bg-[#E5E7EB] mb-5" />
          <ul className="space-y-2">
            {ELECTRONICS_SECTIONS.map((topic) => (
              <li key={topic} className="flex items-start gap-2 text-[14px] text-[#4B5563]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* C Programming */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <div className="font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.14em] font-bold mb-3">02</div>
          <h3 className="font-display font-bold text-[#111827] mb-2"
            style={{ fontSize: "clamp(18px, 2vw, 22px)" }}>
            C Programming Foundation
          </h3>
          <p className="font-display font-semibold text-[18px] text-[#22C55E] mb-3">
            Programming Logic
          </p>
          <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
            Build programming logic from the fundamentals up.
          </p>
          <div className="w-10 h-px bg-[#E5E7EB] mb-5" />
          <ul className="space-y-2">
            {C_SECTIONS.map((topic) => (
              <li key={topic} className="flex items-start gap-2 text-[14px] text-[#4B5563]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                {topic}
              </li>
            ))}
          </ul>
          {/* Editorial stat */}
          <div className="mt-6 flex items-baseline gap-2">
            <span
              className="font-display font-extrabold text-[#111827] leading-none"
              style={{ fontSize: "clamp(32px, 4vw, 40px)" }}
            >
              200+
            </span>
            <span
              className="font-display font-semibold text-[#4B5563]"
              style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
            >
              Problems to Solve
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Inside the Pack ─────────────────────────────────────────────────

function InsideThePackSection() {
  const [openCourse, setOpenCourse] = useState<number | null>(null);

  return (
    <section className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
          Inside the Starter Pack
        </h2>
        <p className="mt-3 text-[16px] text-[#6B7280] text-center">
          Two foundation courses. One clear starting point.
        </p>

        <div className="mt-10 space-y-4">
          {/* Course 01 */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="flex items-start justify-between gap-4 p-6">
              <div className="flex items-start gap-4 min-w-0">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#ECFDF3] border border-[#22C55E] flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold text-[#22C55E]">01</span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wide mb-1">Electronics</div>
                  <h3 className="font-display font-bold text-[17px] text-[#111827]">
                    Electronics Foundation Course
                  </h3>
                  <p className="mt-1 text-[14px] text-[#4B5563] leading-relaxed">
                    Build the Electronics knowledge needed before moving deeper into the field.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenCourse(openCourse === 1 ? null : 1)}
                aria-expanded={openCourse === 1}
                className="shrink-0 flex items-center gap-1 font-mono text-[11px] text-[#22C55E] hover:text-[#15803D] transition mt-1"
              >
                <span>{openCourse === 1 ? "Hide" : "Topics"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${openCourse === 1 ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {openCourse === 1 && (
              <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
                <ul className="space-y-2">
                  {ELECTRONICS_SECTIONS.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[13px] text-[#4B5563]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Course 02 */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="flex items-start justify-between gap-4 p-6">
              <div className="flex items-start gap-4 min-w-0">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#ECFDF3] border border-[#22C55E] flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold text-[#22C55E]">02</span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wide mb-1">Programming</div>
                  <h3 className="font-display font-bold text-[17px] text-[#111827]">
                    C Programming Foundation Course
                  </h3>
                  <p className="mt-1 text-[14px] text-[#4B5563] leading-relaxed">
                    Build programming logic and strengthen the C concepts used throughout the learning path.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[11px] text-[#64748B]">
                    200+ problems to solve
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenCourse(openCourse === 2 ? null : 2)}
                aria-expanded={openCourse === 2}
                className="shrink-0 flex items-center gap-1 font-mono text-[11px] text-[#22C55E] hover:text-[#15803D] transition mt-1"
              >
                <span>{openCourse === 2 ? "Hide" : "Topics"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${openCourse === 2 ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {openCourse === 2 && (
              <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
                <ul className="space-y-2">
                  {C_SECTIONS.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[13px] text-[#4B5563]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Learning Path ───────────────────────────────────────────────────

function LearningPathSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${LABEL} mb-4 text-center`}>Your_Path</div>

      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        You Only Need to Know What Comes First.
      </h2>

      <p className="mt-4 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
        The pack is designed to help you complete the first two foundation steps before moving further.
      </p>

      <div className="mt-10 overflow-x-auto">
        <StarterLearningPath />
      </div>
    </section>
  );
}

// ─── Section: Why Start Here (Balajee) ───────────────────────────────────────

function WhyStartHereSection() {
  return (
    <section className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className={`${LABEL} mb-4`}>Why Start Here?</div>
            <h2
              className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827]"
              style={{ fontSize: "clamp(30px, 4vw, 42px)" }}
            >
              Why Start With The Fundamentals?
            </h2>

            <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[#4B5563]">
              <p>
                Students often want to move directly into microcontrollers,
                protocols or projects.
              </p>
              <p>
                But when the foundation in Electronics and C Programming is
                weak, the later topics become harder to understand.
              </p>
              <p>
                That is why this pack begins with the basics first.
              </p>
            </div>

            <div className="mt-8 border-l-2 border-[#22C55E] pl-5">
              <div className="font-display font-bold text-[16px] text-[#111827]">
                Balajee Seshadri
              </div>
              <div
                className="font-mono font-medium mt-0.5 uppercase tracking-[0.1em]"
                style={{ fontSize: "12px", color: "#64748B" }}
              >
                40+ Years in Electronics
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#111827] transition underline underline-offset-2"
            >
              View Balajee Seshadri on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end shrink-0">
            <Image
              src="/images/balajee-formal.png"
              alt="Balajee Seshadri, eTalVis instructor"
              width={280}
              height={340}
              className="rounded-xl w-full max-w-[220px] sm:max-w-[260px] object-cover shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Who Is This For ─────────────────────────────────────────────────

function WhoIsThisForSection() {
  const studentItems = [
    "You are studying Electronics Engineering, ECE, EEE, EIE or a related branch.",
    "You are interested in working in the Embedded Systems field.",
    "You are not sure where to begin.",
    "You want to strengthen your Electronics basics.",
    "You want to understand C Programming from the ground up.",
    "You prefer understanding the fundamentals before moving into advanced topics.",
    "You have tried to start with microcontrollers or projects and found the concepts unclear.",
    "You want a structured, self-paced learning path.",
    "You are looking for an affordable and clear starting point.",
  ];

  const switcherItems = [
    "You are from a software, mechanical, or non-core background and want to move into Electronics or Embedded Systems.",
    "You are preparing for technical interviews in the Electronics or Embedded Systems field and need to strengthen your fundamentals.",
    "You want to build the foundational knowledge required before applying for roles in embedded hardware or firmware.",
    "You are a working professional looking to upskill in Electronics and C Programming at your own pace.",
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        Is This Your First Step?
      </h2>

      <p className="mt-4 text-[16px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
        The first goal is to build the foundations properly. If any of the
        following describes you, this is where to begin.
      </p>

      {/* Students */}
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {studentItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl bg-[#F4F7F5] border border-[#E5E7EB] px-5 py-4"
          >
            <svg className="h-4 w-4 shrink-0 mt-0.5 text-[#22C55E]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[15px] text-[#374151] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {/* Professionals switching domains */}
      <div className="mt-8">
        <div className={`${LABEL} mb-4`}>Also for professionals</div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {switcherItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-white border border-[#E5E7EB] px-5 py-4"
            >
              <svg className="h-4 w-4 shrink-0 mt-0.5 text-[#15803D]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[15px] text-[#374151] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Section: Testimonials ────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Raghu Prakash",
      title: "Course graduate",
      quote:
        "Balajee sir delivered clear, well-organized online sessions that built a strong and practical understanding of C programming, electronics, and embedded concepts.",
      link: "https://www.linkedin.com/posts/raghu-prakash-775331380_i-successfully-completed-the-etalvis-c-activity-7416447756665270272-XWXK/?skipRedirect=true",
    },
    {
      name: "Tarang Srivas",
      title: "M.Tech VLSI & Embedded, IIT Jammu · Engineer at Silicon Labs",
      quote:
        "I used to rely on high-level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
      link: "https://www.linkedin.com/in/tarang-srivas-b192ab213/",
    },
    {
      name: "Arivenkkataram ASJ",
      title: "Course graduate",
      quote:
        "The course gave me the initial spark to explore the field more deeply and to start thinking beyond ready-made libraries.",
      link: "https://www.linkedin.com/in/arivenkkataram-asj/",
    },
  ];

  return (
    <section className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`${LABEL} mb-4 text-center`}>Students</div>
        <h2 className="font-display font-extrabold text-[26px] leading-tight text-[#111827] text-center sm:text-[34px]">
          What Students Are Saying
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <a
              key={t.name}
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-2xl bg-white border border-[#E5E7EB] p-6 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="h-6 w-6 text-[#22C55E] mb-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="flex-1 text-[15px] leading-[1.7] text-[#374151]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ECFDF3] border border-[#22C55E] flex items-center justify-center font-mono text-[11px] text-[#22C55E] font-bold shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-semibold text-[13px] text-[#111827]">{t.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{t.title}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Product / CTA card ─────────────────────────────────────────────

function ProductSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        Start With The Right Foundation.
      </h2>

      <div className="mt-8 rounded-2xl border-2 border-[#111827] bg-white overflow-hidden shadow-[0_4px_0_#111827]">
        {/* Header stripe */}
        <div className="bg-[#ECFDF3] border-b border-[#E5E7EB] px-7 py-5">
          <div className={`${LABEL} mb-1`}>Product</div>
          <h3 className="font-display font-extrabold text-[20px] text-[#111827]">
            eTalVis Embedded Starter Pack
          </h3>
        </div>

        <div className="px-7 py-7">
          {/* Included */}
          <div className="space-y-3 mb-7">
            {[
              { num: "01", title: "Electronics Foundation Course" },
              { num: "02", title: "C Programming Foundation Course" },
            ].map(({ num, title }) => (
              <div key={num} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#22C55E] font-bold shrink-0">{num}</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="font-display font-semibold text-[14px] text-[#111827]">{title}</span>
              </div>
            ))}
          </div>

          {/* Price + validity */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#E5E7EB]">
            <div className="font-display text-[42px] font-extrabold text-[#111827] leading-none">₹239</div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-[#6B7280]">2 Months Access</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full bg-[#FFC400] px-8 py-4 text-[16px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Get the Starter Pack
            </a>
          </div>
        </div>
      </div>

      {/* Bulk purchase */}
      <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F4F7F5] px-6 py-6">
        <div className={`${LABEL} mb-2`}>Institutions</div>
        <h3 className="font-display font-bold text-[17px] text-[#111827] mb-2">
          Bulk Access for Academic Institutions
        </h3>
        <p className="text-[14px] text-[#4B5563] leading-relaxed mb-4">
          If you are an institution looking to provide this foundation pack to
          a batch of students, reach out to discuss bulk access options.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#111827] bg-white px-5 py-2.5 text-[13px] font-bold text-[#111827] transition hover:-translate-y-0.5 hover:shadow-sm"
        >
          Contact on WhatsApp
        </a>
      </div>
    </section>
  );
}

// ─── Section: FAQ ─────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[26px] leading-tight text-[#111827] text-center sm:text-[32px]">
          Questions Before You Start?
        </h2>

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] overflow-hidden divide-y divide-[#E5E7EB]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-[#F9FAFB] transition"
              >
                <span className="font-display font-semibold text-[15px] text-[#111827] leading-snug">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 mt-0.5 text-[#6B7280] transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 bg-[#F9FAFB]">
                  <p className="text-[15px] leading-[1.7] text-[#4B5563]">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Final CTA ───────────────────────────────────────────────────────

function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 text-center">
      <div className={`${LABEL} mb-4`}>Your First Step</div>

      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] sm:text-[36px] lg:text-[42px]">
        Every Electronics Engineering Student&apos;s First Step Starts Here.
      </h2>

      <div className="mt-7 flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center items-center gap-4 text-[15px] text-[#4B5563]">
          <span className="font-display font-semibold text-[#111827]">Electronics Foundation</span>
          <span className="font-mono text-[#22C55E] font-bold">+</span>
          <span className="font-display font-semibold text-[#111827]">C Programming Foundation</span>
        </div>
        <div className="font-mono text-[13px] text-[#6B7280]">₹239 · 2 Months Access</div>
      </div>

      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFC400] px-10 py-4 text-[17px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
      >
        Start Your Foundation
      </a>
    </section>
  );
}

// ─── Sticky Mobile CTA ────────────────────────────────────────────────────────

function StickyCTA({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-4 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_-6px_28px_rgba(15,23,42,0.15)]">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="font-display font-bold text-[14px] text-[#111827] leading-tight">
              eTalVis Embedded Starter Pack
            </div>
            <div className="font-mono text-[11px] text-[#6B7280] mt-0.5">
              ₹239 · 2 Months
            </div>
          </div>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="shrink-0 inline-flex items-center rounded-full bg-[#FFC400] px-5 py-2.5 text-[13px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_2px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
          >
            Start Learning
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmbeddedStarterPack() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyCTAVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <MiniNav />
      <HeroSection heroRef={heroRef} />
      <NoiseToClaritySection />
      <WhyTheseTwoSection />
      <InsideThePackSection />
      <LearningPathSection />
      <WhyStartHereSection />
      <WhoIsThisForSection />
      <TestimonialsSection />
      <ProductSection />
      <FAQSection />
      <FinalCtaSection />
      <Footer />

      <div aria-hidden="true" className="h-20" />

      <StickyCTA visible={stickyCTAVisible} />
    </div>
  );
}
