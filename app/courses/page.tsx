import type { Metadata } from "next";
import PageAnalytics from "@/components/PageAnalytics";
import CompleteCoursePanel from "@/components/CompleteCoursePanel";
import IndividualCoursesGrid from "@/components/IndividualCoursesGrid";
import Footer from "@/components/Footer";
import { courses } from "@/data/content";

export const metadata: Metadata = {
  title: "Courses | Embedded Systems Foundation Course | eTalVis",
  description:
    "Enroll in the complete Embedded Systems Foundation Course or individual courses. 10 foundation courses covering electronics, C programming, embedded hardware, embedded software, protocols, microprocessors, ARM, 8085, and networking. Taught by Balajee Seshadri, 40+ years in the Electronics Industry.",
  keywords: [
    "embedded systems course",
    "embedded systems foundation course",
    "electronics foundation course",
    "C programming embedded systems",
    "individual embedded systems course",
    "eTalVis",
    "Balajee Seshadri",
    "embedded systems online course India",
  ],
  openGraph: {
    title: "Courses | Embedded Systems Foundation Course | eTalVis",
    description:
      "The complete Embedded Systems Foundation Course or 9 individual courses. Self-paced, taught by Balajee Seshadri with 40+ years of industry experience.",
    url: "https://courses.etalvis.com/courses",
    siteName: "eTalVis",
    images: [
      {
        url: "https://courses.etalvis.com/images/icon.png",
        width: 512,
        height: 512,
        alt: "eTalVis Embedded Systems Foundation Course",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses | Embedded Systems Foundation Course | eTalVis",
    description:
      "10 self-paced foundation courses or individual courses. Taught by Balajee Seshadri. Doubts cleared on WhatsApp.",
    images: ["https://courses.etalvis.com/images/icon.png"],
  },
  alternates: {
    canonical: "https://courses.etalvis.com/courses",
  },
};

const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Embedded Systems Foundation Course — Individual Courses",
  description:
    "9 individually available foundation courses from the Embedded Systems Foundation Course by eTalVis.",
  itemListElement: courses
    .filter((c) => c.number !== 6)
    .map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.description,
        url: `https://courses.etalvis.com/courses`,
        provider: {
          "@type": "EducationalOrganization",
          name: "eTalVis",
          sameAs: "https://etalvis.com",
        },
      },
    })),
};

export default function CoursesPage() {
  return (
    <main>
      <PageAnalytics
        page="courses"
        contentName="eTalVis Courses"
        contentCategory="Course"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />

      {/* Page header */}
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-10 text-center sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-surfaceRaised px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber">
          10 Foundation Courses
        </div>

        <h1 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
          Embedded Systems{" "}
          <span className="text-ember">Foundation Course</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Taught by Balajee Seshadri, 40+ years in the Electronics Industry. Pre-recorded, self-paced, doubts cleared directly on WhatsApp. Enroll in the complete course or individual courses below.
        </p>
      </section>

      {/* Complete course pricing */}
      <div className="px-4 pb-10 sm:px-6">
        <CompleteCoursePanel />
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative my-2 flex items-center gap-4">
          <div className="flex-1 border-t border-line" />
          <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-mutedDim">
            Or choose an individual course
          </span>
          <div className="flex-1 border-t border-line" />
        </div>
      </div>

      {/* Individual courses */}
      <div className="py-8">
        <IndividualCoursesGrid />
      </div>

      <Footer />
    </main>
  );
}
