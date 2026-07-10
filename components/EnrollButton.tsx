"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

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
