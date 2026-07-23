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

        <div className="grid md:grid-cols-2 gap-5">
          {data.map((segment, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-line bg-surface px-6 py-5"
            >
              <span className="shrink-0 w-12 h-12 rounded-full bg-amber/15 flex items-center justify-center text-2xl">
                {segment.emoji}
              </span>
              <div>
                <span className="font-display font-semibold text-lg md:text-xl text-text leading-snug">
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