import type { Metadata } from "next";
import CareerGuidanceClient from "./CareerGuidanceClient";

export const metadata: Metadata = {
  title: "Demystifying the Myths of the Core Electronics Industry Career",
  description:
    "Balajee Seshadri. 40+ years in the electronics industry, work across India, USA, Germany, and Canada. 57,000+ followers on LinkedIn",
  openGraph: {
    title: "Demystifying the Myths of the Core Electronics Industry Career",
    description:
      "Balajee Seshadri. 40+ years in the electronics industry, work across India, USA, Germany, and Canada.",
    images: [
      {
        // Replace with the final OG image once ready, recommended size 1200x630
        url: "/images/career-guidance-og.png",
        width: 1200,
        height: 630,
        alt: "Core Electronics Career Guidance Course with Balajee Seshadri",
      },
    ],
    type: "website",
  },
};

export default function CareerGuidancePage() {
  return <CareerGuidanceClient />;
}