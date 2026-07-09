import { site } from "@/data/content";

export default function BrandStrip() {
  return (
    <div className="border-b border-line bg-surface py-3 text-center">
      <p className="text-sm text-muted font-body">{site.brandTagline}</p>
    </div>
  );
}
