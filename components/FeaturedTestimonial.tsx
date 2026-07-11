import { featuredTestimonial } from "@/data/content";

export default function FeaturedTestimonial() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="rounded-xl border border-amber bg-surface p-8 md:p-10 text-center glow-amber">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text mb-6">
          {featuredTestimonial.title}
        </h2>
        <p className="text-lg md:text-xl text-text leading-relaxed mb-6">
          "{featuredTestimonial.quote}"
        </p>
        <p className="font-display font-semibold text-base md:text-lg text-amber mb-1">
          {featuredTestimonial.name}
        </p>
        <p className="text-sm md:text-base text-muted mb-4">
          {featuredTestimonial.credentials}
        </p>
        <a
          href={featuredTestimonial.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-amber underline"
        >
          View on LinkedIn
        </a>
      </div>
    </section>
  );
}
