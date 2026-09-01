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
const WHATSAPP_URL = "https://wa.me/919790873099";
const COURSE_SLUG = "embedded-starter-pack";
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

          {/* Subtitle — bigger, bolder, updated copy */}
          <p className="mt-5 text-[19px] sm:text-[21px] font-semibold leading-[1.6] text-[#374151] max-w-xl">
            If Embedded Systems or VLSI Design is the field you want to explore,
            start by strengthening the two foundations that come first:
            Electronics and C Programming.
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
            <div className="text-[13px] text-[#64748B] mt-0.5 font-medium">
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
        <div className={`${EYEBROW} mb-4 text-center`}>The Two Foundations</div>

        <h2
          className="font-display font-extrabold leading-tight tracking-[-0.02em] text-[#111827] text-center"
          style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
        >
          Why Electronics and C Programming?
        </h2>

        <p className="mt-5 text-[17px] leading-[1.65] text-[#4B5563] text-center max-w-2xl mx-auto">
          Whether you are heading into Embedded Systems or VLSI Design,
          Electronics and C Programming are the two foundations the field starts
          from. That is why the pack begins with both.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
    <section id="esp-inside" className="bg-[#F4F7F5] border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
          Inside the Starter Pack
        </h2>
        <p className="mt-3 text-[16px] text-[#6B7280] text-center">
          Two foundation courses. One clear starting point.
        </p>

        {/* Two-column premium layout on sm+ */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          {/* Electronics card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-l-4 border-[#22C55E] flex-1">
              <div className="text-[12px] font-semibold text-[#15803D] uppercase tracking-wide mb-1">
                Electronics
              </div>
              <h3 className="font-display font-bold text-[17px] text-[#111827]">
                Electronics Foundation Course
              </h3>
              <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed">
                Build the Electronics knowledge needed before moving deeper into the field.
              </p>
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
              <ul className="space-y-2">
                {ELECTRONICS_SECTIONS.map((s) => (
                  <li key={s} className="text-[13px] text-[#4B5563] flex items-start gap-2">
                    <span className="text-[#22C55E] font-bold leading-snug mt-px">·</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* C Programming card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-l-4 border-[#22C55E] flex-1">
              <div className="text-[12px] font-semibold text-[#15803D] uppercase tracking-wide mb-1">
                Programming
              </div>
              <h3 className="font-display font-bold text-[17px] text-[#111827]">
                C Programming Foundation Course
              </h3>
              <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed">
                Build programming logic and strengthen the C concepts used throughout the learning path.
              </p>
              <span className="mt-2 inline-block text-[12px] text-[#64748B] font-semibold">
                200+ problems to solve
              </span>
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-5 bg-[#F9FAFB]">
              <ul className="space-y-2">
                {C_SECTIONS.map((s) => (
                  <li key={s} className="text-[13px] text-[#4B5563] flex items-start gap-2">
                    <span className="text-[#22C55E] font-bold leading-snug mt-px">·</span>
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

// ─── Section: Why Start Here ──────────────────────────────────────────────────

function WhyStartHereSection() {
  return (
    <section id="esp-instructor" className="bg-white border-y border-[#E5E7EB] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">

          <div className="flex-1 min-w-0">
            {/* Section heading — very big */}
            <h2 className="font-display font-extrabold text-[36px] sm:text-[48px] leading-tight tracking-[-0.02em] text-[#111827] mb-8">
              Why Start Here?
            </h2>

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
                  chip design, or advanced projects.
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
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#111827] transition underline underline-offset-2"
            >
              View Balajee Seshadri on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

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
      heading: "ECE and Electronics students heading into Embedded Systems or VLSI Design.",
      body: "ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation — if you want to work in embedded hardware, firmware, or VLSI, these two foundations come first.",
    },
    {
      heading: "Students who tried advanced topics and found them unclear.",
      body: "Whether it is RTOS, GPIO, digital logic, or chip design — Electronics and C Programming sit underneath all of it. Building those foundations first is what makes every next step clearer.",
    },
    {
      heading: "Professionals moving from software or non-core backgrounds.",
      body: "From software, mechanical, or unrelated fields into embedded hardware, firmware, or VLSI design — this is the structured starting point before advanced concepts.",
    },
  ];

  return (
    <section id="esp-who" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className={`${EYEBROW} mb-4 text-center`}>Audience</div>

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

// ─── Section: Product card ────────────────────────────────────────────────────

function ProductSection({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <section id="esp-product" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display font-extrabold text-[28px] leading-tight tracking-[-0.02em] text-[#111827] text-center sm:text-[36px]">
        Start With The Right Foundation.
      </h2>

      <div className="mt-8 rounded-2xl border-2 border-[#111827] bg-white overflow-hidden shadow-[0_4px_0_#111827]">
        <div className="bg-[#ECFDF3] border-b border-[#E5E7EB] px-7 py-5">
          <div className={`${EYEBROW} mb-1`}>Product</div>
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
            <span className="text-[13px] text-[#6B7280] font-medium">2 Months Access</span>
          </div>

          <div className="pt-6">
            <a
              href={checkoutUrl}
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
      <InsideThePackSection />
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
