"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import { track, metaEvent } from "@/lib/analytics";
import {
  captureCampaignData,
  buildTrackedCheckoutUrl,
  getCampaignEventParameters,
  getIdentityParameters,
} from "@/lib/campaignTracking";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHECKOUT_URL =
  "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48";
const LINKEDIN_URL = "https://www.linkedin.com/in/balajeeseshadri/";
const WHATSAPP_URL = `https://wa.me/919790873099?text=${encodeURIComponent("Hi Sir, I saw the eTalVis Electronics Starter Pack and I have a question.")}` ;
const COURSE_SLUG = "electronics-starter-pack";
const PLAN_CODE = "ESP";

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
    a: "The pack is designed for Electronics Engineering students who are interested in Embedded Systems or VLSI Design and want to build the right foundation before going deeper. It is suited for ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related branches.",
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
    a: "No. This pack is intended as a starting point for students who want to build their foundations first before going deeper into any Electronics path.",
  },
  {
    q: "Why are Electronics and C Programming included together?",
    a: "Whether you are heading into Embedded Systems or VLSI Design, both paths start from the same place. Electronics fundamentals to understand the hardware. C Programming to write for it. That is why the pack includes both.",
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

const BASE_TRACK_PARAMS = {
  content_name: "Electronics Starter Pack",
  content_type: PLAN_CODE,
  course_slug: COURSE_SLUG,
  value: 239,
  currency: "INR",
};

// ─── Module-level mutable tracking state ──────────────────────────────────────
// These are set in useEffect and read at click time — safe in a client component.
let _pageStartTime = 0;
let _maxScrollDepth = 0;

// ─── Extended URL builder ─────────────────────────────────────────────────────

function buildExtendedUrl(trackedUrl: string): string {
  try {
    const url = new URL(trackedUrl);

    // Device
    const w = window.innerWidth;
    url.searchParams.set(
      "etv_device",
      w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop",
    );

    // Locale and timezone
    url.searchParams.set("etv_browser_lang", navigator.language || "");
    url.searchParams.set(
      "etv_timezone",
      Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    );

    // Conversion time signals
    const now = new Date();
    url.searchParams.set("etv_hour_of_day", String(now.getHours()));
    url.searchParams.set(
      "etv_day_of_week",
      ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][
        now.getDay()
      ],
    );

    // Referrer (hostname only to keep URL short)
    try {
      url.searchParams.set(
        "etv_referrer_host",
        document.referrer ? new URL(document.referrer).hostname : "direct",
      );
    } catch {
      url.searchParams.set("etv_referrer_host", "direct");
    }
    url.searchParams.set("etv_entry_page", window.location.pathname);

    // First-touch attribution from localStorage
    try {
      const ft = JSON.parse(
        localStorage.getItem("etalvis_first_touch") || "{}",
      );
      if (ft.utm_source)
        url.searchParams.set("etv_first_touch_source", ft.utm_source);
      if (ft.utm_medium)
        url.searchParams.set("etv_first_touch_medium", ft.utm_medium);
      if (ft.utm_campaign)
        url.searchParams.set("etv_first_touch_campaign", ft.utm_campaign);
      if (ft.touch_timestamp) {
        const days = Math.floor(
          (Date.now() - new Date(ft.touch_timestamp).getTime()) / 86400000,
        );
        url.searchParams.set("etv_days_since_first_visit", String(days));
      }
    } catch {}

    // Visit count and return visitor
    try {
      const firstSeen = localStorage.getItem("etalvis_first_seen_at");
      if (firstSeen) url.searchParams.set("etv_first_visit_date", firstSeen);

      const sessionNum = parseInt(
        localStorage.getItem("etalvis_session_number") || "0",
        10,
      );
      url.searchParams.set("etv_visit_count", String(sessionNum));
      url.searchParams.set(
        "etv_return_visitor",
        sessionNum > 1 ? "true" : "false",
      );
    } catch {}

    return url.toString();
  } catch {
    return trackedUrl;
  }
}

// ─── CTA handler ─────────────────────────────────────────────────────────────

function handleCTA(location: string) {
  const timeOnPage =
    _pageStartTime > 0
      ? Math.round((Date.now() - _pageStartTime) / 1000)
      : 0;

  track("esp_cta_click", {
    ...BASE_TRACK_PARAMS,
    location,
    time_on_page_seconds: timeOnPage,
    max_scroll_depth_pct: _maxScrollDepth,
    ...getCampaignEventParameters(),
    ...getIdentityParameters(),
  });
  metaEvent("InitiateCheckout", {
    content_name: "Electronics Starter Pack",
    content_type: PLAN_CODE,
    value: 239,
    currency: "INR",
    num_items: 1,
  });
}

// Eyebrow label — used for small section chips (not the product title)
const EYEBROW =
  "text-[13px] font-semibold text-[#15803D] tracking-[0.06em] uppercase";

// ─── MiniNav ─────────────────────────────────────────────────────────────────

function MiniNav({ checkoutUrl }: { checkoutUrl: string }) {
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
            Rs. 239 · 2 Months
          </span>
          <a
            href={checkoutUrl}
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

function HeroSection({
  heroRef,
  checkoutUrl,
}: {
  heroRef: React.RefObject<HTMLDivElement>;
  checkoutUrl: string;
}) {
  return (
    <section
      id="esp-hero"
      ref={heroRef}
      className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:pt-16 lg:pb-20"
      aria-label="Hero"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">

        {/* LEFT */}
        <div className="flex-1 min-w-0 lg:max-w-[58%]">

          {/* Product title — big and bold */}
          <p className="font-display font-extrabold text-[20px] sm:text-[23px] text-[#15803D] tracking-[-0.01em] mb-4">
            eTalVis Electronics Starter Pack
          </p>

          {/* H1 — supporting, not dominant */}
          <h1 className="font-display font-extrabold text-[23px] leading-[1.15] tracking-[-0.02em] text-[#111827] sm:text-[31px] lg:text-[36px] lg:leading-[1.1]">
            Every Electronics Engineering Student&apos;s First Step Starts Here.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[14px] font-semibold leading-[1.65] text-[#374151] max-w-xl">
            Planning to learn Embedded Systems or VLSI Design ? Begin with
            Electronics fundamentals and C programming.
          </p>

          {/* Course pair — animated SVG banner */}
          <div className="mt-7 w-full max-w-[480px]">
            <p className="sr-only">
              Electronics Foundation Course: Electrical Fundamentals, Electronics Fundamentals, Number Systems, Digital Electronics.
              C Programming Foundation Course: Introduction to Programming, Introduction to C Programming, Simple Programming Practice,
              Decision Making and Loops, Arrays, Strings, and Pointers, Structures, Storage Class.
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("hero_svg")}
              className="block cursor-pointer"
              aria-label="Start learning Electronics and C Programming"
            >
              <img
                src="/images/electronics-c-programming-hero.svg"
                alt="Electronics Foundation Course and C Programming Foundation Course"
                width={390}
                height={152}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-display text-[34px] font-extrabold text-[#111827] leading-none">
              Rs. 239
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
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("hero")}
              className="inline-flex items-center justify-center rounded-full bg-[#FFC400] px-8 py-4 text-[14px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Start Your Foundation
            </a>
          </div>

          <p className="mt-3 text-[12px] font-semibold text-[#6B7280]">
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
          <div className="mt-5 text-center lg:text-left">
            <div className="font-display font-bold text-[15px] text-[#111827]">
              Balajee Seshadri
            </div>
            <div className="text-[14px] font-bold mt-0.5 text-[#64748B]">
              40+ Years in Electronics
            </div>
            <div className="font-display font-bold text-[13px] text-[#111827] mt-1">
              Making Electronics Talents Visible to Industry
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Section: Inside the Pack (merged) ───────────────────────────────────────

function InsideThePackSection() {
  return (
    <section id="esp-inside" className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[29px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
          Inside the Starter Pack
        </h2>
        <p className="mt-3 text-[16px] text-[#6B7280] text-center">
          Two foundation courses. One clear starting point.
        </p>

        {/* Two-column layout on sm+ */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          {/* Electronics card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-7 border-l-4 border-[#22C55E] flex-1">
              <div className="text-[13px] font-bold text-[#15803D] uppercase tracking-wide mb-2">
                Electronics
              </div>
              <h3 className="font-display font-bold text-[18px] text-[#111827] mb-3">
                Electronics Foundation Course
              </h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6">
                Build the Electronics knowledge needed before moving deeper into the field.
              </p>
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="font-display font-extrabold text-[18px] lg:text-[20px] text-[#111827] mb-4">
                  Syllabus
                </div>
                <div className="space-y-[10px] sm:space-y-3">
                  {ELECTRONICS_SECTIONS.map((s) => (
                    <div key={s} className="flex items-start gap-2.5">
                      <span className="mt-[5px] block h-[7px] w-[7px] shrink-0 rounded-full bg-[#16A34A]" aria-hidden="true" />
                      <span className="text-[15px] lg:text-[16px] font-semibold text-[#111827] leading-[1.5]">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* C Programming card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-7 border-l-4 border-[#3B82F6] flex-1">
              <div className="text-[13px] font-bold text-[#3B82F6] uppercase tracking-wide mb-2">
                Programming
              </div>
              <h3 className="font-display font-bold text-[18px] text-[#111827] mb-3">
                C Programming Foundation Course
              </h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed mb-4">
                Build programming logic and strengthen the C concepts used throughout the learning path.
              </p>
              <div className="mb-6">
                <div className="font-display font-extrabold text-[#111827] leading-none" style={{ fontSize: "36px" }}>
                  200+
                </div>
                <div className="text-[13px] font-bold text-[#4B5563] uppercase tracking-[0.05em] mt-1.5">
                  Problems to Solve
                </div>
              </div>
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="font-display font-extrabold text-[18px] lg:text-[20px] text-[#111827] mb-4">
                  Syllabus
                </div>
                <div className="space-y-[10px] sm:space-y-3">
                  {C_SECTIONS.map((s) => (
                    <div key={s} className="flex items-start gap-2.5">
                      <span className="mt-[5px] block h-[7px] w-[7px] shrink-0 rounded-full bg-[#16A34A]" aria-hidden="true" />
                      <span className="text-[15px] lg:text-[16px] font-semibold text-[#111827] leading-[1.5]">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Section: Sounds Like You ────────────────────────────────────────────────

function SoundsLikeYouSection() {
  const questions = [
    "I have an electronics interview coming up, but I do not know which fundamentals to revise first.",
    "Placements are getting closer, and I am worried that my electronics and C programming basics are still not strong enough.",
    "I want to enter embedded systems, but I am not confident in either electronics or C programming.",
    "I have attended technical interviews before, but I struggle when the interviewer asks basic questions.",
    "I am in my first or second year, and I want to build the right foundation before the subjects become more difficult.",
    "I can memorise formulas and definitions for exams, but I cannot clearly explain how a circuit or program works.",
    "I am in my third or final year, but I still do not feel ready for projects, internships or technical interviews.",
    "I completed my engineering degree, but I am still unsure how to prepare properly for electronics job opportunities.",
    "I am working in another field, but I want to move into electronics or embedded systems and do not know where to begin.",
    "I have watched many tutorials, but the concepts still feel disconnected and I do not have a clear learning path.",
  ];

  return (
    <section
      id="esp-sounds"
      className="w-full bg-[#F0FDF4] py-12 sm:py-16"
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              track("esp_section_view", { ...BASE_TRACK_PARAMS, section: "esp-sounds" });
              obs.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
      }}
    >
      <div className="mx-auto max-w-[1000px] px-6">
        <h2
          className="font-display font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.2] text-[#111827] text-center mb-3"
          style={{ opacity: 0, animation: "esp-fade-up 0.7s ease forwards" }}
        >
          Sounds Like You?
        </h2>
        <p className="text-[16px] font-normal text-[#4B5563] text-center max-w-[672px] mx-auto mb-10">
          The thoughts running through electronics students and professionals right now:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-4 max-w-[880px] mx-auto">
          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-white border-2 border-[#111827] rounded-xl px-4 py-3.5 flex items-start gap-3"
              style={{
                opacity: 0,
                animation: `esp-fade-up 0.6s ease ${0.06 * i}s forwards`,
              }}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 mt-0.5"
              >
                <circle cx="9" cy="9" r="7.15" stroke="#16A34A" strokeWidth="1.7"/>
                <circle cx="6.3" cy="7.2" r="1.1" fill="#16A34A"/>
                <circle cx="11.7" cy="7.2" r="1.1" fill="#16A34A"/>
                <path d="M6 11c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="#16A34A" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <span className="text-[16px] sm:text-[18px] font-bold text-[#111827] leading-[1.375]">
                {q}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[16px] sm:text-[18px] font-semibold text-[#111827] text-center max-w-[672px] mx-auto mt-10">
          If even one of these sounds like you, the Electronics Starter Pack is where you should begin.
        </p>
      </div>
      <style>{`
        @keyframes esp-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          #esp-sounds [style*="animation"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Section: Hours ───────────────────────────────────────────────────────────

function HoursSection() {
  return (
    <section
      id="esp-hours"
      className="w-full bg-white py-12 sm:py-[72px]"
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              track("esp_section_view", { ...BASE_TRACK_PARAMS, section: "course_content_hours" });
              obs.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
      }}
    >
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="flex flex-col gap-8 sm:gap-16 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left shrink-0">
            <div className="font-display font-extrabold text-[56px] lg:text-[72px] leading-[0.95] tracking-[-0.04em] text-[#16A34A]">
              100+
            </div>
            <div className="font-display font-extrabold text-[32px] lg:text-[40px] text-[#111827] leading-tight">
              Hours
            </div>
            <div className="text-[17px] lg:text-[20px] font-semibold text-[#4B5563] mt-1">
              of Course Content
            </div>
          </div>
          {/* Right: SVG */}
          <div className="flex-1 min-w-0">
            <img
              src="/images/embedded-vlsi-100-hours.svg"
              alt="Embedded Systems and VLSI illustration showing animated microcontroller, sensor, actuator, silicon wafer and transistor structures"
              width={640}
              height={480}
              className="w-full h-auto max-w-[520px] mx-auto lg:mx-0"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Why Start Here ──────────────────────────────────────────────────

function WhyStartHereSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-why-start" className="bg-[#F0FDF4] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="lg:flex lg:gap-14 lg:items-center">

          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-extrabold text-[29px] sm:text-[36px] leading-tight tracking-[-0.02em] text-[#111827] mb-8">
              Why Start Here ?
            </h2>

            <div className="space-y-4 text-[13px] font-semibold leading-[1.75] text-[#030303]">
              <p>
                Students often want to move directly into microcontrollers,
                chip design, or advanced projects.
              </p>
              <p>
                But when the foundation in Electronics and C Programming is
                weak, the later topics become harder to understand.
              </p>
            </div>

            <p className="mt-4 text-[13px] font-bold leading-[1.75] text-[#17382A]">
              That is why this pack begins with the basics first.
            </p>

            <div className="mt-10">
              <div className="border-l-2 border-[#22C55E] pl-5">
                <div className="mt-6">
                  <div className="font-display font-extrabold text-[36px] lg:text-[46px] leading-[0.95] tracking-[-0.03em] text-[#16A34A]">
                    40+
                  </div>
                  <div className="font-display font-extrabold text-[19px] lg:text-[23px] text-[#111827] leading-tight">
                    Years in Electronics
                  </div>
                  <div className="text-[14px] font-bold text-[#111827] mt-2">Balajee Seshadri</div>
                </div>
                <div className="font-display font-bold text-[13px] text-[#111827] mt-1">
                  Making Electronics Talents Visible to Industry
                </div>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("esp_linkedin_click", {
                    ...BASE_TRACK_PARAMS,
                    location: "instructor_section",
                    ...getCampaignEventParameters(),
                    ...getIdentityParameters(),
                  })
                }
                className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-[#6B7280] hover:text-[#111827] transition underline underline-offset-2"
              >
                View Balajee Seshadri on LinkedIn
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: SVG */}
          <div className="shrink-0 mt-10 lg:mt-0 lg:w-[45%]">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("wsh_svg")}
              className="block cursor-pointer"
              aria-label="Start your foundation"
            >
              <img
                src="/images/why-start-here-foundation.svg"
                alt="Electronics and C Programming foundations leading to MCU, Chip Design and Projects"
                width={390}
                height={224}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Section: Who Is This For ─────────────────────────────────────────────────

function WhoIsThisForSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-who" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${EYEBROW} mb-4 text-center`}>BUILT FOR STUDENTS WHO WANT TO UNDERSTAND THE BASICS CLEARLY</div>

      <h2 className="font-display font-extrabold text-[32px] sm:text-[47px] lg:text-[54px] leading-tight tracking-[-0.02em] text-[#111827] text-center">
        Who Is This For?
      </h2>

      <div className="mt-14 space-y-16 sm:space-y-20">

        {/* Audience 1: copy left / SVG right */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[16px] text-[#111827] mb-3">
              ECE and Electronics students heading into Embedded Systems or VLSI Design.
            </h3>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation. If you want to work in embedded hardware, firmware, or VLSI, these two foundations come first.
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-[45%]">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCTA("who_svg_1")} className="block" aria-label="Start your foundation">
              <svg viewBox="0 0 390 182" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="a1bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9FCFA"/>
                    <stop offset="50%" stopColor="#F3F9F5"/>
                    <stop offset="100%" stopColor="#EEF5F1"/>
                  </linearGradient>
                  <linearGradient id="a1shirt" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#16A34A"/>
                    <stop offset="100%" stopColor="#0F766E"/>
                  </linearGradient>
                  <linearGradient id="a1embedded" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22C55E"/>
                    <stop offset="100%" stopColor="#15803D"/>
                  </linearGradient>
                  <linearGradient id="a1vlsi" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA"/>
                    <stop offset="100%" stopColor="#6366F1"/>
                  </linearGradient>
                  <linearGradient id="a1path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22C55E"/>
                    <stop offset="50%" stopColor="#14B8A6"/>
                    <stop offset="100%" stopColor="#4F7FD8"/>
                  </linearGradient>
                  <filter id="a1shadow" x="-30%" y="-40%" width="160%" height="190%">
                    <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#173527" floodOpacity="0.07"/>
                  </filter>
                  <filter id="a1mini" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#173527" floodOpacity="0.11"/>
                  </filter>
                </defs>
                <rect x="4" y="5" width="382" height="172" rx="26" fill="url(#a1bg)" stroke="#E2ECE6" filter="url(#a1shadow)"/>
                <g fill="none" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.055">
                  <path d="M18 26 H26 L29 21 L34 31 L39 21 L44 31 L49 26 H58"/>
                  <path d="M94 19H107M107 13V25M113 13V25M113 19H126"/>
                  <rect x="299" y="18" width="26" height="22" rx="3"/>
                  <path d="M294 23H299M294 30H299M325 23H330M325 30H330"/>
                  <path d="M318 159H338V150H366"/>
                </g>
                <g transform="translate(22 36)">
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 1;0 -2;0 1" dur="4.3s" repeatCount="indefinite"/>
                    <circle cx="29" cy="24" r="13" fill="#D6A079"/>
                    <path d="M16 23 C17 9 38 7 42 21 C36 15 25 14 16 23Z" fill="#24302B"/>
                    <rect x="24" y="35" width="10" height="8" rx="3" fill="#CF9973"/>
                    <path d="M7 72 C9 48 17 41 29 41 C42 41 50 50 52 72Z" fill="url(#a1shirt)"/>
                    <path d="M22 42 L29 50 L36 42" fill="#EFF8F2"/>
                    <path d="M46 51 C56 52 64 49 73 44" stroke="#D6A079" strokeWidth="5" strokeLinecap="round" fill="none"/>
                    <circle cx="74" cy="44" r="3" fill="#D6A079"/>
                  </g>
                </g>
                <text x="22" y="132" fill="#17382A" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="13" fontWeight="700">Electronics</text>
                <path d="M100 78 C130 78 144 78 164 78 C181 78 188 86 198 86" fill="none" stroke="#D9E6DD" strokeWidth="6" strokeLinecap="round"/>
                <path d="M100 78 C130 78 144 78 164 78 C181 78 188 86 198 86" fill="none" stroke="url(#a1path)" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;.58;1" dur="4.8s" repeatCount="indefinite"/>
                </path>
                <circle r="5" fill="#14B8A6" filter="url(#a1mini)">
                  <animateMotion dur="4.8s" repeatCount="indefinite" path="M100 78 C130 78 144 78 164 78 C181 78 188 86 198 86"/>
                </circle>
                <g transform="translate(198 86)" filter="url(#a1mini)">
                  <circle r="12" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2"/>
                  <circle r="4" fill="#14B8A6">
                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
                <path d="M198 86 C221 55 247 41 283 40" fill="none" stroke="#22C55E" strokeWidth="2.8" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;100;0;0" keyTimes="0;.34;.72;1" dur="4.8s" repeatCount="indefinite"/>
                </path>
                <path d="M198 86 C222 113 248 128 283 129" fill="none" stroke="#6366F1" strokeWidth="2.8" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;100;0;0" keyTimes="0;.44;.81;1" dur="4.8s" repeatCount="indefinite"/>
                </path>
                <g transform="translate(282 16)" filter="url(#a1mini)">
                  <rect width="76" height="54" rx="15" fill="#FFFFFF" stroke="#C8E6D1"/>
                  <rect x="24" y="14" width="28" height="26" rx="6" fill="#ECFDF3" stroke="#22C55E" strokeWidth="2"/>
                  <rect x="31" y="21" width="14" height="12" rx="3" fill="url(#a1embedded)"/>
                  <g stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M18 20H24"/>
                    <path d="M18 27H24"/>
                    <path d="M18 34H24"/>
                    <path d="M52 20H58"/>
                    <path d="M52 27H58"/>
                    <path d="M52 34H58"/>
                  </g>
                  <circle cx="38" cy="27" r="3" fill="#FFF">
                    <animate attributeName="opacity" values=".35;1;.35" dur="1.3s" repeatCount="indefinite"/>
                  </circle>
                </g>
                <text x="294" y="82" fill="#15803D" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="11.5" fontWeight="700">Embedded</text>
                <g transform="translate(282 102)" filter="url(#a1mini)">
                  <rect width="76" height="54" rx="15" fill="#FFFFFF" stroke="#D0D5F0"/>
                  <rect x="23" y="11" width="30" height="30" rx="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2"/>
                  <rect x="29" y="17" width="18" height="18" rx="3" fill="url(#a1vlsi)" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.4"/>
                  <g fill="none" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M31 21 H39 V25 H45"/>
                    <path d="M31 31 H35 V28 H45"/>
                    <path d="M34 18 V22"/>
                    <path d="M43 31 V35"/>
                  </g>
                  <path d="M27 16 H49" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 20;0 0" dur="3s" repeatCount="indefinite"/>
                  </path>
                </g>
                <text x="307" y="166" fill="#4F46E5" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="11.5" fontWeight="700">VLSI</text>
                <g opacity="0.12">
                  <circle cx="133" cy="119" r="2.6" fill="#F59E0B">
                    <animate attributeName="opacity" values=".08;.22;.08" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="158" cy="136" r="2.6" fill="#3B82F6">
                    <animate attributeName="opacity" values=".08;.22;.08" dur="2.8s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="238" cy="143" r="2.6" fill="#8B5CF6">
                    <animate attributeName="opacity" values=".08;.22;.08" dur="3s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
            </a>
          </div>
        </div>

        {/* Audience 2: SVG left / copy right */}
        <div className="flex flex-col gap-7 lg:flex-row-reverse lg:items-center lg:gap-16">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[16px] text-[#111827] mb-3">
              Students who tried advanced topics and found them unclear.
            </h3>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              Whether it is RTOS, GPIO, digital logic, or chip design, Electronics and C Programming sit underneath all of it. Building those foundations first is what makes every next step clearer.
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-[45%]">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCTA("who_svg_2")} className="block" aria-label="Start your foundation">
              <svg viewBox="0 0 390 188" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="a2bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9FCFA"/>
                    <stop offset="52%" stopColor="#F4F9F6"/>
                    <stop offset="100%" stopColor="#EEF5F1"/>
                  </linearGradient>
                  <linearGradient id="a2shirt" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#16A34A"/>
                    <stop offset="100%" stopColor="#0F766E"/>
                  </linearGradient>
                  <linearGradient id="a2path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22C55E"/>
                    <stop offset="55%" stopColor="#14B8A6"/>
                    <stop offset="100%" stopColor="#3B82F6"/>
                  </linearGradient>
                  <filter id="a2shadow" x="-30%" y="-40%" width="160%" height="190%">
                    <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#173527" floodOpacity="0.07"/>
                  </filter>
                  <filter id="a2mini" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#173527" floodOpacity="0.12"/>
                  </filter>
                </defs>
                <rect x="4" y="5" width="382" height="178" rx="26" fill="url(#a2bg)" stroke="#E1EAE4" filter="url(#a2shadow)"/>
                <g fill="none" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.045">
                  <rect x="22" y="20" width="28" height="24" rx="4"/>
                  <path d="M17 26H22M17 34H22M50 26H55M50 34H55"/>
                  <path d="M82 28 H93 L99 18 L107 40 L114 27 H128"/>
                  <path d="M147 19 V34 H160 V42 H177"/>
                  <circle cx="147" cy="19" r="1.6" fill="#15803D"/>
                  <circle cx="177" cy="42" r="1.6" fill="#15803D"/>
                  <path d="M211 18 H222 C238 18 238 38 222 38 H211 Z"/>
                  <path d="M204 23H211M204 33H211M238 28H247"/>
                </g>
                <g transform="translate(18 44)">
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 1;0 -2;0 1" dur="4.4s" repeatCount="indefinite"/>
                    <circle cx="30" cy="24" r="13" fill="#D6A079"/>
                    <path d="M17 23 C18 9 39 7 43 21 C37 15 26 14 17 23Z" fill="#24302B"/>
                    <rect x="25" y="35" width="10" height="8" rx="3" fill="#CF9973"/>
                    <path d="M8 73 C10 49 18 42 30 42 C43 42 51 51 53 73Z" fill="url(#a2shirt)"/>
                    <path d="M23 43 L30 51 L37 43" fill="#EFF8F2"/>
                    <path d="M46 52 C54 50 60 47 66 42" stroke="#D6A079" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
                    <circle cx="67" cy="41" r="2.8" fill="#D6A079"/>
                  </g>
                </g>
                <text x="20" y="139" fill="#17382A" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="12.5" fontWeight="700">Advanced topics</text>
                <g transform="translate(112 41)">
                  <g fill="none" strokeLinecap="round" strokeWidth="2.2" opacity="0.72">
                    <path d="M0 38 C18 10 34 66 52 30 C68 1 79 52 94 32" stroke="#F59E0B" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                      <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.32;.75;1" dur="5s" repeatCount="indefinite"/>
                    </path>
                    <path d="M3 51 C22 68 34 9 55 47 C72 74 80 16 96 50" stroke="#6366F1" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                      <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.35;.78;1" dur="5.3s" repeatCount="indefinite"/>
                    </path>
                    <path d="M9 22 C25 47 40 17 59 26 C73 33 81 58 98 21" stroke="#EF4444" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                      <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.38;.8;1" dur="5.6s" repeatCount="indefinite"/>
                    </path>
                  </g>
                  <g filter="url(#a2mini)">
                    <circle cx="8" cy="37" r="6" fill="#FEF3C7" stroke="#F59E0B"/>
                    <circle cx="48" cy="18" r="6" fill="#EEF2FF" stroke="#6366F1"/>
                    <circle cx="96" cy="36" r="6" fill="#FEE2E2" stroke="#EF4444"/>
                    <circle cx="55" cy="60" r="6" fill="#DBEAFE" stroke="#3B82F6"/>
                  </g>
                </g>
                <path d="M216 85 C236 85 246 85 260 85" fill="none" stroke="#D5E4DB" strokeWidth="5" strokeLinecap="round"/>
                <path d="M216 85 C236 85 246 85 260 85" fill="none" stroke="url(#a2path)" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;100;0;0" keyTimes="0;.4;.72;1" dur="5.2s" repeatCount="indefinite"/>
                </path>
                <circle r="4.5" fill="#14B8A6">
                  <animateMotion dur="5.2s" repeatCount="indefinite" path="M216 85 C236 85 246 85 260 85"/>
                </circle>
                <g transform="translate(264 31)" filter="url(#a2mini)">
                  <rect width="98" height="118" rx="17" fill="#FFFFFF" stroke="#CFE3D6"/>
                  <circle cx="49" cy="13" r="4.5" fill="#22C55E">
                    <animate attributeName="r" values="4;5.5;4" dur="2.2s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M49 18 V28" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="12" y="29" width="74" height="23" rx="8" fill="#ECFDF3" stroke="#22C55E"/>
                  <text x="49" y="44" textAnchor="middle" fill="#176B3A" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="9.3" fontWeight="700">Electronics</text>
                  <path d="M49 52 V64" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round">
                    <animate attributeName="stroke-width" values="1.8;2.7;1.8" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <rect x="12" y="65" width="74" height="23" rx="8" fill="#EAF3FF" stroke="#3B82F6"/>
                  <text x="49" y="80" textAnchor="middle" fill="#315F95" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="8.7" fontWeight="700">C Programming</text>
                  <path d="M49 88 V100" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="49" cy="103" r="4" fill="#3B82F6">
                    <animate attributeName="opacity" values=".35;1;.35" dur="1.6s" repeatCount="indefinite"/>
                  </circle>
                </g>
                <text x="313" y="164" textAnchor="middle" fill="#15803D" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="11.8" fontWeight="700">Clear basics</text>
                <g fill="none" stroke="#14B8A6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M231 80 l5 5 -5 5">
                    <animate attributeName="opacity" values=".15;1;.15" dur="1.8s" repeatCount="indefinite"/>
                  </path>
                  <path d="M246 80 l5 5 -5 5">
                    <animate attributeName="opacity" values=".15;1;.15" dur="1.8s" begin=".3s" repeatCount="indefinite"/>
                  </path>
                </g>
              </svg>
            </a>
          </div>
        </div>

        {/* Audience 3: copy left / SVG right */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[16px] text-[#111827] mb-3">
              Professionals moving from software or non-core backgrounds.
            </h3>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              From software, mechanical, or unrelated fields into embedded hardware, firmware, or VLSI design. This is the structured starting point before advanced concepts.
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-[45%]">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCTA("who_svg_3")} className="block" aria-label="Start your foundation">
              <svg viewBox="0 0 390 188" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="a3bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9FCFA"/>
                    <stop offset="52%" stopColor="#F4F8F6"/>
                    <stop offset="100%" stopColor="#EEF4F1"/>
                  </linearGradient>
                  <linearGradient id="a3shirt" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB"/>
                    <stop offset="100%" stopColor="#0F766E"/>
                  </linearGradient>
                  <linearGradient id="a3path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#14B8A6"/>
                    <stop offset="100%" stopColor="#22C55E"/>
                  </linearGradient>
                  <filter id="a3shadow" x="-30%" y="-40%" width="160%" height="190%">
                    <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#173527" floodOpacity="0.07"/>
                  </filter>
                  <filter id="a3mini" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#173527" floodOpacity="0.12"/>
                  </filter>
                </defs>
                <rect x="4" y="5" width="382" height="178" rx="26" fill="url(#a3bg)" stroke="#E1EAE4" filter="url(#a3shadow)"/>
                <g fill="none" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.045">
                  <rect x="18" y="20" width="33" height="22" rx="4"/>
                  <path d="M13 45H56"/>
                  <circle cx="101" cy="29" r="11"/>
                  <circle cx="101" cy="29" r="4"/>
                  <path d="M101 14V18M101 40V44M86 29H90M112 29H116"/>
                  <path d="M157 22l-7 6 7 6M174 22l7 6-7 6"/>
                  <path d="M168 19l-6 18"/>
                  <path d="M224 28H252"/>
                  <path d="M246 22l7 6-7 6"/>
                  <rect x="302" y="18" width="28" height="24" rx="4"/>
                  <path d="M297 24H302M297 32H302M330 24H335M330 32H335"/>
                </g>
                <g transform="translate(19 42)">
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 1;0 -2;0 1" dur="4.4s" repeatCount="indefinite"/>
                    <circle cx="30" cy="24" r="13" fill="#D3A079"/>
                    <path d="M17 23 C18 9 39 7 43 21 C37 15 26 14 17 23Z" fill="#252E32"/>
                    <rect x="25" y="35" width="10" height="8" rx="3" fill="#CC9974"/>
                    <path d="M8 73 C10 49 18 42 30 42 C43 42 51 51 53 73Z" fill="url(#a3shirt)"/>
                    <path d="M23 43 L30 51 L37 43" fill="#F1F5F9"/>
                    <g transform="translate(-1 57)" filter="url(#a3mini)">
                      <rect x="0" y="0" width="28" height="20" rx="5" fill="#FFFFFF" stroke="#64748B"/>
                      <path d="M9 0V-4H19V0" fill="none" stroke="#64748B" strokeWidth="1.6"/>
                      <path d="M0 8C8 12 20 12 28 8" fill="none" stroke="#64748B" strokeWidth="1.4"/>
                    </g>
                    <path d="M46 52 C56 51 63 48 71 43" stroke="#D3A079" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
                    <circle cx="72" cy="42" r="2.8" fill="#D3A079"/>
                  </g>
                </g>
                <text x="20" y="141" fill="#243746" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="12.3" fontWeight="700">New direction</text>
                <g transform="translate(101 49)">
                  <g filter="url(#a3mini)">
                    <rect x="0" y="0" width="42" height="31" rx="8" fill="#FFFFFF" stroke="#BDD4F4"/>
                    <path d="M14 10l-6 5 6 5M28 10l6 5-6 5" fill="none" stroke="#3B82F6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="translate(7 48)" filter="url(#a3mini)">
                    <circle cx="14" cy="14" r="13" fill="#FFFFFF" stroke="#E7B557"/>
                    <circle cx="14" cy="14" r="5" fill="none" stroke="#F59E0B" strokeWidth="1.8"/>
                    <path d="M14 0V5M14 23V28M0 14H5M23 14H28" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round"/>
                  </g>
                </g>
                <path d="M153 86 C174 86 185 86 201 86 C217 86 226 86 239 86" fill="none" stroke="#D8E2DE" strokeWidth="6" strokeLinecap="round"/>
                <path d="M153 86 C174 86 185 86 201 86 C217 86 226 86 239 86" fill="none" stroke="url(#a3path)" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;.62;1" dur="4.9s" repeatCount="indefinite"/>
                </path>
                <circle r="4.8" fill="#14B8A6" filter="url(#a3mini)">
                  <animateMotion dur="4.9s" repeatCount="indefinite" path="M153 86 C174 86 185 86 201 86 C217 86 226 86 239 86"/>
                </circle>
                <g transform="translate(241 26)" filter="url(#a3mini)">
                  <rect width="119" height="120" rx="18" fill="#FFFFFF" stroke="#CEE1D5"/>
                  <circle cx="59.5" cy="15" r="4.5" fill="#22C55E">
                    <animate attributeName="r" values="4;5.6;4" dur="2.2s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M59.5 20V29" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="17" y="30" width="85" height="23" rx="8" fill="#ECFDF3" stroke="#22C55E"/>
                  <text x="59.5" y="45" textAnchor="middle" fill="#176B3A" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="8.8" fontWeight="700">Embedded</text>
                  <path d="M59.5 53V64" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="17" y="65" width="85" height="23" rx="8" fill="#E7F9F7" stroke="#14B8A6"/>
                  <text x="59.5" y="80" textAnchor="middle" fill="#0F766E" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="8.8" fontWeight="700">Firmware</text>
                  <path d="M59.5 88V99" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="17" y="100" width="85" height="14" rx="7" fill="#EEF2FF" stroke="#6366F1"/>
                  <text x="59.5" y="110" textAnchor="middle" fill="#4F46E5" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="7.8" fontWeight="700">VLSI</text>
                </g>
                <text x="300" y="162" textAnchor="middle" fill="#15803D" fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="11.6" fontWeight="700">Structured start</text>
                <g opacity="0.10">
                  <circle cx="178" cy="130" r="3" fill="#3B82F6">
                    <animate attributeName="cy" values="130;126;130" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="210" cy="143" r="3" fill="#22C55E">
                    <animate attributeName="cy" values="143;139;143" dur="3.8s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="224" cy="122" r="3" fill="#8B5CF6">
                    <animate attributeName="cy" values="122;118;122" dur="3.4s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Section: Testimonials ────────────────────────────────────────────────────

type Testimonial = {
  name: string;
  title: string;
  quote: string;
  link: string;
  image?: string;
  imageAlt?: string;
};

function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Raghu Prakash",
      title: "Course graduate",
      quote:
        "Balajee sir delivered clear, well-organized online sessions that built a strong and practical understanding of C programming, electronics, and embedded concepts.",
      link: "https://www.linkedin.com/posts/raghu-prakash-775331380_i-successfully-completed-the-etalvis-c-activity-7416447756665270272-XWXK/?skipRedirect=true",
      image: "/images/student-linkedin-6.png",
      imageAlt: "Raghu Prakash LinkedIn course review",
    },
    {
      name: "Tarang Srivas",
      title: "M.Tech VLSI and Embedded, IIT Jammu · Engineer at Silicon Labs",
      quote:
        "I used to rely on high-level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
      link: "https://www.linkedin.com/in/tarang-srivas-b192ab213/",
      image: "/images/student-linkedin-1.png",
      imageAlt: "Tarang Srivas LinkedIn course review",
    },
    {
      name: "Arivenkkataram ASJ",
      title: "Course graduate",
      quote:
        "The course gave me the initial spark to explore the field more deeply and to start thinking beyond ready-made libraries.",
      link: "https://www.linkedin.com/in/arivenkkataram-asj/",
      image: "/images/student-linkedin-4.png",
      imageAlt: "Arivenkkataram ASJ LinkedIn course review",
    },
  ];

  return (
    <section id="esp-testimonials" className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`${EYEBROW} mb-4 text-center`}>STUDENT FEEDBACK</div>
        <h2 className="font-display font-extrabold text-[21px] leading-tight text-[#111827] text-center">
          What Students Say About Learning with Balajee Sir
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <a
              key={t.name}
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("esp_testimonial_click", {
                  ...BASE_TRACK_PARAMS,
                  student_name: t.name,
                  ...getCampaignEventParameters(),
                  ...getIdentityParameters(),
                })
              }
              className="flex flex-col rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden transition hover:shadow-md hover:-translate-y-0.5"
            >
              {t.image && (
                <div className="w-full bg-[#F3F4F6]">
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="border-t-2 border-[#22C55E] pt-5 flex-1">
                  <blockquote className="text-[14px] font-bold leading-[1.75] text-[#374151]">
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
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Product card ────────────────────────────────────────────────────

function ProductSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-product" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[29px] leading-tight tracking-[-0.02em] text-[#111827] text-center">
        Start With The Right Foundation.<br />&amp;<br />Get Both Courses for ₹239
      </h2>

      <div className="mt-8 rounded-2xl border-2 border-[#111827] bg-white overflow-hidden shadow-[0_4px_0_#111827]">
        <div className="bg-[#ECFDF3] border-b border-[#E5E7EB] px-7 py-5">
          <h3 className="font-display font-extrabold text-[20px] text-[#111827]">
            eTalVis Electronics Starter Pack
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
            <div className="font-display text-[38px] font-extrabold text-[#111827] leading-none">
              Rs. 239
            </div>
            <span className="text-[13px] font-medium text-[#6B7280]">2 Months Access</span>
          </div>

          <div className="pt-6">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("product_section")}
              className="block w-full text-center rounded-full bg-[#FFC400] px-8 py-4 text-[14px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Get Both Courses for ₹239
            </a>
          </div>
        </div>
      </div>

      <div id="esp-bulk" className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F4F7F5] px-6 py-6">
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
          onClick={() =>
            track("esp_bulk_inquiry_click", {
              ...BASE_TRACK_PARAMS,
              location: "product_section",
              ...getCampaignEventParameters(),
              ...getIdentityParameters(),
            })
          }
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
  return (
    <section id="esp-faq" className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[23px] leading-tight text-[#111827] text-center sm:text-[29px]">
          Questions Before You Start?
        </h2>

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] overflow-hidden divide-y divide-[#E5E7EB]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="px-6 py-5">
              <p className="font-display font-semibold text-[14px] text-[#111827] leading-snug mb-2">
                {item.q}
              </p>
              <p className="text-[13px] leading-[1.7] text-[#4B5563]">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Final CTA ───────────────────────────────────────────────────────

function FinalCtaSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-final" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 text-center">
      {/* "Your First Step" — large display */}
      <p className="font-display font-extrabold text-[36px] sm:text-[47px] text-[#15803D] leading-tight tracking-[-0.02em] mb-5">
        Your First Step
      </p>

      <h2 className="font-display font-extrabold text-[22px] leading-tight tracking-[-0.01em] text-[#111827] sm:text-[27px] lg:text-[32px]">
        The two foundations every Electronics path starts from.
      </h2>

      <p className="mt-5 text-[14px] text-[#4B5563]">
        Electronics Foundation · C Programming Foundation · 2 Months Access
      </p>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleCTA("final_cta")}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFC400] px-10 py-4 text-[15px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
      >
        Start Your Foundation
      </a>

      {/* Social share */}
      <div className="mt-10 pt-8 border-t border-[#E5E7EB]">
        <p className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-[0.06em] mb-4">
          Share with a friend
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent("Hey! Found this eTalVis Electronics Starter Pack. Electronics + C Programming foundations for Rs. 239. Might be useful if you're heading into Embedded Systems or VLSI: https://courses.etalvis.com/electronics-starter-pack?utm_source=whatsapp&utm_medium=share&utm_campaign=esp_share")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("esp_share_click", { ...BASE_TRACK_PARAMS, platform: "whatsapp", location: "final_cta", ...getCampaignEventParameters(), ...getIdentityParameters() })}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white border-2 border-[#128C7E] transition hover:-translate-y-0.5 hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L0 24l6.305-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.032-1.378l-.36-.214-3.742.981.998-3.648-.235-.374A9.853 9.853 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
            </svg>
            Share on WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://courses.etalvis.com/electronics-starter-pack?utm_source=linkedin&utm_medium=share&utm_campaign=esp_share")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("esp_share_click", { ...BASE_TRACK_PARAMS, platform: "linkedin", location: "final_cta", ...getCampaignEventParameters(), ...getIdentityParameters() })}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white border-2 border-[#004182] transition hover:-translate-y-0.5 hover:opacity-90"
            style={{ background: "#0A66C2" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Sticky Mobile CTA ────────────────────────────────────────────────────────

function StickyCTA({
  visible,
  checkoutUrl,
}: {
  visible: boolean;
  checkoutUrl: string;
}) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-4 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_-6px_28px_rgba(15,23,42,0.15)]">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="font-display font-bold text-[14px] text-[#111827] leading-tight">
              eTalVis Electronics Starter Pack
            </div>
            <div className="text-[11px] text-[#6B7280] mt-0.5">
              Rs. 239 · 2 Months
            </div>
          </div>
          <a
            href={checkoutUrl}
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

// ─── WhatsApp Float Button ────────────────────────────────────────────────────

function WhatsAppFloatButton({ stickyCTAVisible }: { stickyCTAVisible: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Balajee sir on WhatsApp"
      onClick={() =>
        track("esp_whatsapp_float_click", {
          ...BASE_TRACK_PARAMS,
          location: "float_button",
          ...getCampaignEventParameters(),
          ...getIdentityParameters(),
        })
      }
      className={`fixed right-4 z-[51] transition-all duration-300 ${
        stickyCTAVisible ? "bottom-[84px]" : "bottom-5"
      }`}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform" style={{ background: "#25D366" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmbeddedStarterPack() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(CHECKOUT_URL);

  // ── Boot: campaign capture + page view + extended tracked URL ────────────
  useEffect(() => {
    _pageStartTime = Date.now();

    captureCampaignData();

    const baseTracked = buildTrackedCheckoutUrl(
      CHECKOUT_URL,
      "esp_landing",
      COURSE_SLUG,
      PLAN_CODE,
    );
    setCheckoutUrl(buildExtendedUrl(baseTracked));

    const campaignParams = getCampaignEventParameters();
    const identityParams = getIdentityParameters();

    track("esp_page_view", {
      ...BASE_TRACK_PARAMS,
      content_category: "Landing Page",
      ...campaignParams,
      ...identityParams,
    });
    metaEvent("ViewContent", {
      content_name: "Electronics Starter Pack",
      content_type: PLAN_CODE,
      value: 239,
      currency: "INR",
    });
  }, []);

  // ── Sticky CTA visibility ────────────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroGone = !entry.isIntersecting;
        setStickyCTAVisible(heroGone);
        if (heroGone && !wasVisible) {
          wasVisible = true;
          track("esp_sticky_cta_shown", {
            ...BASE_TRACK_PARAMS,
            ...getCampaignEventParameters(),
            ...getIdentityParameters(),
          });
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // ── Section view tracking ────────────────────────────────────────────────
  useEffect(() => {
    const sections: Array<{ id: string; name: string }> = [
      { id: "esp-sounds",       name: "sounds_like_you" },
      { id: "esp-why-start",    name: "why_start_here" },
      { id: "esp-why",          name: "why_foundations" },
      { id: "esp-inside",       name: "inside_pack" },
      { id: "esp-hours",        name: "course_content_hours" },
      { id: "esp-who",          name: "who_for" },
      { id: "esp-testimonials", name: "testimonials" },
      { id: "esp-product",      name: "product_card" },
      { id: "esp-bulk",         name: "bulk_inquiry" },
      { id: "esp-faq",          name: "faq" },
      { id: "esp-final",        name: "final_cta" },
    ];

    const cleanups: Array<() => void> = [];

    for (const { id, name } of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      let fired = false;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (fired || !entry.isIntersecting) return;
          fired = true;
          track("esp_section_viewed", {
            ...BASE_TRACK_PARAMS,
            section_name: name,
            ...getCampaignEventParameters(),
            ...getIdentityParameters(),
          });
          obs.disconnect();
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      cleanups.push(() => obs.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // ── Scroll depth ─────────────────────────────────────────────────────────
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    function onScroll() {
      const scrolled =
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
        100;

      if (scrolled > _maxScrollDepth) _maxScrollDepth = Math.round(scrolled);

      for (const pct of milestones) {
        if (!fired.has(pct) && scrolled >= pct) {
          fired.add(pct);
          track("esp_scroll_depth", {
            ...BASE_TRACK_PARAMS,
            scroll_depth_pct: pct,
            ...getCampaignEventParameters(),
            ...getIdentityParameters(),
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Time on page milestones ──────────────────────────────────────────────
  useEffect(() => {
    const milestones = [30, 60, 120, 180, 300];
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const seconds of milestones) {
      const t = setTimeout(() => {
        track("esp_time_on_page", {
          ...BASE_TRACK_PARAMS,
          seconds_on_page: seconds,
          ...getCampaignEventParameters(),
          ...getIdentityParameters(),
        });
      }, seconds * 1000);
      timers.push(t);
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <MiniNav checkoutUrl={checkoutUrl} />
      <HeroSection heroRef={heroRef} checkoutUrl={checkoutUrl} />
      <SoundsLikeYouSection />
      <WhyStartHereSection checkoutUrl={checkoutUrl} />
      <InsideThePackSection />
      <HoursSection />
      <WhoIsThisForSection checkoutUrl={checkoutUrl} />
      <TestimonialsSection />
      <ProductSection checkoutUrl={checkoutUrl} />
      <FAQSection />
      <FinalCtaSection checkoutUrl={checkoutUrl} />
      <Footer />

      {/* Spacer so sticky CTA never covers content */}
      <div aria-hidden="true" className="h-20" />

      <WhatsAppFloatButton stickyCTAVisible={stickyCTAVisible} />
      <StickyCTA visible={stickyCTAVisible} checkoutUrl={checkoutUrl} />
    </div>
  );
}
