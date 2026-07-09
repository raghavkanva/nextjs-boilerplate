import { hero } from "@/data/content";

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
      <div className="inline-block text-sm md:text-base px-4 py-1.5 rounded-full border border-line text-amber font-mono mb-8 tracking-wide">
        embedded systems foundation courses
      </div>
      <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.1] mb-6 text-text">
        {hero.headline}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base md:text-lg text-muted mb-8">
        {hero.trustPoints.map((point, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">·</span>}
            {point}
          </span>
        ))}
      </div>
      <a
        href="#plans"
        className="inline-block px-8 py-4 rounded-md bg-amber text-bg font-display font-semibold text-lg glow-amber transition-transform hover:scale-[1.02]"
      >
        {hero.ctaLabel}
      </a>
    </section>
  );
}
