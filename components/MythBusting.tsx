import { coreMyths } from "@/data/content";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-mutedDim shrink-0 mt-0.5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0 mt-0.5">
      <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MythBusting() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 md:py-12">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text text-center mb-2">
        Myths vs. Reality
      </h2>
      <p className="text-muted text-center mb-10">
        Five things students get wrong about a core electronics career.
      </p>

      <div className="flex flex-col gap-5">
        {coreMyths.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-line bg-surface p-6 md:p-7"
          >
            <div className="flex items-start gap-2.5 mb-3">
              <XIcon />
              <p className="text-base md:text-lg text-mutedDim leading-relaxed line-through decoration-mutedDim/50">
                {item.myth}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckIcon />
              <p className="text-base md:text-lg text-text font-medium leading-relaxed">
                {item.reality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}