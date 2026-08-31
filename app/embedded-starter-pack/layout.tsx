import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embedded Systems Starter Pack Course | Electronics + C Programming | eTalVis",
  description:
    "Start your Embedded Systems learning with the Electronics Foundation Course and C Programming Foundation Course. The eTalVis Embedded Starter Pack includes 2 courses with 2 months access for ₹239.",
};

export default function EmbeddedStarterPackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
