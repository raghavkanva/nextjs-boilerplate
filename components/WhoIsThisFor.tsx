import { whoIsThisFor } from "@/data/content";

type AudienceItem = {
  emoji: string;
  title: string;
  line?: string;
  note?: string;
};

export default function WhoIsThisFor({
  items,
  heading = "Who Is This For?",
}: {
  items?: AudienceItem[];
  heading?: string;
}) {
  const data = items ?? whoIsThisFor;

  return (
    <section className="bg-bg py-10 md:py-12">
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
        <p className="text-lg md:text-xl text-muted text-center mb-12">
          This is for you if you're a:
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {data.map((segment, i) => (
            <div
              key={i}
              className="flex items-start gap-3 md:gap-4 rounded-xl border-2 border-text bg-white px-4 md:px-6 py-4 md:py-5 min-w-0"
            >
              <span className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface flex items-center justify-center text-xl md:text-2xl border border-amber/30">
                {segment.emoji}
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
