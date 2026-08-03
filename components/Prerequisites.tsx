import { prerequisites } from "@/data/content";

export default function Prerequisites() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text text-center mb-8">
        Prerequisites
      </h2>
      <div className="rounded-xl border-2 border-text bg-white p-8">
        <ul className="flex flex-col gap-5">
          {prerequisites.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-4 text-lg md:text-xl text-muted leading-relaxed"
            >
              <span className="text-amber mt-1 text-2xl leading-none">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
