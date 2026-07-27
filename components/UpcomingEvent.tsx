import { upcomingEvent } from "@/data/content";

export default function UpcomingEvent() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10 md:py-12">
      <div className="rounded-2xl border-2 border-amber bg-surface p-6 md:p-8 text-center glow-amber-soft">
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
        
<a href={upcomingEvent.ctaHref}
  className="inline-block px-7 py-3.5 rounded-md bg-amber text-onAccent font-display font-bold hover:scale-[1.02] transition-transform"
>
  {upcomingEvent.ctaLabel}
</a>
      </div>
    </section>
  );
}