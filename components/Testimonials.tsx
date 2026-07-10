import { Testimonial } from "@/data/content";

function QuoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <path
        d="M7.5 8C5.5 8 4 9.5 4 11.5C4 13.5 5.5 15 7.5 15C7.2 17 5.8 18.5 4 19V21C7.5 20.5 10 17.5 10 13.5V11.5C10 9.5 8.5 8 7.5 8Z"
        fill="currentColor"
      />
      <path
        d="M17.5 8C15.5 8 14 9.5 14 11.5C14 13.5 15.5 15 17.5 15C17.2 17 15.8 18.5 14 19V21C17.5 20.5 20 17.5 20 13.5V11.5C20 9.5 18.5 8 17.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 5 3.87 6 2.5 6S0 5 0 3.5 1.12 1 2.49 1s2.49 1 2.49 2.5zM.24 8.75h4.5V23H.24V8.75zm7.75 0h4.32v1.95h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-4.5V8.75z" />
    </svg>
  );
}

export function TestimonialLight({ items }: { items: Testimonial[] }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text text-center mb-10">
        What Our Students Are Saying
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
      {items.map((t, i) => (
        <div
          key={i}
          className="rounded-lg border border-line bg-surface p-6 flex flex-col gap-3"
        >
          <QuoteIcon />
          <p className="text-base md:text-lg text-text leading-relaxed">
            {t.quote}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted font-medium">{t.name}</span>
            <a
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-amber"
            >
              <LinkedinIcon /> View on LinkedIn
            </a>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}

export function TestimonialDetailed({ items }: { items: Testimonial[] }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-3">
          Real Stories. Real Results.
        </h2>
        <p className="text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          From confusion to clarity, from theory to real-world application.
          These are the journeys that prove what is possible.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <div
            key={i}
            className="rounded-lg border border-line bg-surfaceRaised p-7 flex flex-col gap-3"
          >
            <span className="font-display font-medium text-lg text-amber">
              {t.title}
            </span>
            <p className="text-base text-text leading-relaxed">{t.quote}</p>
            {t.context && (
              <p className="text-sm text-mutedDim">{t.context}</p>
            )}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-line">
              <span className="text-sm text-muted font-medium">{t.name}</span>
              <a
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-amber"
              >
                <LinkedinIcon /> View on LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
