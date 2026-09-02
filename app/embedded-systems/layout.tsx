import { buildCourseSchema, buildFaqSchema } from "@/lib/schema";

// Course and FAQ schemas for the full 10-course Embedded Systems Foundation Courses page.
// Organization and Person schemas are provided by the root layout globally.
export default function EmbeddedSystemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [buildCourseSchema(), buildFaqSchema()];
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
