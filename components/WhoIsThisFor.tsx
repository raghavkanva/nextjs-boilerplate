import { whoIsThisFor } from "@/data/content";

type AudienceItem = {
  emoji: string;
  title: string;
  line?: string;
  note?: string;
};

function SegmentIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("college student")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 12v5c2 2 8 2 12 0v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (t.includes("final-year") || t.includes("final year")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <rect x="4" y="3" width="13" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h6M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M17 7h2a2 2 0 012 2v9a2 2 0 01-2 2H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (t.includes("recent graduate") || t.includes("graduated")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 5l2 2-2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (t.includes("job search") || t.includes("actively")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (t.includes("higher secondary") || t.includes("school")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <path d="M3 21V9l9-6 9 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="9" y="14" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 10h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (t.includes("just finished") || t.includes("transition")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (t.includes("professional") || t.includes("switching") || t.includes("career")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
        <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhoIsThisFor({
  items,
  heading = "Who Is This For?",
}: {
  items?: AudienceItem[];
  heading?: string;
}) {
  const data = items ?? whoIsThisFor;

  return (
    <section className="bg-bg py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-text text-center mb-4">
          {heading.includes("This For") ? (
            <>
              Who Is <span className="text-amber">This For?</span>
            </>
          ) : (
            heading
          )}
        </h2>
        <div className="w-16 h-1 bg-amber rounded-full mx-auto mb-6" />
        <p className="text-lg md:text-xl text-muted text-center mb-8">
          This is for you if you're a:
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-8">
          {data.map((segment, i) => (
            <div
              key={i}
              className="flex items-start gap-3 md:gap-4 rounded-xl border-2 border-text bg-white px-4 md:px-6 py-4 md:py-5 min-w-0"
            >
              <span className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface flex items-center justify-center border border-amber/30">
                <SegmentIcon title={segment.title} />
              </span>
              <div className="min-w-0">
                <span className="font-display font-semibold text-base md:text-xl text-text leading-snug break-words">
                  {segment.title}
                </span>
                {segment.line && (
                  <p className="text-base text-muted leading-relaxed mt-1.5">
                    {segment.line}
                  </p>
                )}
                {segment.note && (
                  <p className="text-sm text-muted/80 italic leading-relaxed mt-1.5">
                    {segment.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
