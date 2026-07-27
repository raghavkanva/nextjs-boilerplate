import type { Metadata } from "next";
import CareerGuidanceClient from "./CareerGuidanceClient";

export const metadata: Metadata = {
  title: "Core Electronics Career Guidance Session, Rs. 99, eTalVis",
  description:
    "Live online session with Balajee Seshadri. Jobs, salary, specialization, interviews, and AI in Core Electronics. Register for Rs. 99, includes a free Foundation course worth Rs. 999.",
  openGraph: {
    title: "Core Electronics Career Guidance Session, Rs. 99",
    description:
      "Live online session with Balajee Seshadri. Straight talk on jobs, salary, specialization, interviews, and AI in Core Electronics.",
    images: [
      {
        // Replace with the final OG image once ready, recommended size 1200x630
        url: "/images/career-guidance-og.png",
        width: 1200,
        height: 630,
        alt: "Core Electronics Career Guidance Session with Balajee Seshadri",
      },
    ],
    type: "website",
  },
};

export default function CareerGuidancePage() {
  return <CareerGuidanceClient />;
}