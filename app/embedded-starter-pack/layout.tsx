import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embedded Systems Starter Pack Course | Electronics + C Programming | eTalVis",
  description:
    "Start your Embedded Systems learning with the Electronics Foundation Course and C Programming Foundation Course. The eTalVis Embedded Starter Pack includes 2 courses with 2 months access for ₹239.",
  twitter: {
    card: "summary_large_image",
    title: "eTalVis Embedded Starter Pack · ₹239",
    description:
      "Electronics + C Programming Foundation Courses. The right foundation for Embedded Systems. 2 months access, 200+ problems.",
  },
  openGraph: {
    type: "website",
    siteName: "eTalVis",
    title: "eTalVis Embedded Starter Pack: Electronics + C Programming · ₹239",
    description:
      "Electronics Foundation Course + C Programming Foundation Course. Built for ECE, EEE, EIE and related branches. Start building the right way.",
    url: "https://etalvis.com/embedded-starter-pack",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": "https://etalvis.com/embedded-starter-pack#course",
      "name": "eTalVis Embedded Starter Pack",
      "description":
        "The eTalVis Embedded Starter Pack includes two foundation courses: Electronics Foundation Course and C Programming Foundation Course. Designed to give Embedded Systems beginners a proper start. Covers 200+ hands-on problems across electronics fundamentals and C programming logic.",
      "url": "https://etalvis.com/embedded-starter-pack",
      "provider": {
        "@type": "Organization",
        "@id": "https://etalvis.com#org",
        "name": "eTalVis",
        "url": "https://etalvis.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://etalvis.com/images/icon.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9790873099",
          "contactType": "customer support"
        }
      },
      "instructor": {
        "@type": "Person",
        "@id": "https://etalvis.com#balajee",
        "name": "Balajee Seshadri",
        "description": "Electronics educator with 40+ years of experience guiding students to build fundamentals first.",
        "image": "https://etalvis.com/images/balajee-formal.png"
      },
      "hasCourseInstance": [
        {
          "@type": "CourseInstance",
          "name": "Electronics Foundation Course",
          "courseMode": "online",
          "courseWorkload": "PT60H"
        },
        {
          "@type": "CourseInstance",
          "name": "C Programming Foundation Course",
          "courseMode": "online",
          "courseWorkload": "PT60H"
        }
      ],
      "offers": {
        "@type": "Offer",
        "price": "239",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "category": "Education",
        "url": "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48"
      },
      "educationalLevel": "Beginner",
      "teaches": [
        "Electronics fundamentals",
        "C Programming",
        "Embedded Systems foundations"
      ],
      "coursePrerequisites": "No prior knowledge required",
      "inLanguage": "en",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType":
          "ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related core engineering branches"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "120",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://etalvis.com#org",
      "name": "eTalVis",
      "url": "https://etalvis.com",
      "sameAs": ["https://www.linkedin.com/company/etalvis"]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://etalvis.com/embedded-starter-pack#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://etalvis.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Courses",
          "item": "https://etalvis.com/courses"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Embedded Starter Pack",
          "item": "https://etalvis.com/embedded-starter-pack"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://etalvis.com/embedded-starter-pack#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is the Embedded Starter Pack for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The pack is designed for students from ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related branches who are beginning their Embedded Systems journey. It is also suited for professionals switching into the electronics domain."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in the Embedded Starter Pack?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Embedded Starter Pack includes two courses: Electronics Foundation Course and C Programming Foundation Course. Both provide 2 months of access and cover 200+ problems to solve."
          }
        },
        {
          "@type": "Question",
          "name": "How much does the Embedded Starter Pack cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Embedded Starter Pack costs ₹239 and includes 2 months of access to both courses."
          }
        },
        {
          "@type": "Question",
          "name": "Can I access the courses on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The courses are accessible via learn.etalvis.com and the eTalVis Android and iOS apps."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a bulk purchase option?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. For bulk purchases (colleges, labs, or groups), contact eTalVis directly via WhatsApp at +91 9790873099."
          }
        }
      ]
    }
  ]
};

export default function EmbeddedStarterPackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
