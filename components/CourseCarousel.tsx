import { courses, coursesIntro } from "@/data/content";

export default function CourseCarousel() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-lg md:text-xl text-muted text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {coursesIntro}
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-text text-center mb-2">
          Courses Covered by This Purchase
        </h2>
        <p className="text-base md:text-lg text-muted text-center mb-12">
          Every plan unlocks all 10. The only difference is how long you keep
          access.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-thin max-w-full">
        {courses.map((c) => (
          <div
            key={c.number}
            className="relative shrink-0 w-[320px] md:w-[360px] rounded-xl border border-line bg-surface p-7 snap-start overflow-hidden"
          >
            <span className="absolute top-4 right-5 font-display font-bold text-6xl text-line select-none leading-none">
              {String(c.number).padStart(2, "0")}
            </span>

            <div className="relative">
              <span className="inline-block text-xs font-mono font-semibold tracking-wide px-3 py-1 rounded-full bg-amber/15 text-amber mb-5">
                {c.tag.toUpperCase()}
              </span>

              <h3 className="font-display font-semibold text-xl md:text-2xl text-text mb-3 leading-snug">
                {c.title}
              </h3>

              <p className="text-sm md:text-base text-muted leading-relaxed">
                {c.sections.join(", ")}
                {c.note ? `. ${c.note}.` : "."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
