"use client";

import Image from "next/image";
import { hero, site, sessionHeroContent } from "@/data/content";

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <path
        d="M4 12a8 8 0 1114.9 4.1L20 20l-4-1.1A8 8 0 014 12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function handleHeroCtaClick() {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", { location: "hero" });
  }
}

export default function Hero({
  variant = "course",
}: {
  variant?: "course" | "session";
}) {
  const isSession = variant === "session";
  const content = isSession ? sessionHeroContent : hero;

  return (
    <section className="max-w-4xl mx-auto px-6 pt-0 pb-6 md:pb-8 text-center">
      <div className="flex justify-center mb-6">
        <Image
          src="/images/icon.png"
          alt="eTalVis logo"
          width={96}
          height={96}
          priority
          className="h-16 w-auto md:h-20 mx-auto"
        />
      </div>

      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-bold text-lg md:text-2xl mb-8 animate-eyebrow-in shadow-md">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-text opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-text" />
        </span>
        {isSession ? (
          <span>{content.badge}</span>
        ) : (
          <span className="animate-shimmer bg-[length:200%_auto] bg-clip-text">
            We make{" "}
            <span className="text-black font-extrabold underline decoration-2 underline-offset-2">
              E
            </span>
            lectronics Student's{" "}
            <span className="text-black font-extrabold underline decoration-2 underline-offset-2">
              Tal
            </span>
            ent{" "}
            <span className="text-black font-extrabold underline decoration-2 underline-offset-2">
              Vis
            </span>
            ible to Industry!
          </span>
        )}
      </div>

      <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.5] mb-4 text-text">
        {content.headlinePlain}{" "}
        <span className="text-amber">{content.headlineAccent}</span>
      </h1>

      {!isSession && (
        <div className="max-w-2xl mx-auto mb-8 rounded-xl border-2 border-text bg-surface px-6 py-5">
          <p className="text-base md:text-lg text-muted leading-relaxed">
            {hero.sublineBefore}
            <span
              className="font-semibold text-ember"
              style={{ textShadow: "0 0 18px rgba(21,128,61,0.35)" }}
            >
              {hero.sublineHighlight}
            </span>
            {hero.sublineAfter}
          </p>
        </div>
      )}

      {isSession && (
        <div className="max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-2 rounded-full border-2 border-text bg-surface text-sm md:text-base font-semibold text-text">
            Includes a free Starter plan worth Rs. 999
          </span>
        </div>
      )}

      {!isSession && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg md:text-xl text-muted mb-8">
          <span className="flex items-center gap-2">
            <PlayIcon />
            {hero.trustPoints[0]}
          </span>
          <span className="flex items-center gap-2">
            <ChatIcon />
            {hero.trustPoints[1]}
          </span>
        </div>
      )}

      {!isSession && (
        <div className="mb-8 animate-fade-up">
          <span className="inline-block text-2xl md:text-4xl font-display font-extrabold text-amber">
            {hero.badge}
          </span>
        </div>
      )}

      <a
        href={isSession ? sessionHeroContent.ctaHref : "#plans"}
        onClick={handleHeroCtaClick}
        className="inline-block px-8 py-4 rounded-full bg-cta text-black border-2 border-text font-display font-bold text-lg hover:bg-text hover:text-white transition-colors"
      >
        {isSession ? sessionHeroContent.ctaLabel : hero.ctaLabel}
      </a>
    </section>
  );
}
