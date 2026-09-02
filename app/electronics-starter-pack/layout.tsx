import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electronics Starter Pack · Rs. 239 | eTalVis",
  description:
    "Electronics + C Programming foundation courses for ECE students heading into Embedded Systems or VLSI Design. 2 months access.",
  alternates: {
    canonical: "/electronics-starter-pack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electronics Starter Pack | eTalVis",
    description:
      "Electronics + C Programming foundations for ECE students. The right start for Embedded Systems or VLSI Design. 2 months access.",
    images: ["https://courses.etalvis.com/images/og-image.png"],
  },
  openGraph: {
    type: "website",
    siteName: "eTalVis",
    title: "Electronics Starter Pack | eTalVis",
    description:
      "Electronics + C Programming foundations for ECE students heading into Embedded Systems or VLSI Design. 2 months access.",
    url: "https://courses.etalvis.com/electronics-starter-pack",
    images: [
      {
        url: "https://courses.etalvis.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "eTalVis Electronics Starter Pack: Electronics and C Programming Foundation Courses",
      },
    ],
  },
};

// Course, breadcrumb, FAQ, and hero ImageObject schema for this page only.
// The root layout provides Organization and Person schemas globally.
const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": "https://courses.etalvis.com/electronics-starter-pack#course",
      "name": "eTalVis Electronics Starter Pack",
      "description":
        "Two foundation courses for electronics engineering students: the Electronics Foundation Course (electrical fundamentals, electronics fundamentals, number systems, digital electronics) and the C Programming Foundation Course (introduction through structures and storage class, with 200+ practice problems). Intended for students preparing for Embedded Systems or VLSI Design.",
      "url": "https://courses.etalvis.com/electronics-starter-pack",
      "provider": {
        "@type": "Organization",
        "@id": "https://etalvis.com#org",
        "name": "eTalVis",
        "url": "https://etalvis.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://courses.etalvis.com/images/icon.png"
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
        "description": "Electronics educator with 40+ years of industry experience.",
        "image": "https://courses.etalvis.com/images/balajee-formal.png",
        "sameAs": "https://www.linkedin.com/in/balajeeseshadri/"
      },
      "hasCourseInstance": [
        {
          "@type": "CourseInstance",
          "name": "Electronics Foundation Course",
          "courseMode": "online"
        },
        {
          "@type": "CourseInstance",
          "name": "C Programming Foundation Course",
          "courseMode": "online"
        }
      ],
      "offers": {
        "@type": "Offer",
        "price": "239",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "category": "Education",
        "url": "https://learn.etalvis.com/web/checkout/6a95416cc8cef8fac0b83a48"
      },
      "educationalLevel": "Beginner",
      "teaches": [
        "Electrical Fundamentals",
        "Electronics Fundamentals",
        "Number Systems",
        "Digital Electronics",
        "Introduction to C Programming",
        "Decision Making and Loops",
        "Arrays, Strings, and Pointers",
        "Structures",
        "Storage Class"
      ],
      "coursePrerequisites": "No prior knowledge required",
      "inLanguage": "en",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType":
          "ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related core engineering branches"
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
      "@id": "https://courses.etalvis.com/electronics-starter-pack#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://courses.etalvis.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Courses",
          "item": "https://courses.etalvis.com/courses"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Electronics Starter Pack",
          "item": "https://courses.etalvis.com/electronics-starter-pack"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://courses.etalvis.com/electronics-starter-pack#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is this pack for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The pack is designed for Electronics Engineering students who are interested in Embedded Systems or VLSI Design and want to build the right foundation before going deeper. It is suited for ECE, EEE, EIE, Mechatronics, Electrical, Instrumentation and related branches."
          }
        },
        {
          "@type": "Question",
          "name": "What courses are included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Starter Pack includes the Electronics Foundation Course and the C Programming Foundation Course."
          }
        },
        {
          "@type": "Question",
          "name": "How long can I access the courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The pack is valid for 2 months from the date of purchase."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I watch the courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After purchasing, visit learn.etalvis.com or use the eTalVis Android or iOS app."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need prior knowledge before joining?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This pack is intended as a starting point for students who want to build their foundations first before going deeper into any Electronics path."
          }
        },
        {
          "@type": "Question",
          "name": "Why are Electronics and C Programming included together?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Whether you are heading into Embedded Systems or VLSI Design, both paths start from the same place. Electronics fundamentals to understand the hardware. C Programming to write for it. That is why the pack includes both."
          }
        },
        {
          "@type": "Question",
          "name": "Does this pack include the full Foundation Course?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This pack contains two foundation courses: Electronics Foundation and C Programming Foundation. It is designed as an entry point."
          }
        },
        {
          "@type": "Question",
          "name": "What comes after completing these courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After strengthening these two foundations, you can continue into deeper topics through the eTalVis learning pathway."
          }
        }
      ]
    },
    {
      "@type": "ImageObject",
      "@id": "https://courses.etalvis.com/electronics-starter-pack#hero-illustration",
      "name": "Electronics Foundation Course and C Programming Foundation Course illustration",
      "description":
        "Illustration showing two students, one studying electronics fundamentals and one coding in C, joined by a plus symbol, representing the two foundation courses in the eTalVis Electronics Starter Pack.",
      "contentUrl": "https://courses.etalvis.com/images/esp-hero-illustration.svg",
      "encodingFormat": "image/svg+xml",
      "isPartOf": {
        "@type": "WebPage",
        "@id": "https://courses.etalvis.com/electronics-starter-pack"
      }
    }
  ]
};

export default function ElectronicsStarterPackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {children}
    </>
  );
}
