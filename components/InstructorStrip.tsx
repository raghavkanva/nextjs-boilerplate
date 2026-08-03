import Image from "next/image";
import { instructor } from "@/data/content";

export default function InstructorStrip() {
  return (
    <section id="instructor" className="border-y border-line bg-surface scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-12 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2 rounded-full bg-amber/20 blur-xl" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber shadow-lg mx-auto">
            <Image
              src={instructor.photoFormal}
              alt={instructor.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-sm font-semibold text-amber uppercase tracking-wide mb-2">
          Meet Your Instructor
        </p>

        <a
          href={instructor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-extrabold text-3xl md:text-4xl text-text mb-1 inline-block hover:text-amber transition-colors"
        >
          {instructor.name}
        </a>

        <p className="text-muted text-lg mb-6">
          {instructor.yearsExperience} years in the Electronics Industry
        </p>

        <div className="flex justify-center gap-10 mb-8">
          <div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-amber">
              {instructor.studentsEnrolled}
            </div>
            <div className="text-sm text-muted">students enrolled</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-amber">
              {instructor.followers}
            </div>
            <div className="text-sm text-muted">LinkedIn followers</div>
          </div>
        </div>

        <p className="text-base md:text-lg text-muted leading-relaxed mb-5 text-left md:text-center">
          {instructor.bio}
        </p>

        <div className="border-l-4 border-amber pl-4 py-1 mb-6 text-left max-w-xl mx-auto">
          <p className="font-display font-semibold text-text italic">
            {instructor.tagline}
          </p>
        </div>

        <a
          href={instructor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-semibold hover:bg-text hover:text-white transition-colors"
        >
          View LinkedIn Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
