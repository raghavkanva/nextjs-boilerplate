"use client";

import { track, metaEvent } from "@/lib/analytics";

export default function EnrollButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  const handleClick = () => {
    track("enroll_click", { label, page: "offer" });
    metaEvent("InitiateCheckout", { content_name: label, currency: "INR" });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  );
}
