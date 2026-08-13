import type { Metadata } from "next";
import IndependenceOfferClient from "./IndependenceOfferClient";

export const metadata: Metadata = {
  title: "Pay Only 80% on eTalVis Courses | Independence Offer",
  description:
    "India is entering its 80th year of Independence. Get 20% off eTalVis Starter, Semester, and Annual plans until August 31, 2026, 11:59 PM.",
  robots: { index: true, follow: true },
};

export default function IndependenceOfferPage() {
  return <IndependenceOfferClient />;
}
