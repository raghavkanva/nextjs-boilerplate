"use client";

import { useEffect } from "react";
import { track, metaEvent, getDeviceContext, type TrackParams } from "@/lib/analytics";
import {
  captureCampaignData,
  getCampaignEventParameters,
  getFirstTouchParameters,
  getLastTouchParameters,
  getCurrentUTMParameters,
  getIdentityParameters,
  getSessionLifecycleParameters,
  detectAiReferral,
  incrementPricingViewCount,
} from "@/lib/campaignTracking";

type PageType = "homepage" | "course" | "individual_course" | "session" | "pricing" | "other";

interface PageAnalyticsProps {
  page: string;
  contentName: string;
  contentCategory: "Landing Page" | "Course" | "Workshop" | "Offer";
  pageType?: PageType;
  courseName?: string;
  courseSlug?: string;
  courseType?: string;
  courseCategory?: string;
}

// Fires once when element enters viewport, then disconnects.
function observeSection(
  sectionId: string,
  eventName: string,
  params: TrackParams,
  threshold = 0.25,
): () => void {
  const el = document.getElementById(sectionId);
  if (!el) return () => {};

  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (fired || !entries[0].isIntersecting) return;
      fired = true;
      track(eventName, {
        ...params,
        ...getCampaignEventParameters(),
        ...getIdentityParameters(),
      });
      observer.disconnect();
    },
    { threshold },
  );

  observer.observe(el);
  return () => observer.disconnect();
}

export default function PageAnalytics({
  page,
  contentName,
  contentCategory,
  pageType = "other",
  courseName = "not_applicable",
  courseSlug = "not_applicable",
  courseType = "not_applicable",
  courseCategory = "not_applicable",
}: PageAnalyticsProps) {

  // ── Page Viewed ─────────────────────────────────────────────────────────
  useEffect(() => {
    captureCampaignData();

    const identity  = getIdentityParameters();
    const lifecycle = getSessionLifecycleParameters();
    const device    = getDeviceContext();
    const utms      = getCurrentUTMParameters();
    const ft        = getFirstTouchParameters();
    const lt        = getLastTouchParameters();
    const ai        = detectAiReferral(document.referrer);

    track("page_viewed", {
      page,
      page_type:      pageType,
      page_category:  contentCategory,
      content_name:   contentName,
      content_category: contentCategory,
      content_type:   pageType,

      course_name:     courseName,
      course_slug:     courseSlug,
      course_type:     courseType,
      course_category: courseCategory,

      ...identity,
      ...lifecycle,
      ...device,
      ...utms,
      ...ft,
      ...lt,
      ...ai,
    });

    // Course Viewed (fires on pages that have a specific course)
    if (courseSlug !== "not_applicable") {
      track("course_viewed", {
        course_name:     courseName,
        course_slug:     courseSlug,
        course_type:     courseType,
        course_category: courseCategory,
        content_name:    contentName,
        page_type:       pageType,
        ...identity,
        ...lifecycle,
        ...utms,
        ...ft,
        ...lt,
      });

      metaEvent("ViewContent", {
        content_name: contentName,
        content_category: contentCategory,
        content_type:     courseSlug,
      });
    }
  }, [page, contentName, contentCategory, pageType, courseName, courseSlug, courseType, courseCategory]);

  // ── Section view observers ──────────────────────────────────────────────
  useEffect(() => {
    const baseParams = {
      page,
      course_name:  courseName,
      course_slug:  courseSlug,
      course_type:  courseType,
      page_type:    pageType,
      content_name: contentName,
    };

    const cleanups: Array<() => void> = [];

    // Pricing / plans section
    const plansEl = document.getElementById("plans");
    if (plansEl) {
      let fired = false;
      let viewCount = 0;
      const obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          viewCount = incrementPricingViewCount();
          if (fired) return;
          fired = true;
          track("pricing_viewed", {
            ...baseParams,
            section_name:     "plans",
            component_name:   "PlansSection",
            pricing_view_count: viewCount,
            ...getCampaignEventParameters(),
            ...getIdentityParameters(),
          });
        },
        { threshold: 0.2 },
      );
      obs.observe(plansEl);
      cleanups.push(() => obs.disconnect());
    }

    // Syllabus / Course Carousel
    cleanups.push(observeSection("syllabus", "syllabus_viewed", {
      ...baseParams, section_name: "syllabus", component_name: "CourseCarousel",
    }));

    // Instructor strip (already has id="instructor")
    cleanups.push(observeSection("instructor", "instructor_section_viewed", {
      ...baseParams, section_name: "instructor", component_name: "InstructorStrip",
    }));

    // Testimonials
    cleanups.push(observeSection("testimonials", "testimonials_viewed", {
      ...baseParams, section_name: "testimonials", component_name: "TestimonialSlider",
    }));

    // FAQ
    cleanups.push(observeSection("faq", "faq_viewed", {
      ...baseParams, section_name: "faq", component_name: "FAQ",
    }));

    return () => cleanups.forEach((fn) => fn());
  }, [page, courseName, courseSlug, courseType, pageType, contentName]);

  return null;
}
