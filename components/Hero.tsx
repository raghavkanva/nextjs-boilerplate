"use client";

import { hero, site } from "@/data/content";

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

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-6 pb-6 sm:pt-8 md:pt-10 md:pb-8 text-center">
      <div className="flex justify-center mb-6">
    <Image
      src="public\images\icon.png"
      alt="eTalVis logo"
      width={64}
      height={64}
      priority
      className="h-14 w-14 md:h-16 md:w-16 rounded-xl"
    />
  </div>
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber text-onAccent font-display font-bold text-lg md:text-2xl mb-8 animate-eyebrow-in shadow-md">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-onAccent opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-onAccent" />
        </span>
        <span className="animate-shimmer bg-[length:200%_auto] bg-clip-text">
          {site.brandTagline}
        </span>
      </div>

      <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.15] mb-4 text-text">
        {hero.headlinePlain}{" "}
        <span className="text-amber">{hero.headlineAccent}</span>
      </h1>

<div className="max-w-2xl mx-auto mb-8 rounded-xl border border-amber bg-surface px-6 py-5">
  <p className="text-base md:text-lg text-muted leading-relaxed">
    {hero.sublineBefore}
    <span
      className="font-semibold text-ember"
      style={{ textShadow: "0 0 18px rgba(193,57,26,0.45)" }}
    >
      {hero.sublineHighlight}
    </span>
    {hero.sublineAfter}
  </p>
</div>

      <div className="mb-8 animate-fade-up">
        <span className="inline-block text-2xl md:text-4xl font-display font-extrabold text-amber animate-shimmer bg-[length:200%_auto] bg-clip-text">
          {hero.badge}
        </span>
      </div>

      <a href="#plans"
        onClick={handleHeroCtaClick}
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-bold text-lg glow-amber transition-transform hover:scale-[1.02]"
      >
        {hero.ctaLabel}
      </a>
    </section>
  );
}
