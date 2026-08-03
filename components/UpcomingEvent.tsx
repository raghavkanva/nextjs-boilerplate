import { upcomingEvent } from "@/data/content";

export default function UpcomingEvent() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-6 md:py-8">
      <div className="rounded-2xl border-2 border-text bg-white p-6 md:p-8 text-center glow-green">
        <p className="text-xs font-bold uppercase tracking-wide text-amber mb-2">
          {upcomingEvent.eyebrow}
        </p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text mb-2">
          {upcomingEvent.title}
        </h2>
        <p className="text-muted font-semibold mb-3">{upcomingEvent.subtitle}</p>
        <p className="text-muted leading-relaxed mb-6 max-w-xl mx-auto">
          {upcomingEvent.description}
        </p>
        <a
          href={upcomingEvent.ctaHref}
          className="inline-block px-7 py-3.5 rounded-full bg-cta text-black border-2 border-text font-display font-bold hover:bg-text hover:text-white transition-colors"
        >
          {upcomingEvent.ctaLabel}
        </a>
      </div>
    </section>
  );
}
