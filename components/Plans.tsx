import { Plan, planFeatures, plans } from "@/data/content";
import EnrollButton from "@/components/EnrollButton";

function FeatureSwitch({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-4 rounded-sm border border-amber flex items-center px-0.5 justify-end bg-amber/10 shrink-0">
        <div className="w-3 h-3 rounded-[1px] bg-amber" />
      </div>
      <span className="text-sm md:text-base text-text leading-snug">
        {label}
      </span>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const highlight = plan.tag === "Best Value";
  const isBestSeller = plan.tag === "Best Seller";
  const glowClass = highlight ? "glow-ember" : isBestSeller ? "glow-amber" : "";
  const borderClass = highlight
    ? "border-ember"
    : isBestSeller
    ? "border-amber"
    : "border-line";

  return (
    <div
      className={`rounded-lg border ${borderClass} ${glowClass} bg-surface p-6 flex flex-col`}
    >
      {plan.tag && (
        <div
          className={`text-xs inline-block px-2.5 py-1 rounded-full mb-4 w-fit font-mono ${
            highlight ? "bg-ember/15 text-ember" : "bg-amber/15 text-amber"
          }`}
        >
          {plan.tag}
        </div>
      )}
      <h3 className="font-display font-semibold text-xl text-text mb-1">
        {plan.name}
      </h3>
      <p className="text-sm text-muted mb-4">{plan.duration}</p>
      <div className="mb-6">
        <span className="font-display font-semibold text-3xl text-text">
          Rs. {plan.price}
        </span>
      </div>
      <div className="flex flex-col gap-3 mb-8 flex-1">
        {planFeatures.map((f, i) => (
          <FeatureSwitch key={i} label={f} />
        ))}
      </div>
      <EnrollButton
        href={plan.checkoutUrl}
        label={`Enroll, ${plan.name}`}
        className="w-full py-3 rounded-md font-display font-semibold text-sm text-center transition-transform hover:scale-[1.02] bg-amber text-onAccent"
      />
    </div>
  );
}

export default function PlansGrid({
  heading,
  subline,
  id,
}: {
  heading: string;
  subline: string;
  id?: string;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-3">
        {heading}
      </h2>
      <p className="text-base md:text-lg text-muted text-center mb-12">
        {subline}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.code} plan={plan} />
        ))}
      </div>
    </section>
  );
}