import Image from "next/image";
import { instructor } from "@/data/content";

export default function InstructorStrip() {
  return (
    <section id="instructor" className="border-y border-line bg-surface scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-10 text-center">
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
          Meet the Instructor
        </p>

        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-text mb-2 leading-snug">
          Guidance Backed by 40+ Years in the Electronics Industry
        </h2>

        <a
          href={instructor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-bold text-xl text-amber mb-4 inline-block hover:underline transition-colors"
        >
          {instructor.name}
        </a>

        <p className="text-base md:text-lg text-muted leading-relaxed mb-6">
          {instructor.bio}
        </p>

        <ul className="flex flex-col gap-3 mb-8 text-left max-w-sm mx-auto">
          {instructor.trustPoints.map((point, i) => (
            <li key={i} className="flex items-center gap-3 text-base text-text">
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-amber">
                  <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>

        <a
          href={instructor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cta text-black border-2 border-text font-display font-semibold hover:bg-text hover:text-white transition-colors"
        >
          View LinkedIn Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber group-hover:text-white transition-colors">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
