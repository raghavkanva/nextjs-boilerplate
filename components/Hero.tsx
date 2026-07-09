import { hero } from "@/data/content";

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
      <div className="inline-block text-xs px-3 py-1 rounded-full border border-line text-amber font-mono mb-8 tracking-wide">
        embedded systems foundation courses
      </div>
      <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.1] mb-6 text-text">
        {hero.headline}
      </h1>
      <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
        {hero.subline}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base text-muted mb-8">
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
