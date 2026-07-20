import { platformFeatures } from "@/data/content";

export default function PlatformFeatures() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 md:py-12">
      <div className="text-center mb-12">
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-3">
          {platformFeatures.heading}
        </h2>
        <p className="text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          {platformFeatures.subline}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {platformFeatures.features.map((f, i) => (
          <div
            key={i}
            className="rounded-lg border border-line bg-surface p-6"
          >
            <h3 className="font-display font-semibold text-xl text-amber mb-2">
              {f.name}
            </h3>
            <p className="text-base text-muted leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
