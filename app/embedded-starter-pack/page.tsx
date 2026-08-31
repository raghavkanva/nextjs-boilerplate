"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";

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
    q: "Who is the Embedded Starter Pack for?",
    a: "The pack is designed for Electronics Engineering students and beginners who are interested in entering the Embedded Systems field and want to strengthen their Electronics and C Programming foundations first.",
  },
  {
    q: "What courses are included?",
    a: "The Starter Pack includes the Electronics Foundation Course and the C Programming Foundation Course.",
  },
  {
    q: "How long can I access the courses?",
    a: "The Embedded Starter Pack is valid for 2 months from purchase.",
  },
  {
    q: "Where can I watch the courses?",
    a: "After purchasing the pack, visit learn.etalvis.com or use the eTalVis Android or iOS app.",
  },
  {
    q: "Do I need Embedded Systems knowledge before joining?",
    a: "No. This pack is intended as a starting point for students who are interested in Embedded Systems.",
  },
  {
    q: "Why are Electronics and C Programming included together?",
    a: "Embedded Systems combines hardware understanding with programming. Electronics builds the hardware foundation, while C Programming builds the programming and logic foundation.",
  },
  {
    q: "Does this pack contain the full Embedded Systems Foundation Course?",
    a: "No. This Starter Pack contains two foundation courses: Electronics Foundation and C Programming Foundation. It is designed as an entry point before moving deeper into Embedded Systems learning.",
  },
  {
    q: "What should I do after completing these courses?",
    a: "After strengthening these two foundations, you can continue into deeper Embedded Systems topics and the broader eTalVis Embedded Systems learning pathway.",
  },
];

// ─── Design helpers ──────────────────────────────────────────────────────────

const LABEL =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-[#22C55E] font-medium";

// ─── SVG 1: Noise → Clarity ──────────────────────────────────────────────────

function NoiseToClarityDiagram() {
  return (
    <svg
      viewBox="0 0 700 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl mx-auto"
      aria-label="Diagram showing how advanced Embedded Systems topics converge into two foundations: Electronics and C Programming"
      role="img"
    >
      {/* Muted upper nodes */}
      {[
        { x: 80, y: 30, label: "ARM" },
        { x: 200, y: 18, label: "RTOS" },
        { x: 330, y: 30, label: "GPIO" },
        { x: 450, y: 18, label: "PROTOCOLS" },
        { x: 580, y: 30, label: "MCU" },
        { x: 130, y: 75, label: "TIMERS" },
        { x: 265, y: 68, label: "PROJECTS" },
        { x: 400, y: 75, label: "NETWORKING" },
        { x: 530, y: 68, label: "INTERFACES" },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect
            x={x - 38}
            y={y - 12}
            width={label.length * 7 + 8}
            height={24}
            rx={6}
            fill="#F4F7F5"
            stroke="#E5E7EB"
            strokeWidth={1}
          />
          <text
            x={x + (label.length * 7 + 8) / 2 - 38}
            y={y + 5}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize={9}
            fontFamily="monospace"
            letterSpacing={1}
            fontWeight={500}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Converging lines from top nodes to two anchor points */}
      {[80, 200, 330, 450, 580, 130, 265, 400, 530].map((x, i) => {
        const srcY = i < 5 ? 42 : 80;
        const destX = i < 4 || i === 5 || i === 6 ? 220 : 480;
        return (
          <line
            key={i}
            x1={x + 10}
            y1={srcY}
            x2={destX}
            y2={210}
            stroke="#E5E7EB"
            strokeWidth={1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Active convergence lines to foundation nodes */}
      <line x1={220} y1={210} x2={220} y2={238} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <line x1={480} y1={210} x2={480} y2={238} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />

      {/* Foundation nodes */}
      {/* Electronics */}
      <rect x={140} y={238} width={160} height={40} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={220} y={263} textAnchor="middle" fill="#15803D" fontSize={11} fontFamily="monospace" letterSpacing={1} fontWeight={700}>
        ELECTRONICS
      </text>

      {/* C Programming */}
      <rect x={400} y={238} width={160} height={40} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={480} y={263} textAnchor="middle" fill="#15803D" fontSize={11} fontFamily="monospace" letterSpacing={1} fontWeight={700}>
        C PROGRAMMING
      </text>

      {/* Lines to Embedded Systems node */}
      <line x1={220} y1={278} x2={350} y2={300} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <line x1={480} y1={278} x2={350} y2={300} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />

      {/* Embedded Systems Journey node */}
      <rect x={245} y={300} width={210} height={16} rx={8} fill="#22C55E" />
      <text x={350} y={312} textAnchor="middle" fill="white" fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={700}>
        EMBEDDED SYSTEMS JOURNEY
      </text>
    </svg>
  );
}

// ─── SVG 2: Hardware + Software Merge ────────────────────────────────────────

function HardwareSoftwareMerge() {
  return (
    <svg
      viewBox="0 0 560 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xl mx-auto"
      aria-label="Electronics and C Programming converging toward a foundation for Embedded Systems"
      role="img"
    >
      {/* Electronics block */}
      <rect x={20} y={30} width={180} height={80} rx={12} fill="#F4F7F5" stroke="#22C55E" strokeWidth={1.5} />
      {/* Circuit icon lines */}
      <line x1={50} y1={70} x2={70} y2={70} stroke="#22C55E" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={80} cy={70} r={8} stroke="#22C55E" strokeWidth={1.5} fill="none" />
      <line x1={88} y1={70} x2={108} y2={70} stroke="#22C55E" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={80} y1={62} x2={80} y2={50} stroke="#E5E7EB" strokeWidth={1} strokeLinecap="round" />
      <line x1={80} y1={78} x2={80} y2={90} stroke="#E5E7EB" strokeWidth={1} strokeLinecap="round" />
      <text x={110} y={56} fill="#111827" fontSize={10} fontFamily="monospace" letterSpacing={0.5} fontWeight={600}>ELECTRONICS</text>
      <text x={38} y={100} fill="#6B7280" fontSize={8} fontFamily="monospace" letterSpacing={0.5}>HARDWARE UNDERSTANDING</text>

      {/* C Programming block */}
      <rect x={360} y={30} width={180} height={80} rx={12} fill="#F4F7F5" stroke="#22C55E" strokeWidth={1.5} />
      {/* Code icon */}
      <text x={375} y={62} fill="#22C55E" fontSize={14} fontFamily="monospace" fontWeight={700}>{"{"}</text>
      <text x={388} y={62} fill="#6B7280" fontSize={9} fontFamily="monospace">int x = 0;</text>
      <text x={375} y={76} fill="#6B7280" fontSize={9} fontFamily="monospace">  *ptr = &x;</text>
      <text x={375} y={90} fill="#22C55E" fontSize={14} fontFamily="monospace" fontWeight={700}>{"}"}</text>
      <text x={375} y={104} fill="#6B7280" fontSize={8} fontFamily="monospace" letterSpacing={0.5}>PROGRAMMING LOGIC</text>

      {/* Converging arrows */}
      <line x1={200} y1={70} x2={248} y2={110} stroke="#22C55E" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={360} y1={70} x2={312} y2={110} stroke="#22C55E" strokeWidth={1.5} strokeLinecap="round" />

      {/* Foundation node */}
      <rect x={200} y={115} width={160} height={38} rx={10} fill="#22C55E" />
      <text x={280} y={130} textAnchor="middle" fill="white" fontSize={9} fontFamily="monospace" letterSpacing={0.8} fontWeight={700}>FOUNDATION FOR</text>
      <text x={280} y={144} textAnchor="middle" fill="white" fontSize={9} fontFamily="monospace" letterSpacing={0.8} fontWeight={700}>EMBEDDED SYSTEMS</text>
    </svg>
  );
}

// ─── SVG 3: Learning Path ─────────────────────────────────────────────────────

function StarterLearningPath() {
  return (
    <svg
      viewBox="0 0 640 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Learning path: Step 1 Electronics, Step 2 C Programming, then future Embedded Systems stages"
      role="img"
    >
      {/* Included label */}
      <text x={10} y={14} fill="#22C55E" fontSize={8} fontFamily="monospace" letterSpacing={1} fontWeight={700}>INCLUDED IN STARTER PACK</text>

      {/* Step 01 - active */}
      <rect x={10} y={22} width={140} height={64} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={24} y={42} fill="#22C55E" fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={700}>STEP_01</text>
      <text x={24} y={58} fill="#111827" fontSize={11} fontFamily="sans-serif" fontWeight={700}>Electronics</text>
      <text x={24} y={73} fill="#4B5563" fontSize={9} fontFamily="monospace">Foundation</text>

      {/* Arrow */}
      <line x1={150} y1={54} x2={168} y2={54} stroke="#22C55E" strokeWidth={2} strokeLinecap="round" />
      <polyline points="164,49 169,54 164,59" stroke="#22C55E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Step 02 - active */}
      <rect x={170} y={22} width={140} height={64} rx={10} fill="#ECFDF3" stroke="#22C55E" strokeWidth={2} />
      <text x={184} y={42} fill="#22C55E" fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={700}>STEP_02</text>
      <text x={184} y={58} fill="#111827" fontSize={11} fontFamily="sans-serif" fontWeight={700}>C Programming</text>
      <text x={184} y={73} fill="#4B5563" fontSize={9} fontFamily="monospace">Foundation</text>

      {/* Dashed separator */}
      <line x1={312} y1={54} x2={340} y2={54} stroke="#D1D5DB" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="4 3" />

      {/* Future label */}
      <text x={344} y={14} fill="#9CA3AF" fontSize={8} fontFamily="monospace" letterSpacing={1} fontWeight={600}>YOUR NEXT LEARNING STAGES</text>

      {/* Future nodes - muted */}
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
        {/* Logo */}
        <a href="/" aria-label="eTalVis home" className="flex items-center gap-2">
          <Image
            src="/images/etalvis-logo.png"
            alt="eTalVis"
            width={96}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </a>

        {/* Center label (hidden on mobile) */}
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B7280]">
          Embedded Starter Pack
        </span>

        {/* Right: price + CTA */}
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
          {/* Eyebrow */}
          <div className={`${LABEL} mb-4`}>
            eTalVis Embedded Starter Pack
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-[36px] leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-[48px] lg:text-[58px] lg:leading-[1.05]">
            Every Electronics Engineering Student's First Step Starts Here.
          </h1>

          {/* Supporting copy */}
          <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] sm:text-[18px] max-w-xl">
            If Embedded Systems is the field you want to explore, begin by
            strengthening the two foundations that come first: Electronics and
            C Programming.
          </p>

          {/* Course pair */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] font-bold text-[#22C55E] mt-0.5 shrink-0">01</span>
              <div>
                <div className="font-display font-semibold text-[15px] text-[#111827]">Electronics Foundation Course</div>
                <div className="font-mono text-[10px] text-[#6B7280] mt-0.5">Hardware understanding</div>
              </div>
            </div>

            <div className="flex items-center self-start mt-2 sm:mt-1 shrink-0">
              <span className="font-mono text-[13px] font-bold text-[#D1D5DB]">+</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] font-bold text-[#22C55E] mt-0.5 shrink-0">02</span>
              <div>
                <div className="font-display font-semibold text-[15px] text-[#111827]">C Programming Foundation Course</div>
                <div className="font-mono text-[10px] text-[#6B7280] mt-0.5">Programming logic</div>
              </div>
            </div>
          </div>

          {/* Price + validity */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[38px] font-extrabold text-[#111827] leading-none">₹239</span>
              <span className="font-mono text-[12px] text-[#6B7280]">one time</span>
            </div>
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

          {/* Microcopy */}
          <p className="mt-3 font-mono text-[11px] text-[#9CA3AF]">
            Access via learn.etalvis.com · eTalVis Android &amp; iOS apps after purchase
          </p>
        </div>

        {/* RIGHT: Balajee photo */}
        <div className="flex flex-col items-center lg:items-start lg:max-w-[42%] shrink-0">
          <div className="relative">
            {/* Subtle green background glow */}
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
                className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] object-cover rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-4 text-center lg:text-left">
            <div className="font-display font-bold text-[17px] text-[#111827]">
              Balajee Seshadri
            </div>
            <div className="font-mono text-[11px] text-[#22C55E] mt-0.5 uppercase tracking-[0.1em]">
              40+ Years in Electronics
            </div>
            <div className="mt-1 text-[13px] text-[#6B7280]">
              Your guide to building the fundamentals first.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: You Don't Need Everything ──────────────────────────────────────

function NoiseToClaritySection() {
  const advancedTerms = [
    "ARM", "RTOS", "GPIO", "Microcontrollers", "Protocols",
    "Timers", "Interfacing", "Embedded Linux", "Networking", "Projects",
  ];

  return (
    <section className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`${LABEL} mb-4 text-center`}>The First Decision</div>

        <h2 className="font-display font-extrabold text-[30px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[38px] lg:text-[44px]">
          You Don&apos;t Need to Start With Everything.
        </h2>

        <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
          When students first look at Embedded Systems, they see dozens of
          topics at once.
        </p>

        {/* Floating technical term tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {advancedTerms.map((term) => (
            <span
              key={term}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#F4F7F5] border border-[#E5E7EB] text-[#9CA3AF] tracking-wide"
            >
              {term}
            </span>
          ))}
        </div>

        <p className="mt-8 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
          But that does not mean you should learn everything first.
        </p>

        <p className="mt-2 text-[19px] font-display font-bold text-[#111827] text-center">
          Start with the foundation.
        </p>

        {/* Foundation highlight */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="font-display font-bold text-[16px] text-[#111827] px-5 py-3 rounded-xl bg-[#ECFDF3] border border-[#22C55E]">
            Electronics
          </div>
          <span className="font-mono text-[20px] text-[#22C55E] font-bold">+</span>
          <div className="font-display font-bold text-[16px] text-[#111827] px-5 py-3 rounded-xl bg-[#ECFDF3] border border-[#22C55E]">
            C Programming
          </div>
        </div>

        {/* SVG diagram */}
        <div className="mt-12">
          <NoiseToClarityDiagram />
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

      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px] lg:text-[42px]">
        Why Electronics and C Programming?
      </h2>

      <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
        Embedded Systems brings hardware and software together. To understand
        the hardware side, you need Electronics fundamentals. To express logic
        and work with software, you need C Programming fundamentals.
      </p>

      <p className="mt-2 text-[15px] text-[#6B7280] text-center">
        That is why the Starter Pack begins with both.
      </p>

      {/* Two-column editorial */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* Electronics */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <div className="font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.14em] font-bold mb-3">
            01
          </div>
          <h3 className="font-display font-bold text-[20px] text-[#111827] mb-2">
            Electronics Foundation
          </h3>
          <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
            Understand what happens in the hardware.
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
          <div className="font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.14em] font-bold mb-3">
            02
          </div>
          <h3 className="font-display font-bold text-[20px] text-[#111827] mb-2">
            C Programming Foundation
          </h3>
          <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
            Build programming logic from the fundamentals.
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
          <div className="mt-4 font-mono text-[11px] text-[#22C55E]">
            200+ problems to solve
          </div>
        </div>
      </div>

      {/* SVG merge diagram */}
      <div className="mt-12">
        <HardwareSoftwareMerge />
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
          Inside the Embedded Starter Pack
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
                    Build the basic Electronics knowledge needed before moving deeper into Embedded Systems.
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
                    Build programming logic and strengthen the C concepts used throughout Embedded Systems learning.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-[#22C55E]">
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
        Your Embedded Systems Journey Does Not Have to Start With Everything.
      </h2>

      <p className="mt-4 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
        You only need to know what comes first.
      </p>

      {/* Path SVG */}
      <div className="mt-10 overflow-x-auto">
        <StarterLearningPath />
      </div>

      <p className="mt-8 text-[15px] text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
        The Embedded Starter Pack is designed to help you complete the first
        two foundation steps before moving further.
      </p>
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
            <h2 className="font-display font-extrabold text-[26px] leading-tight tracking-[-0.02em] text-[#111827] sm:text-[32px]">
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
                That is why this Starter Pack begins with the basics first.
              </p>
            </div>

            {/* Attribution */}
            <div className="mt-8 border-l-2 border-[#22C55E] pl-5">
              <div className="font-display font-bold text-[16px] text-[#111827]">
                Balajee Seshadri
              </div>
              <div className="font-mono text-[11px] text-[#22C55E] mt-0.5 uppercase tracking-[0.1em]">
                40+ Years in Electronics
              </div>
            </div>

            {/* LinkedIn link */}
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
  const items = [
    "You are studying Electronics Engineering, ECE, EEE or a related discipline.",
    "You are interested in Embedded Systems.",
    "You are not sure where to begin.",
    "You want to strengthen your Electronics basics.",
    "You want to strengthen your C Programming fundamentals.",
    "You prefer understanding the fundamentals before moving into advanced topics.",
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        Is This Your First Step?
      </h2>

      <p className="mt-4 text-[16px] leading-[1.65] text-[#4B5563] text-center">
        This Starter Pack is designed for students who want to begin Embedded
        Systems with the fundamentals in place.
      </p>

      <ul className="mt-8 space-y-3">
        {items.map((item) => (
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

      {/* Honest note */}
      <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-white px-5 py-4">
        <p className="text-[14px] text-[#6B7280] leading-relaxed">
          <span className="font-semibold text-[#111827]">Already confident in both Electronics and C Programming?</span>{" "}
          This Starter Pack may be too basic for you.
        </p>
      </div>
    </section>
  );
}

// ─── Section: Testimonials ────────────────────────────────────────────────────

function TestimonialsSection() {
  const featured = {
    name: "Raghu Prakash",
    title: "Course graduate",
    quote:
      "Balajee sir delivered clear, well-organized online sessions that built a strong and practical understanding of C programming, electronics, and embedded concepts.",
    link: "https://www.linkedin.com/posts/raghu-prakash-775331380_i-successfully-completed-the-etalvis-c-activity-7416447756665270272-XWXK/?skipRedirect=true",
  };

  const secondary = [
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
        "The Balajee Seshadri embedded systems course gave me the initial spark to explore embedded systems more deeply and to start thinking beyond ready-made libraries.",
      link: "https://www.linkedin.com/in/arivenkkataram-asj/",
    },
  ];

  return (
    <section className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[26px] leading-tight text-[#111827] text-center sm:text-[32px]">
          What Students Are Saying
        </h2>

        {/* Featured testimonial */}
        <div className="mt-8 rounded-2xl bg-white border border-[#E5E7EB] p-7 sm:p-9">
          <svg className="h-7 w-7 text-[#22C55E] mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-[18px] leading-[1.7] text-[#111827] font-medium">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ECFDF3] border border-[#22C55E] flex items-center justify-center font-mono text-[11px] text-[#22C55E] font-bold">
              {featured.name[0]}
            </div>
            <div>
              <div className="font-display font-semibold text-[14px] text-[#111827]">{featured.name}</div>
              <div className="text-[12px] text-[#6B7280]">{featured.title}</div>
            </div>
          </div>
        </div>

        {/* Secondary testimonials */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {secondary.map((t) => (
            <div key={t.name} className="rounded-xl bg-white border border-[#E5E7EB] p-5">
              <blockquote className="text-[14px] leading-[1.7] text-[#374151]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#ECFDF3] border border-[#22C55E] flex items-center justify-center font-mono text-[9px] text-[#22C55E] font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-[13px] text-[#111827]">{t.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{t.title}</div>
                </div>
              </div>
            </div>
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
              <span className="font-mono text-[11px] text-[#6B7280]">One time payment</span>
            </div>
          </div>

          {/* Access via */}
          <div className="py-5 border-b border-[#E5E7EB]">
            <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wide mb-3">Access after purchase via</div>
            <div className="flex flex-wrap gap-2">
              {["learn.etalvis.com", "eTalVis Android App", "eTalVis iOS App"].map((p) => (
                <span key={p} className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#F4F7F5] border border-[#E5E7EB] text-[#4B5563]">
                  {p}
                </span>
              ))}
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
              Get the Embedded Starter Pack
            </a>
            <p className="mt-3 text-center font-mono text-[11px] text-[#9CA3AF]">
              After purchase, sign in and start learning through the eTalVis platform or mobile apps.
            </p>
          </div>
        </div>
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
        <div className="flex items-center gap-4 text-[15px] text-[#4B5563]">
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

// ─── Footer ───────────────────────────────────────────────────────────────────

function LandingFooter() {
  return (
    <footer className="bg-[#F4F7F5] border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Image
              src="/images/etalvis-logo.png"
              alt="eTalVis"
              width={88}
              height={26}
              className="h-6 w-auto mb-3"
              loading="lazy"
            />
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Building strong foundations for Embedded Systems learning.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#6B7280]">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#111827] transition">
              WhatsApp
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#111827] transition">
              LinkedIn
            </a>
            <a href="/privacy-policy" className="hover:text-[#111827] transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#111827] transition">Terms</a>
            <a href="/refund-policy" className="hover:text-[#111827] transition">Refund Policy</a>
            <a href={`mailto:info@etalvis.com`} className="hover:text-[#111827] transition">Contact</a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E7EB] pt-6">
          <p className="text-[12px] text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} eTalVis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
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
            <div className="font-display font-semibold text-[13px] text-[#111827] leading-tight">
              Embedded Starter Pack
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
    <>
      {/* Page metadata */}
      <title>Embedded Starter Pack | Electronics + C Programming | eTalVis</title>
      <meta
        name="description"
        content="Start your Embedded Systems learning journey with Electronics Foundation and C Programming Foundation. eTalVis Embedded Starter Pack: 2 courses, 2 months access, ₹239."
      />

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
        <LandingFooter />

        {/* Spacer for sticky bar */}
        <div aria-hidden="true" className="h-20" />

        <StickyCTA visible={stickyCTAVisible} />
      </div>
    </>
  );
}
