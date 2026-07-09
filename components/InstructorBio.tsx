import Image from "next/image";
import { instructor } from "@/data/content";

export default function InstructorBio() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden border border-line shrink-0 mx-auto md:mx-0">
          <Image
            src={instructor.photoCasual}
            alt={instructor.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-2">
            {instructor.name}
          </h2>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-4">
            {instructor.bio}
          </p>
          <p className="font-mono text-sm text-amber">{instructor.tagline}</p>
        </div>
      </div>
    </section>
  );
}
