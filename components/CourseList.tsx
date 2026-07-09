import { courses, coursesIntro } from "@/data/content";

export default function CourseList() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-lg md:text-xl text-muted text-center max-w-2xl mx-auto mb-12 leading-relaxed">
        {coursesIntro}
      </p>
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-text text-center mb-2">
        Courses Covered by This Purchase
      </h2>
      <p className="text-base md:text-lg text-muted text-center mb-12">
        Every plan unlocks all 10. The only difference is how long you keep
        access.
      </p>
      <div className="flex flex-col gap-8">
        {courses.map((c) => (
          <div key={c.number} className="flex gap-5">
            <span className="font-mono text-amber text-sm md:text-base mt-1 shrink-0 w-8">
              {String(c.number).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display font-medium text-lg md:text-xl text-text mb-2">
                {c.title}
              </h3>
              <p className="text-base text-muted leading-relaxed">
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
