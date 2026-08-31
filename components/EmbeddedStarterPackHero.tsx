"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { track, metaEvent } from "@/lib/analytics";

const CHECKOUT_URL = "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48";

function handleCTA(location: string) {
  track("esp_cta_click", { location });
  metaEvent("InitiateCheckout", {
    content_name: "Embedded Starter Pack",
    content_type: "ESP",
    value: 239,
    currency: "INR",
    num_items: 1,
  });
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Subtle circuit-lines SVG for the right column background
function CircuitBg() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <line x1="60" y1="100" x2="60" y2="420" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.5" />
      <line x1="60" y1="100" x2="200" y2="100" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="100" r="4" fill="#D1FAE5" opacity="0.6" />
      <circle cx="200" cy="100" r="4" fill="#D1FAE5" opacity="0.6" />
      <circle cx="60" cy="260" r="4" fill="#D1FAE5" opacity="0.6" />

      <line x1="420" y1="180" x2="420" y2="380" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.4" />
      <line x1="300" y1="180" x2="420" y2="180" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.4" />
      <circle cx="420" cy="180" r="4" fill="#D1FAE5" opacity="0.5" />
      <circle cx="300" cy="180" r="4" fill="#D1FAE5" opacity="0.5" />
      <circle cx="420" cy="380" r="4" fill="#D1FAE5" opacity="0.5" />

      <rect x="140" y="320" width="36" height="24" rx="3" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.5" />
      <line x1="140" y1="332" x2="120" y2="332" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.4" />
      <line x1="176" y1="332" x2="196" y2="332" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.4" />

      <rect x="320" y="400" width="30" height="20" rx="3" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.4" />
      <line x1="320" y1="410" x2="304" y2="410" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.35" />
      <line x1="350" y1="410" x2="366" y2="410" stroke="#E5E7EB" strokeWidth="1.2" opacity="0.35" />

      <line x1="60" y1="260" x2="140" y2="260" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.4" />
      <line x1="200" y1="260" x2="300" y2="260" stroke="#D1FAE5" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

export default function EmbeddedStarterPackHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyCTAVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ background: "#F8F8F4" }}
        className="w-full"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-20 lg:py-24 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

            {/* ── LEFT ─────────────────────────────────────────────────── */}
            <div className="flex-[1.2] min-w-0">

              {/* Product title */}
              <p
                className="font-display font-bold mb-5"
                style={{ fontSize: "clamp(22px, 2.8vw, 28px)", color: "#15803D" }}
              >
                eTalVis Embedded Starter Pack
              </p>

              {/* Headline */}
              <h1
                className="font-display font-bold leading-[1.08] tracking-tight mb-6"
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  color: "#111827",
                  textWrap: "balance",
                }}
              >
                Every Electronics Engineering Student&apos;s{" "}
                <span className="relative inline-block">
                  First Step
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "#22C55E", opacity: 0.7 }}
                    aria-hidden="true"
                  />
                </span>{" "}
                Starts Here.
              </h1>

              {/* Supporting copy */}
              <p
                className="font-body text-lg leading-relaxed mb-8 max-w-[560px]"
                style={{ color: "#4B5563" }}
              >
                If Embedded Systems is the field you want to explore, start by
                strengthening the two foundations that come first: Electronics
                and C Programming.
              </p>

              {/* Course pair */}
              <div className="mb-8">
                <div className="flex flex-col gap-0">
                  <div className="flex items-start gap-4 py-4 border-t border-[#E5E7EB]">
                    <span className="font-mono text-[11px] font-medium pt-0.5" style={{ color: "#16A34A" }}>01</span>
                    <span className="font-display font-semibold text-xl" style={{ color: "#111827" }}>
                      Electronics Foundation Course
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center py-1 text-[#6B7280]"
                    style={{ fontSize: "20px", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    +
                  </div>
                  <div className="flex items-start gap-4 py-4 border-b border-[#E5E7EB]">
                    <span className="font-mono text-[11px] font-medium pt-0.5" style={{ color: "#16A34A" }}>02</span>
                    <span className="font-display font-semibold text-xl" style={{ color: "#111827" }}>
                      C Programming Foundation Course
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display font-bold" style={{ fontSize: "40px", color: "#111827", lineHeight: 1 }}>
                  ₹239
                </span>
                <span
                  className="w-px h-6 inline-block"
                  style={{ background: "#E5E7EB" }}
                  aria-hidden="true"
                />
                <span className="font-body font-medium text-lg" style={{ color: "#4B5563" }}>
                  2 Months Access
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <a
                  href={CHECKOUT_URL}
                  onClick={() => handleCTA("hero")}
                  className="inline-flex items-center gap-2.5 font-display font-bold text-lg rounded-full transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFC400]"
                  style={{
                    background: "#FFC400",
                    color: "#111827",
                    border: "2px solid #111827",
                    padding: "15px 28px",
                    boxShadow: "0 3px 0 #111827",
                    alignSelf: "flex-start",
                  }}
                >
                  Start Your Foundation
                  <ArrowRight />
                </a>

                {/* Microcopy */}
                <p className="font-body text-[13px]" style={{ color: "#6B7280" }}>
                  For students from ECE, EEE, EIE, Mechatronics, Electrical,
                  Instrumentation and related core engineering branches.
                </p>
              </div>
            </div>

            {/* ── RIGHT ────────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-[400px]">
                {/* Soft green oval background */}
                <div
                  className="absolute inset-x-6 bottom-0 top-10 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] -z-10"
                  style={{ background: "#ECFDF3" }}
                  aria-hidden="true"
                />

                {/* Circuit lines — behind photo */}
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                  <CircuitBg />
                </div>

                {/* Balajee photo */}
                <Image
                  src="/images/balajee-formal.png"
                  alt="Balajee Seshadri, Instructor at eTalVis"
                  width={400}
                  height={480}
                  priority
                  className="relative z-10 w-full object-cover object-top rounded-2xl"
                  style={{ maxHeight: "460px" }}
                />

                {/* Instructor label */}
                <div
                  className="absolute bottom-4 left-4 right-4 z-20 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <p className="font-display font-semibold text-lg" style={{ color: "#111827" }}>
                    Balajee Seshadri
                  </p>
                  <p className="font-body text-sm mt-0.5" style={{ color: "#4B5563" }}>
                    40+ Years in Electronics
                  </p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "#6B7280" }}>
                    Guiding students to build the fundamentals first.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sticky mini CTA (appears after hero scrolls away) ─────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 transition-transform duration-300"
        style={{
          transform: stickyCTAVisible ? "translateY(0)" : "translateY(100%)",
          background: "#FFFFFF",
          borderTop: "1px solid #E5E7EB",
          boxShadow: "0 -6px 24px rgba(17,24,39,0.08)",
        }}
        aria-hidden={!stickyCTAVisible}
      >
        <div className="mx-auto max-w-4xl px-5 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-[#111827] leading-tight">
              Embedded Starter Pack
            </p>
            <p className="font-body text-xs text-[#6B7280] mt-0.5">
              ₹239 · 2 Months Access
            </p>
          </div>
          <a
            href={CHECKOUT_URL}
            onClick={() => handleCTA("sticky")}
            className="shrink-0 inline-flex items-center gap-2 font-display font-bold text-sm rounded-full transition-colors hover:bg-[#F4B800]"
            style={{
              background: "#FFC400",
              color: "#111827",
              border: "2px solid #111827",
              padding: "10px 20px",
            }}
          >
            Start Learning
            <ArrowRight />
          </a>
        </div>
      </div>
    </>
  );
}
