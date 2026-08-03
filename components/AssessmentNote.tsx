import { assessmentNote } from "@/data/content";

export default function AssessmentNote() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <div className="rounded-lg border-2 border-text bg-white p-8 text-center">
        <p className="text-base md:text-lg text-muted leading-relaxed">
          {assessmentNote}
        </p>
      </div>
    </section>
  );
}
