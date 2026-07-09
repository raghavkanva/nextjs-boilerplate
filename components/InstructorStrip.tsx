import Image from "next/image";
import { instructor } from "@/data/content";

export default function InstructorStrip() {
  return (
    <section className="border-y border-line bg-surface py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-line shrink-0">
            <Image
              src={instructor.photoFormal}
              alt={instructor.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <a
              href={instructor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-3xl md:text-4xl text-text leading-tight hover:text-amber transition-colors"
            >
              {instructor.name}
            </a>
            <p className="text-base md:text-lg text-muted mt-1">
              {instructor.yearsExperience} years in the Electronics Industry
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="font-display font-semibold text-2xl text-amber">
              {instructor.studentsEnrolled}
            </div>
            <div className="text-sm text-muted">students enrolled</div>
          </div>
          <div className="text-center">
            <div className="font-display font-semibold text-2xl text-amber">
              {instructor.followers}
            </div>
            <div className="text-sm text-muted">LinkedIn followers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
