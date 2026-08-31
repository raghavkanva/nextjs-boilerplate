"use client";

import { usePathname } from "next/navigation";

import NavBar from "@/components/NavBar";
import ThinPromotionHeaderSlider from "@/components/ThinPromotionHeaderSlider";

const HIDDEN_HEADER_ROUTES = ["/resume-session", "/embedded-starter-pack"];

export default function SiteHeader() {
  const pathname = usePathname();

  const shouldHideHeader = HIDDEN_HEADER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldHideHeader) {
    return null;
  }

  const isHomepage = pathname === "/";

  return (
    <>
      {isHomepage && <ThinPromotionHeaderSlider />}
      <NavBar />
    </>
  );
}