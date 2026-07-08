import { getCourses } from "@/lib/api";
import { CourseCard } from "@/components/courses/CourseCard";

export async function FeaturedCourses() {
  const courses = await getCourses();
  const featured = courses.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="featured-courses-heading">
      <h2 id="featured-courses-heading" className="text-2xl font-bold text-slate-900">
        Featured courses
      </h2>
      {featured.length === 0 ? (
        <p className="mt-4 text-slate-600">
          No courses available yet — run the seed script to populate the catalog.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
