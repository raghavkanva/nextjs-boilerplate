import { faqs as courseFaqs } from "@/data/content";

type FaqItem = { q: string; a: string };

function FAQItem({ q, a }: FaqItem) {
  return (
    <div className="border-b border-line px-6 py-5 last:border-b-0 first:pt-7 last:pb-7">
      <span className="font-display font-medium text-lg md:text-xl text-text block mb-2">
        {q}
      </span>
      <p className="text-base md:text-lg text-muted leading-relaxed">{a}</p>
    </div>
  );
}

export default function FAQ({
  items,
  heading = "Questions Before You Enroll",
}: {
  items?: FaqItem[];
  heading?: string;
}) {
  const data = items ?? courseFaqs;

  return (
    <section className="max-w-3xl mx-auto px-6 py-6 md:py-8">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-10">
        {heading}
      </h2>
      <div className="rounded-2xl border-2 border-text bg-white overflow-hidden">
        {data.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}
