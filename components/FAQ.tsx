import { faqs } from "@/data/content";

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-line py-5">
      <span className="font-display font-medium text-lg md:text-xl text-text block mb-2">
        {q}
      </span>
      <p className="text-base md:text-lg text-muted leading-relaxed">
        {a}
      </p>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-10">
        Questions Before You Enroll
      </h2>
      <div>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}