import Link from "next/link";
import { getCourses, getCategories } from "@/lib/api";
import { CourseCard } from "@/components/courses/CourseCard";

interface CoursesPageProps {
  searchParams: { category?: string };
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const [courses, categories] = await Promise.all([
    getCourses({ category: searchParams.category }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">All courses</h1>

      <nav aria-label="Filter courses by category" className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/courses"
          className={`rounded-full border px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            !searchParams.category
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/courses?category=${category.slug}`}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              searchParams.category === category.slug
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {courses.length === 0 ? (
        <p className="mt-8 text-slate-600">No courses found.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
