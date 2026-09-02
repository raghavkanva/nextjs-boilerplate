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
          <p className="font-display font-extrabold text-[22px] sm:text-[26px] text-[#15803D] tracking-[-0.01em] mb-4">
            eTalVis Electronics Starter Pack
          </p>

          {/* H1 — supporting, not dominant */}
          <h1 className="font-display font-extrabold text-[26px] leading-[1.15] tracking-[-0.02em] text-[#111827] sm:text-[34px] lg:text-[40px] lg:leading-[1.1]">
            Every Electronics Engineering Student&apos;s First Step Starts Here.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[16px] font-semibold leading-[1.65] text-[#374151] max-w-xl">
            Planning to learn Embedded Systems or VLSI Design ? Begin with
            Electronics fundamentals and C programming.
          </p>

          {/* Course pair — animated SVG banner */}
          <div className="mt-7 w-full max-w-[480px]">
            {/* Visually hidden course names for screen readers and search engines.
                The SVG text elements inside are not reliably exposed to assistive technology. */}
            <p className="sr-only">
              Electronics Foundation Course: Electrical Fundamentals, Electronics Fundamentals, Number Systems, Digital Electronics.
              C Programming Foundation Course: Introduction to Programming, Introduction to C Programming, Simple Programming Practice,
              Decision Making and Loops, Arrays, Strings, and Pointers, Structures, Storage Class.
            </p>
            <svg
              viewBox="0 0 390 152"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="esp-hero-svg-title esp-hero-svg-desc"
            >
              <title id="esp-hero-svg-title">Electronics Foundation Course and C Programming Foundation Course</title>
              <desc id="esp-hero-svg-desc">Two animated students, one studying electronics fundamentals on a laptop and one coding in C on a terminal, joined by a plus symbol representing both courses in the eTalVis Electronics Starter Pack.</desc>
              <defs>
                <linearGradient id="bgMain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#69A884"/>
                  <stop offset="34%" stopColor="#76B58F"/>
                  <stop offset="68%" stopColor="#82BE99"/>
                  <stop offset="100%" stopColor="#6EAA87"/>
                </linearGradient>
                <linearGradient id="ambientWash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFF2E6" stopOpacity="0.10"/>
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.035"/>
                  <stop offset="100%" stopColor="#E9F5ED" stopOpacity="0.08"/>
                </linearGradient>
                <linearGradient id="topSheen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16"/>
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%">
                  <feDropShadow dx="0" dy="7" stdDeviation="11" floodColor="#24553B" floodOpacity="0.13"/>
                </filter>
                <filter id="objectShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#244736" floodOpacity="0.18"/>
                </filter>
                <linearGradient id="scribbleGreen" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E4FFE9"/>
                  <stop offset="55%" stopColor="#B9F0C9"/>
                  <stop offset="100%" stopColor="#F2FFF5"/>
                </linearGradient>
                <linearGradient id="scribbleBlue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E5F4FF"/>
                  <stop offset="55%" stopColor="#C2DFFF"/>
                  <stop offset="100%" stopColor="#F3F9FF"/>
                </linearGradient>
              </defs>

              <rect x="4" y="5" width="382" height="142" rx="25" fill="url(#bgMain)" stroke="#8EC2A3" filter="url(#shadow)"/>
              <rect x="4" y="5" width="382" height="142" rx="25" fill="url(#ambientWash)"/>
              <path d="M28 6 H362 C376 6 385 16 385 30 V47 C297 25 99 28 5 55 V30 C5 16 15 6 28 6Z" fill="url(#topSheen)" opacity="0.55"/>

              {/* Electronics student */}
              <g transform="translate(21 17)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0 1;0 -2;0 1" dur="4.2s" repeatCount="indefinite"/>
                  <circle cx="28" cy="23" r="12.5" fill="#DCA37C"/>
                  <path d="M16 22 C17 9 36 7 40 20 C35 15 24 14 16 22Z" fill="#23302B"/>
                  <path d="M9 62 C11 43 18 37 28 37 C39 37 45 44 47 62Z" fill="#23875A"/>
                  <path d="M22 38 L28 45 L34 38" fill="#F0FAF4"/>
                  <path d="M42 46 C49 47 53 51 58 55" stroke="#DCA37C" strokeWidth="4.6" strokeLinecap="round"/>
                  <circle cx="59" cy="56" r="2.8" fill="#DCA37C"/>
                </g>
                <g transform="translate(47 39)" filter="url(#objectShadow)">
                  <rect x="-3" y="38" width="70" height="5" rx="2.5" fill="#7D8A84"/>
                  <rect x="1" y="9" width="62" height="31" rx="7" fill="#FAFBF8"/>
                  <g fill="#B4BBB6" opacity="0.8">
                    <circle cx="8" cy="15" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="20" cy="15" r="1"/>
                    <circle cx="26" cy="15" r="1"/><circle cx="32" cy="15" r="1"/><circle cx="38" cy="15" r="1"/>
                    <circle cx="44" cy="15" r="1"/><circle cx="50" cy="15" r="1"/><circle cx="56" cy="15" r="1"/>
                    <circle cx="8" cy="32" r="1"/><circle cx="14" cy="32" r="1"/><circle cx="20" cy="32" r="1"/>
                    <circle cx="26" cy="32" r="1"/><circle cx="32" cy="32" r="1"/><circle cx="38" cy="32" r="1"/>
                    <circle cx="44" cy="32" r="1"/><circle cx="50" cy="32" r="1"/><circle cx="56" cy="32" r="1"/>
                  </g>
                  <rect x="25" y="20" width="15" height="9" rx="2" fill="#24302B"/>
                  <path d="M8 23 H17" stroke="#6C776F" strokeWidth="1.2"/>
                  <rect x="17" y="20.5" width="11" height="5" rx="2.5" fill="#D2AD70"/>
                  <path d="M28 23 H33" stroke="#6C776F" strokeWidth="1.2"/>
                  <circle cx="49" cy="22" r="3.3" fill="#49D87F">
                    <animate attributeName="opacity" values="0.35;1;0.35" dur="1.6s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M12 18 C20 4 39 4 48 17" stroke="#3DBD73" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M18 30 C25 36 44 35 53 27" stroke="#E9A93E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <g transform="translate(50 -2)">
                    <rect width="17" height="22" rx="4" fill="#303B36"/>
                    <rect x="3" y="3" width="11" height="6" rx="2" fill="#B8DFC6"/>
                    <circle cx="8.5" cy="15" r="3" fill="#7D8983"/>
                  </g>
                </g>
              </g>

              <text x="20" y="128" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans','Manrope','Avenir Next','Inter',sans-serif" fontSize="16.3" fontWeight="800" letterSpacing="-0.45">Electronics</text>
              <path d="M20 136 C28 134.7 35 138.1 43 135.8 C51 133.7 60 137.2 68 135.4 C76 133.9 84 136.8 93 135.2" fill="none" stroke="url(#scribbleGreen)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.35;0.82;1" dur="5.5s" repeatCount="indefinite"/>
              </path>

              {/* Centre plus */}
              <g transform="translate(195 70)" filter="url(#objectShadow)">
                <circle r="18" fill="#FFFFFF">
                  <animate attributeName="r" values="17;18.7;17" dur="3.5s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle" fill="#4E8567" fontFamily="'Plus Jakarta Sans','Manrope','Inter',sans-serif" fontSize="21" fontWeight="700">+</text>
              </g>

              {/* C Programming student */}
              <g transform="translate(222 17)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0 -1;0 2;0 -1" dur="4.5s" repeatCount="indefinite"/>
                  <circle cx="27" cy="23" r="12.5" fill="#C88D67"/>
                  <path d="M15 22 C16 9 35 7 39 20 C34 15 23 14 15 22Z" fill="#252D35"/>
                  <path d="M8 62 C10 43 17 37 27 37 C38 37 44 44 46 62Z" fill="#3E6EA9"/>
                  <path d="M40 47 C47 49 51 53 56 57" stroke="#C88D67" strokeWidth="4.5" strokeLinecap="round"/>
                  <path d="M16 48 C13 53 11 56 9 58" stroke="#C88D67" strokeWidth="4.5" strokeLinecap="round"/>
                </g>
                <g transform="translate(45 39)" filter="url(#objectShadow)">
                  <rect x="0" y="0" width="61" height="38" rx="7" fill="#334A64"/>
                  <rect x="5" y="5" width="51" height="28" rx="4" fill="#172231"/>
                  <circle cx="10" cy="9" r="1.2" fill="#FF8585"/>
                  <circle cx="14" cy="9" r="1.2" fill="#FFD16A"/>
                  <circle cx="18" cy="9" r="1.2" fill="#77DA99"/>
                  <rect x="10" y="15" width="20" height="2.2" rx="1.1" fill="#82C9FF"/>
                  <rect x="13" y="20" width="29" height="2.2" rx="1.1" fill="#A7B8FF"/>
                  <rect x="13" y="25" width="18" height="2.2" rx="1.1" fill="#7BE0A5"/>
                  <rect x="34" y="25" width="2" height="4" rx="1" fill="#FFFFFF">
                    <animate attributeName="opacity" values="0;1;0" dur="0.9s" repeatCount="indefinite"/>
                  </rect>
                  <path d="M-5 39 H66 L59 46 H2Z" fill="#DCE3E9"/>
                  <rect x="22" y="40.5" width="17" height="2.2" rx="1.1" fill="#A2AFBC"/>
                </g>
              </g>

              <text x="221" y="128" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans','Manrope','Avenir Next','Inter',sans-serif" fontSize="15.3" fontWeight="800" letterSpacing="-0.5">C Programming</text>
              <path d="M221 136 C231 134.6 240 138.1 249 135.8 C259 133.8 268 137.4 278 135.3 C288 133.9 299 137 310 135.1 C320 134 329 136.5 338 135.2" fill="none" stroke="url(#scribbleBlue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.35;0.82;1" dur="5.8s" begin="0.35s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-display text-[38px] font-extrabold text-[#111827] leading-none">
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
          <div className="mt-5 text-center lg:text-left">
            <div className="font-display font-bold text-[17px] text-[#111827]">
              Balajee Seshadri
            </div>
            <div className="text-[13px] font-medium mt-0.5 text-[#64748B]">
              40+ Years in Electronics
            </div>
            <div className="font-display font-bold text-[14px] text-[#111827] mt-1">
              Making Electronics Talents Visible to Industry
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
    <section id="esp-why" className="border-y border-[#E5E7EB] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className={`${EYEBROW} mb-4 text-center`}>WHAT YOU WILL LEARN</div>

        <h2
          className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827] text-center"
          style={{ fontSize: "36px" }}
        >
          Two Courses Included
        </h2>

        <p className="mt-4 text-[15px] leading-[1.65] text-[#4B5563] text-center max-w-xl mx-auto">
          Learn the Electronics concepts and C programming skills needed before
          advanced subjects.
        </p>

        {/* Two-course layout */}
        <div className="mt-14 sm:flex sm:gap-16 lg:gap-20">

          {/* ── Electronics Foundation ── */}
          <div className="sm:flex-1">
            <div className="h-[3px] w-8 bg-[#22C55E] rounded-full mb-6" />
            <h3
              className="font-display font-bold text-[#111827] mb-1.5"
              style={{ fontSize: "clamp(20px, 2.5vw, 24px)" }}
            >
              Electronics Foundation
            </h3>
            <p className="text-[12px] font-bold text-[#15803D] uppercase tracking-[0.07em] mb-4">
              Hardware Understanding
            </p>
            <p className="text-[14px] text-[#4B5563] leading-[1.6] mb-6">
              Understand electronic circuits, number systems and digital electronics.
            </p>
            <div className="space-y-[11px]">
              {ELECTRONICS_SECTIONS.map((s) => (
                <div key={s} className="flex items-start gap-2.5">
                  <span
                    className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full bg-[#22C55E]"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] leading-[1.5] text-[#374151]">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── C Programming Foundation ── */}
          <div className="mt-12 pt-12 border-t border-[#E5E7EB] sm:mt-0 sm:pt-0 sm:border-0 sm:flex-1">
            <div className="h-[3px] w-8 bg-[#3B82F6] rounded-full mb-6" />
            <h3
              className="font-display font-bold text-[#111827] mb-1.5"
              style={{ fontSize: "clamp(20px, 2.5vw, 24px)" }}
            >
              C Programming Foundation
            </h3>
            <p className="text-[12px] font-bold text-[#3B82F6] uppercase tracking-[0.07em] mb-4">
              Programming Logic
            </p>
            <p className="text-[14px] text-[#4B5563] leading-[1.6] mb-6">
              Learn core C concepts and improve through regular programming practice.
            </p>

            {/* 200+ proof point */}
            <div className="mb-6">
              <div
                className="font-display font-extrabold text-[#111827] leading-none"
                style={{ fontSize: "34px" }}
              >
                200+
              </div>
              <div className="text-[12px] font-semibold text-[#4B5563] uppercase tracking-[0.05em] mt-1.5">
                Problems to Solve
              </div>
            </div>

            <div className="space-y-[11px]">
              {C_SECTIONS.map((s) => (
                <div key={s} className="flex items-start gap-2.5">
                  <span
                    className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full bg-[#3B82F6]"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] leading-[1.5] text-[#374151]">{s}</span>
                </div>
              ))}
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
    <section id="esp-inside" className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[32px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[40px]">
          Inside the Starter Pack
        </h2>
        <p className="mt-3 text-[18px] text-[#6B7280] text-center">
          Two foundation courses. One clear starting point.
        </p>

        {/* Two-column premium layout on sm+ */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          {/* Electronics card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-7 border-l-4 border-[#22C55E] flex-1">
              <div className="text-[13px] font-bold text-[#15803D] uppercase tracking-wide mb-2">
                Electronics
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#111827] mb-3">
                Electronics Foundation Course
              </h3>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-6">
                Build the Electronics knowledge needed before moving deeper into the field.
              </p>
              <div className="border-t border-[#E5E7EB] pt-5 space-y-2.5">
                {ELECTRONICS_SECTIONS.map((s) => (
                  <div key={s} className="text-[14px] font-medium text-[#374151]">{s}</div>
                ))}
              </div>
            </div>
          </div>

          {/* C Programming card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-7 border-l-4 border-[#22C55E] flex-1">
              <div className="text-[13px] font-bold text-[#15803D] uppercase tracking-wide mb-2">
                Programming
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#111827] mb-3">
                C Programming Foundation Course
              </h3>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-1">
                Build programming logic and strengthen the C concepts used throughout the learning path.
              </p>
              <span className="inline-block text-[13px] text-[#15803D] font-bold mb-5">
                200+ problems to solve
              </span>
              <div className="border-t border-[#E5E7EB] pt-5 space-y-2.5">
                {C_SECTIONS.map((s) => (
                  <div key={s} className="text-[14px] font-medium text-[#374151]">{s}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Section: Why Start Here ──────────────────────────────────────────────────

function WhyStartHereSection() {
  return (
    <section id="esp-instructor" className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        <h2 className="font-display font-extrabold text-[32px] sm:text-[40px] leading-tight tracking-[-0.02em] text-[#111827] mb-8">
          Why Start Here ?
        </h2>

        <div className="space-y-4 text-[14px] font-semibold leading-[1.75] text-[#030303]">
          <p>
            Students often want to move directly into microcontrollers,
            chip design, or advanced projects.
          </p>
          <p>
            But when the foundation in Electronics and C Programming is
            weak, the later topics become harder to understand.
          </p>
        </div>

        {/* Why Start Here animated SVG */}
        <svg
          id="why-start-here-foundation-flow"
          viewBox="0 0 390 224"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ maxWidth: 430, height: "auto", display: "block", margin: "24px auto 22px" }}
        >
          <defs>
            <linearGradient id="wsh-bgA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBFDFB" />
              <stop offset="55%" stopColor="#F3F8F5" />
              <stop offset="100%" stopColor="#EDF5F1" />
            </linearGradient>
            <linearGradient id="wsh-shirtA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <filter id="wsh-shadowA" x="-30%" y="-40%" width="160%" height="190%">
              <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#173527" floodOpacity="0.07" />
            </filter>
            <filter id="wsh-miniA" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#173527" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background */}
          <rect x="4" y="5" width="382" height="214" rx="27"
            fill="url(#wsh-bgA)" stroke="#DFEAE3" filter="url(#wsh-shadowA)" />

          {/* Soft circuit background */}
          <g fill="none" stroke="#15803D" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.035">
            <path d="M17 24H40V16H55" />
            <circle cx="17" cy="24" r="1.5" fill="#15803D" />
            <circle cx="55" cy="16" r="1.5" fill="#15803D" />
            <path d="M92 22H101L107 13L113 35L120 22H133" />
            <rect x="324" y="19" width="28" height="24" rx="4" />
            <path d="M319 25H324M319 34H324M352 25H357M352 34H357" />
            <path d="M20 195H46V185H63" />
            <path d="M328 196H350V186H371" />
          </g>

          {/* Advanced destinations */}
          <g filter="url(#wsh-miniA)">
            {/* MCU */}
            <g transform="translate(27 23)">
              <rect width="92" height="52" rx="15" fill="#FFFFFF" stroke="#CFE5D6" />
              <rect x="34" y="14" width="24" height="23" rx="5" fill="#ECFDF3" stroke="#16A34A" strokeWidth="2" />
              <g stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round">
                <path d="M28 19H34M28 26H34M28 33H34" />
                <path d="M58 19H64M58 26H64M58 33H64" />
              </g>
              <circle cx="46" cy="25.5" r="3" fill="#22C55E">
                <animate attributeName="opacity" values=".25;1;.25" dur="1.5s" begin="3.4s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Chip Design */}
            <g transform="translate(149 23)">
              <rect width="92" height="52" rx="15" fill="#FFFFFF" stroke="#D9DDF1" />
              <rect x="32" y="11" width="28" height="28" rx="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
              <rect x="38" y="17" width="16" height="16" rx="3" fill="none" stroke="#6366F1" strokeWidth="1.4" />
              <path d="M40 21H47V25H52M40 30H44V27H52" fill="none" stroke="#6366F1" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M36 15H56" stroke="#60A5FA" strokeWidth="1.4" strokeLinecap="round">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0;0 20;0 0" dur="2.8s" begin="3.6s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Project */}
            <g transform="translate(271 23)">
              <rect width="92" height="52" rx="15" fill="#FFFFFF" stroke="#F0DAAC" />
              <rect x="25" y="12" width="42" height="28" rx="6" fill="#FFF8E9" stroke="#F59E0B" strokeWidth="1.6" />
              <path d="M31 18H41V24H50V34M31 34H39V29H60" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="60" cy="29" r="2.5" fill="#EF4444">
                <animate attributeName="opacity" values=".2;1;.2" dur="1.4s" begin="3.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          <text x="73" y="88" textAnchor="middle" fill="#176B3A"
            fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="10.5" fontWeight="700">MCU</text>
          <text x="195" y="88" textAnchor="middle" fill="#4F46E5"
            fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="10.5" fontWeight="700">Chip Design</text>
          <text x="317" y="88" textAnchor="middle" fill="#B45309"
            fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="10.5" fontWeight="700">Projects</text>

          {/* Midpoint */}
          <g transform="translate(195 112)" filter="url(#wsh-miniA)">
            <circle r="11" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
            <circle r="3.6" fill="#14B8A6">
              <animate attributeName="r" values="3;3;5;3"
                keyTimes="0;.35;.55;1" dur="5.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Foundation boxes */}
          <g filter="url(#wsh-miniA)">
            {/* Electronics */}
            <g transform="translate(99 148)">
              <rect width="78" height="31" rx="10" fill="#ECFDF3" stroke="#22C55E" />
              <text x="39" y="20" textAnchor="middle" fill="#176B3A"
                fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="9.4" fontWeight="700">Electronics</text>
            </g>
            {/* C Programming */}
            <g transform="translate(219 148)">
              <rect width="92" height="31" rx="10" fill="#EAF3FF" stroke="#3B82F6" />
              <text x="46" y="20" textAnchor="middle" fill="#315F95"
                fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif" fontSize="9.2" fontWeight="700">C Programming</text>
            </g>
          </g>

          {/* Paths from foundation to midpoint */}
          {/* MCU path */}
          <path d="M195 101 C164 98 130 90 103 75" fill="none" stroke="#22C55E"
            strokeWidth="2.5" strokeLinecap="round" pathLength="100"
            strokeDasharray="100" strokeDashoffset="100">
            <animate attributeName="stroke-dashoffset" values="100;100;0;0;100"
              keyTimes="0;.37;.65;.82;1" dur="5.8s" repeatCount="indefinite" />
          </path>
          {/* Chip path */}
          <path d="M195 101 V75" fill="none" stroke="#6366F1"
            strokeWidth="2.5" strokeLinecap="round" pathLength="100"
            strokeDasharray="100" strokeDashoffset="100">
            <animate attributeName="stroke-dashoffset" values="100;100;0;0;100"
              keyTimes="0;.42;.69;.84;1" dur="5.8s" repeatCount="indefinite" />
          </path>
          {/* Project path */}
          <path d="M195 101 C229 98 264 90 287 75" fill="none" stroke="#F59E0B"
            strokeWidth="2.5" strokeLinecap="round" pathLength="100"
            strokeDasharray="100" strokeDashoffset="100">
            <animate attributeName="stroke-dashoffset" values="100;100;0;0;100"
              keyTimes="0;.47;.73;.87;1" dur="5.8s" repeatCount="indefinite" />
          </path>

          {/* Endpoint pulses */}
          <circle cx="103" cy="75" r="3" fill="#22C55E">
            <animate attributeName="r" values="2;2;2;5;3"
              keyTimes="0;.55;.68;.78;1" dur="5.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="195" cy="75" r="3" fill="#6366F1">
            <animate attributeName="r" values="2;2;2;5;3"
              keyTimes="0;.60;.72;.82;1" dur="5.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="287" cy="75" r="3" fill="#F59E0B">
            <animate attributeName="r" values="2;2;2;5;3"
              keyTimes="0;.65;.76;.86;1" dur="5.8s" repeatCount="indefinite" />
          </circle>

          {/* Student figure */}
          <g transform="translate(20 130)">
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0 1;0 -2;0 1" dur="4.3s" repeatCount="indefinite" />
              <circle cx="27" cy="19" r="11.5" fill="#D6A079" />
              <path d="M15 18 C16 7 35 5 39 18 C34 13 23 12 15 18Z" fill="#24302B" />
              <path d="M8 58 C10 39 17 33 27 33 C38 33 45 41 47 58Z" fill="url(#wsh-shirtA)" />
              <path d="M21 34L27 41L33 34" fill="#F1F8F3" />
              <path d="M43 42 C53 40 63 34 76 30" fill="none" stroke="#D6A079" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="77" cy="30" r="2.7" fill="#D6A079" />
            </g>
          </g>

          {/* Start here label */}
          <text x="195" y="205" textAnchor="middle" fill="#151A17"
            fontFamily="'Sora','Plus Jakarta Sans','Inter',sans-serif"
            fontSize="11.2" fontWeight="700" letterSpacing="-0.15">
            Start here
          </text>
          <path d="M195 194 V183" fill="none" stroke="#202622"
            strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 4" opacity=".45">
            <animate attributeName="stroke-dashoffset" values="12;0" dur="1.8s" repeatCount="indefinite" />
          </path>
        </svg>

        <p className="text-[14px] font-bold leading-[1.75] text-[#17382A]">
          That is why this pack begins with the basics first.
        </p>

        {/* Instructor block */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <Image
            src="/images/balajee-formal.png"
            alt="Balajee Seshadri, eTalVis instructor"
            width={180}
            height={220}
            className="rounded-2xl w-full max-w-[140px] object-cover shadow-[0_8px_32px_rgba(15,23,42,0.12)] shrink-0"
            loading="lazy"
          />
          <div>
            <div className="border-l-2 border-[#22C55E] pl-5">
              <div className="font-display font-bold text-[17px] text-[#111827]">
                Balajee Seshadri
              </div>
              <div className="text-[13px] text-[#64748B] mt-0.5 font-medium">
                40+ Years in Electronics
              </div>
              <div className="font-display font-bold text-[14px] text-[#111827] mt-1">
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
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#111827] transition underline underline-offset-2"
            >
              View Balajee Seshadri on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
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
      heading: "ECE and Electronics students heading into Embedded Systems or VLSI Design.",
      body: "ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation. If you want to work in embedded hardware, firmware, or VLSI, these two foundations come first.",
    },
    {
      heading: "Students who tried advanced topics and found them unclear.",
      body: "Whether it is RTOS, GPIO, digital logic, or chip design, Electronics and C Programming sit underneath all of it. Building those foundations first is what makes every next step clearer.",
    },
    {
      heading: "Professionals moving from software or non-core backgrounds.",
      body: "From software, mechanical, or unrelated fields into embedded hardware, firmware, or VLSI design. This is the structured starting point before advanced concepts.",
    },
  ];

  return (
    <section id="esp-who" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${EYEBROW} mb-4 text-center`}>BUILT FOR STUDENTS WHO WANT TO UNDERSTAND THE BASICS CLEARLY</div>

      {/* Section heading — very big */}
      <h2 className="font-display font-extrabold text-[36px] sm:text-[52px] lg:text-[60px] leading-tight tracking-[-0.02em] text-[#111827] text-center">
        Who Is This For?
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
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
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
      title: "M.Tech VLSI and Embedded, IIT Jammu · Engineer at Silicon Labs",
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
    <section id="esp-testimonials" className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`${EYEBROW} mb-4 text-center`}>STUDENT FEEDBACK</div>
        <h2 className="font-display font-extrabold text-[23px] leading-tight text-[#111827] text-center">
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
              className="flex flex-col rounded-2xl bg-white border border-[#E5E7EB] p-6 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="border-t-2 border-[#22C55E] pt-5 flex-1">
                <blockquote className="text-[15px] font-bold leading-[1.75] text-[#374151]">
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

// ─── Section: Product card ────────────────────────────────────────────────────

function ProductSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-product" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[32px] leading-tight tracking-[-0.02em] text-[#111827] text-center">
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
            <div className="font-display text-[42px] font-extrabold text-[#111827] leading-none">
              Rs. 239
            </div>
            <span className="text-[14px] font-medium text-[#6B7280]">2 Months Access</span>
          </div>

          <div className="pt-6">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("product_section")}
              className="block w-full text-center rounded-full bg-[#FFC400] px-8 py-4 text-[16px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
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

function FinalCtaSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-final" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 text-center">
      {/* "Your First Step" — large display */}
      <p className="font-display font-extrabold text-[40px] sm:text-[52px] text-[#15803D] leading-tight tracking-[-0.02em] mb-5">
        Your First Step
      </p>

      <h2 className="font-display font-extrabold text-[24px] leading-tight tracking-[-0.01em] text-[#111827] sm:text-[30px] lg:text-[36px]">
        The two foundations every Electronics path starts from.
      </h2>

      <p className="mt-5 text-[15px] text-[#4B5563]">
        Electronics Foundation · C Programming Foundation · 2 Months Access
      </p>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleCTA("final_cta")}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFC400] px-10 py-4 text-[17px] font-bold text-[#111827] border-2 border-[#111827] font-display shadow-[0_3px_0_#111827] transition hover:bg-[#F4B800] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
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
      { id: "esp-why",          name: "why_foundations" },
      { id: "esp-inside",       name: "inside_pack" },
      { id: "esp-instructor",   name: "instructor" },
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
      <WhyTheseTwoSection />
      <WhyStartHereSection />
      <WhoIsThisForSection />
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
