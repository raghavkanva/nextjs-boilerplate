import { prerequisites } from "@/data/content";

export default function Prerequisites() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="font-display font-semibold text-xl md:text-2xl text-text text-center mb-6">
        Prerequisites
      </h2>
      <ul className="flex flex-col gap-3">
        {prerequisites.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base md:text-lg text-muted leading-relaxed"
          >
            <span className="text-amber mt-1">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
