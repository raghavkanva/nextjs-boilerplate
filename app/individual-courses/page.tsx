import type { Metadata } from "next";
import PageAnalytics from "@/components/PageAnalytics";
import IndividualCoursesGrid from "@/components/IndividualCoursesGrid";
import Footer from "@/components/Footer";
import { courses } from "@/data/content";

export const metadata: Metadata = {
  title: "Individual Courses | Embedded Systems Foundation | eTalVis",
  description:
    "9 individual foundation courses available separately. Electronics, C programming, embedded hardware, embedded software, microprocessors, ARM, 8085, and networking. ₹159/month or ₹319/3 months per course.",
  keywords: [
    "individual embedded systems course",
    "electronics course India",
    "C programming course",
    "embedded hardware course",
    "eTalVis",
    "Balajee Seshadri",
  ],
  openGraph: {
    title: "Individual Courses | Embedded Systems Foundation | eTalVis",
    description:
      "9 individual foundation courses. Pick only what you need. ₹159/month or ₹319/3 months per course.",
    url: "https://courses.etalvis.com/individual-courses",
    siteName: "eTalVis",
    images: [
      {
        url: "https://courses.etalvis.com/images/icon.png",
        width: 512,
        height: 512,
        alt: "eTalVis Individual Courses",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Individual Courses | eTalVis",
    description:
      "9 individual foundation courses. ₹159/month or ₹319/3 months per course. Taught by Balajee Seshadri.",
    images: ["https://courses.etalvis.com/images/icon.png"],
  },
  alternates: {
    canonical: "https://courses.etalvis.com/individual-courses",
  },
};

const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Embedded Systems Foundation — Individual Courses",
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
        url: `https://courses.etalvis.com/individual-courses`,
        provider: {
          "@type": "EducationalOrganization",
          name: "eTalVis",
          sameAs: "https://etalvis.com",
        },
      },
    })),
};

export default function IndividualCoursesPage() {
  return (
    <main>
      <PageAnalytics
        page="individual-courses"
        contentName="Individual Courses"
        contentCategory="Course"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />

      {/* Page header */}
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-10 text-center sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-surfaceRaised px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber">
          9 Courses Available Individually
        </div>

        <h1 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
          Individual{" "}
          <span className="text-ember">Foundation Courses</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Pick the courses you need. ₹159 for 1 month or ₹319 for 3 months per course. Taught by Balajee Seshadri with 40+ years in the Electronics Industry.
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-amber">
          Want all 10 courses?{" "}
          <a href="/embedded-systems" className="underline underline-offset-2 hover:text-amber/80">
            See the bundle course
          </a>{" "}
          — starts at ₹639.
        </p>
      </section>

      {/* Individual courses grid */}
      <div className="py-6 pb-14">
        <IndividualCoursesGrid />
      </div>

      <Footer />
    </main>
  );
}
