"use client";

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
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout");
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "initiate_checkout", { plan_name: label });
    }
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
