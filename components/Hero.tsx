"use client";

import { hero } from "@/data/content";

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

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
      <div className="inline-block px-5 py-2 rounded-full bg-amber text-onAccent font-display font-bold text-sm md:text-base mb-8">
        {hero.badge}
      </div>

      <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.15] mb-6 text-text">
        {hero.headlinePlain}{" "}
        <span className="text-amber">{hero.headlineAccent}</span>
      </h1>

      <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-line bg-surface px-6 py-5">
        <p className="text-xl md:text-2xl text-muted leading-relaxed">
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

      <a
        href="#plans"
        onClick={() =>
          typeof window !== "undefined" &&
          window.gtag &&
          window.gtag("event", "cta_click", { location: "hero" })
        }
        className="inline-block px-8 py-4 rounded-md bg-amber text-onAccent font-display font-bold text-lg glow-amber transition-transform hover:scale-[1.02]"
      >
        {hero.ctaLabel}
      </a>
    </section>
  );
}