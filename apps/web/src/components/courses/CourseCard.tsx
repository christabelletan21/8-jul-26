import Link from "next/link";
import type { Course } from "@/lib/api";

const LEVEL_LABELS: Record<Course["level"], string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block rounded-lg border border-slate-200 p-5 transition hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <span className="inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
        {course.category.name}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{course.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{course.summary}</p>
      <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wide text-slate-500">
        {LEVEL_LABELS[course.level]}
      </span>
    </Link>
  );
}
