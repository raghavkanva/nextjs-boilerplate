"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import { track, metaEvent } from "@/lib/analytics";

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

function handleCTA(location: string) {
  track("esp_cta_click", {
    location,
    content_name: "Embedded Starter Pack",
    content_type: "ESP",
    value: 239,
    currency: "INR",
  });
  metaEvent("InitiateCheckout", {
    content_name: "Embedded Starter Pack",
    content_type: "ESP",
    value: 239,
    currency: "INR",
    num_items: 1,
  });
}

// Eyebrow label — readable, branded
const EYEBROW =
  "text-[14px] font-semibold text-[#15803D] tracking-[0.06em] uppercase";

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

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-[#111827] font-medium">
            ₹239 · 2 Months
          </span>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("mini_nav")}
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
      className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:pt-16 lg:pb-20"
      aria-label="Hero"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">

        {/* LEFT */}
        <div className="flex-1 min-w-0 lg:max-w-[58%]">
          <p className={`${EYEBROW} mb-4`}>eTalVis Embedded Starter Pack</p>

          <h1 className="font-display font-extrabold text-[36px] leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-[48px] lg:text-[58px] lg:leading-[1.05]">
            Every Electronics Engineering Student&apos;s First Step Starts Here.
          </h1>

          <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] sm:text-[18px] max-w-xl">
            If the Embedded Systems field is where you are headed, begin by
            strengthening the two foundations that come first: Electronics and
            C Programming.
          </p>

          {/* Course pair */}
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <div className="border-l-2 border-[#22C55E] pl-4">
              <div className="font-display font-semibold text-[15px] text-[#111827]">
                Electronics Foundation Course
              </div>
              <div className="text-[13px] text-[#64748B] mt-0.5">
                Hardware understanding
              </div>
            </div>
            <div className="border-l-2 border-[#22C55E] pl-4">
              <div className="font-display font-semibold text-[15px] text-[#111827]">
                C Programming Foundation Course
              </div>
              <div className="text-[13px] text-[#64748B] mt-0.5">
                Programming logic
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-display text-[38px] font-extrabold text-[#111827] leading-none">
              ₹239
            </span>
            <div className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">
              <span className="text-[13px] text-[#4B5563] font-medium">
                2 Months Access
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("hero")}
              className="inline-flex items-center justify-center rounded-full bg-[#FFC400] px-8 py-4 text-[16px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Start Your Foundation
            </a>
          </div>

          <p className="mt-3 text-[13px] font-semibold text-[#6B7280]">
            For ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related branches.
          </p>
        </div>

        {/* RIGHT: photo */}
        <div className="flex flex-col items-center lg:items-start lg:max-w-[42%] shrink-0">
          <Image
            src="/images/balajee-formal.png"
            alt="Balajee Seshadri, eTalVis instructor"
            width={420}
            height={520}
            className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
            style={{ objectFit: "contain" }}
            priority
          />
          <div className="mt-6 text-center lg:text-left">
            <div className="font-display font-bold text-[17px] text-[#111827]">
              Balajee Seshadri
            </div>
            <div className="text-[13px] text-[#64748B] mt-0.5 font-medium">
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

// ─── Section: Why These Two ───────────────────────────────────────────────────

function WhyTheseTwoSection() {
  return (
    <section className="border-y border-[#E5E7EB] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className={`${EYEBROW} mb-4 text-center`}>The Two Foundations</div>

        <h2
          className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827] text-center"
          style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
        >
          Why Electronics and C Programming?
        </h2>

        <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
          Working with hardware requires an understanding of Electronics. Writing
          software for it requires C Programming. These are the two starting
          foundations. That is why the pack begins with both.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Electronics */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
            <h3
              className="font-display font-bold text-[#111827] mb-2"
              style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
            >
              Electronics Foundation
            </h3>
            <p className="font-display font-semibold text-[17px] text-[#22C55E] mb-4">
              Hardware Understanding
            </p>
            <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
              Understand what happens in the hardware before writing code for it.
            </p>
            <div className="w-10 h-px bg-[#E5E7EB] mb-5" />
            <ul className="space-y-2.5">
              {ELECTRONICS_SECTIONS.map((topic) => (
                <li key={topic} className="text-[14px] text-[#4B5563] leading-relaxed">
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* C Programming */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
            <h3
              className="font-display font-bold text-[#111827] mb-2"
              style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
            >
              C Programming Foundation
            </h3>
            <p className="font-display font-semibold text-[17px] text-[#22C55E] mb-4">
              Programming Logic
            </p>
            <p className="text-[14px] text-[#4B5563] leading-relaxed mb-5">
              Build programming logic from the fundamentals up.
            </p>
            <div className="w-10 h-px bg-[#E5E7EB] mb-5" />
            <ul className="space-y-2.5">
              {C_SECTIONS.map((topic) => (
                <li key={topic} className="text-[14px] text-[#4B5563] leading-relaxed">
                  {topic}
                </li>
              ))}
            </ul>
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
      </div>
    </section>
  );
}

// ─── Section: Inside the Pack ─────────────────────────────────────────────────

function InsideThePackSection() {
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
            <div className="p-6 border-l-4 border-[#22C55E]">
              <div className="text-[12px] font-semibold text-[#15803D] uppercase tracking-wide mb-1">
                Electronics
              </div>
              <h3 className="font-display font-bold text-[17px] text-[#111827]">
                Electronics Foundation Course
              </h3>
              <p className="mt-1 text-[14px] text-[#4B5563] leading-relaxed">
                Build the Electronics knowledge needed before moving deeper into the field.
              </p>
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
              <ul className="space-y-2">
                {ELECTRONICS_SECTIONS.map((s) => (
                  <li key={s} className="text-[13px] text-[#4B5563]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course 02 */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="p-6 border-l-4 border-[#22C55E]">
              <div className="text-[12px] font-semibold text-[#15803D] uppercase tracking-wide mb-1">
                Programming
              </div>
              <h3 className="font-display font-bold text-[17px] text-[#111827]">
                C Programming Foundation Course
              </h3>
              <p className="mt-1 text-[14px] text-[#4B5563] leading-relaxed">
                Build programming logic and strengthen the C concepts used throughout the learning path.
              </p>
              <span className="mt-2 inline-block text-[12px] text-[#64748B] font-medium">
                200+ problems to solve
              </span>
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
              <ul className="space-y-2">
                {C_SECTIONS.map((s) => (
                  <li key={s} className="text-[13px] text-[#4B5563]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
            <div className={`${EYEBROW} mb-6`}>Why Start Here?</div>

            {/* Editorial quote with CSS large quote mark */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -top-6 -left-2 font-display font-black leading-none select-none pointer-events-none"
                style={{ fontSize: "120px", lineHeight: 1, color: "#ECFDF3" }}
              >
                &ldquo;
              </span>
              <div className="relative space-y-4 text-[17px] leading-[1.75] text-[#374151]">
                <p>
                  Students often want to move directly into microcontrollers,
                  protocols or projects.
                </p>
                <p>
                  But when the foundation in Electronics and C Programming is
                  weak, the later topics become harder to understand.
                </p>
                <p className="font-semibold text-[#111827]">
                  That is why this pack begins with the basics first.
                </p>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#22C55E] pl-5">
              <div className="font-display font-bold text-[17px] text-[#111827]">
                Balajee Seshadri
              </div>
              <div className="text-[13px] text-[#64748B] mt-0.5 font-medium">
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
              className="rounded-2xl w-full max-w-[220px] sm:max-w-[260px] object-cover shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
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
  const audiences = [
    {
      heading: "Electronics and ECE students heading into Embedded Systems.",
      body: "ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation — if you want to work in embedded hardware or firmware, these two foundations come first.",
    },
    {
      heading: "Students who tried advanced topics and found them unclear.",
      body: "Microcontrollers, RTOS, GPIO, protocols — these topics require Electronics and C Programming underneath. Building those foundations first makes everything else fall into place.",
    },
    {
      heading: "Professionals moving from software or non-core backgrounds.",
      body: "From software, mechanical, or unrelated fields into embedded hardware or firmware — this is the structured starting point before advanced concepts.",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${EYEBROW} mb-4 text-center`}>Who Is This For?</div>
      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        Is This Your First Step?
      </h2>

      <div className="mt-12 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
        {audiences.map((item, i) => (
          <div key={i} className="py-8 flex flex-col gap-2 sm:flex-row sm:gap-12">
            <div
              className="shrink-0 font-display font-black text-[#ECFDF3] text-[40px] leading-none select-none hidden sm:block"
              aria-hidden="true"
              style={{ minWidth: "2rem" }}
            >
              {i + 1}
            </div>
            <div>
              <h3 className="font-display font-bold text-[18px] text-[#111827] mb-2">
                {item.heading}
              </h3>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        ))}
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
        <div className={`${EYEBROW} mb-4 text-center`}>Students</div>
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
              <div className="border-t-2 border-[#22C55E] pt-5 flex-1">
                <blockquote className="text-[15px] leading-[1.75] text-[#374151]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                <div className="font-display font-semibold text-[14px] text-[#111827]">
                  {t.name}
                </div>
                <div className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                  {t.title}
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
        <div className="bg-[#ECFDF3] border-b border-[#E5E7EB] px-7 py-5">
          <div className={`${EYEBROW} mb-1`}>Product</div>
          <h3 className="font-display font-extrabold text-[20px] text-[#111827]">
            eTalVis Embedded Starter Pack
          </h3>
        </div>

        <div className="px-7 py-7">
          <div className="space-y-3 mb-7">
            {[
              "Electronics Foundation Course",
              "C Programming Foundation Course",
            ].map((title) => (
              <div key={title} className="flex items-center gap-3">
                <span className="text-[#22C55E] font-bold text-[18px] leading-none">·</span>
                <span className="font-display font-semibold text-[15px] text-[#111827]">
                  {title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#E5E7EB]">
            <div className="font-display text-[42px] font-extrabold text-[#111827] leading-none">
              ₹239
            </div>
            <span className="text-[13px] text-[#6B7280] font-medium">2 Months Access</span>
          </div>

          <div className="pt-6">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("product_section")}
              className="block w-full text-center rounded-full bg-[#FFC400] px-8 py-4 text-[16px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Get the Starter Pack
            </a>
          </div>
        </div>
      </div>

      {/* Bulk */}
      <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F4F7F5] px-6 py-6">
        <div className={`${EYEBROW} mb-2`}>Institutions</div>
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
          onClick={() => track("esp_bulk_inquiry_click", { location: "product_section" })}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#111827] bg-white px-5 py-2.5 text-[13px] font-bold text-[#111827] transition hover:-translate-y-0.5 hover:shadow-sm"
        >
          Contact on WhatsApp
        </a>
      </div>
    </section>
  );
}

// ─── Section: FAQ (all visible by default) ────────────────────────────────────

function FAQSection() {
  return (
    <section className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[26px] leading-tight text-[#111827] text-center sm:text-[32px]">
          Questions Before You Start?
        </h2>

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] overflow-hidden divide-y divide-[#E5E7EB]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="px-6 py-5">
              <p className="font-display font-semibold text-[15px] text-[#111827] leading-snug mb-2">
                {item.q}
              </p>
              <p className="text-[15px] leading-[1.7] text-[#4B5563]">{item.a}</p>
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
      <div className={`${EYEBROW} mb-4`}>Your First Step</div>

      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] sm:text-[36px] lg:text-[42px]">
        ₹239. Two months. The foundations that make everything else click.
      </h2>

      <p className="mt-5 text-[15px] text-[#4B5563]">
        Electronics Foundation · C Programming Foundation · 2 Months Access
      </p>

      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleCTA("final_cta")}
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
            <div className="text-[11px] text-[#6B7280] mt-0.5">
              ₹239 · 2 Months
            </div>
          </div>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            onClick={() => handleCTA("sticky_cta")}
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
    track("esp_page_view", {
      content_name: "Embedded Starter Pack",
      content_category: "Landing Page",
      value: 239,
      currency: "INR",
    });
    metaEvent("ViewContent", {
      content_name: "Embedded Starter Pack",
      content_type: "ESP",
      value: 239,
      currency: "INR",
    });
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyCTAVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <MiniNav />
      <HeroSection heroRef={heroRef} />
      <WhyTheseTwoSection />
      <InsideThePackSection />
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
