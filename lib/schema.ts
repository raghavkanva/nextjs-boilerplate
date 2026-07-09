import { instructor, plans, courses, faqs, site } from "@/data/content";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "eTalVis",
    url: "https://etalvis.com",
    description: site.brandTagline,
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: instructor.name,
    url: instructor.linkedin,
    sameAs: [instructor.linkedin],
    jobTitle: "Embedded Systems Engineer",
    description: instructor.bio,
  };
}

export function buildCourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Embedded Systems Foundation Courses",
    description:
      "A set of 10 foundation courses covering electronics, C programming, embedded hardware, GPIO, controllers, interface protocols, microprocessor internals, 8085, ARM, and networking concepts.",
    provider: {
      "@type": "EducationalOrganization",
      name: "eTalVis",
      sameAs: "https://etalvis.com",
    },
    instructor: {
      "@type": "Person",
      name: instructor.name,
      sameAs: instructor.linkedin,
    },
    hasCourseInstance: plans.map((plan) => ({
      "@type": "CourseInstance",
      courseMode: "online",
      name: `${plan.name} access`,
      offers: {
        "@type": "Offer",
        price: plan.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: plan.checkoutUrl,
      },
    })),
    hasPart: courses.map((c) => ({
      "@type": "Course",
      name: c.title,
      position: c.number,
    })),
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
