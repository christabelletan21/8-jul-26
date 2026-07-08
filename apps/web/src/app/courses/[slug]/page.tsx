import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCourseBySlug, getMyProgressForCourse } from "@/lib/api";
import { mintInternalToken } from "@/lib/internalToken";
import { MarkProgressButton } from "@/components/course-detail/MarkProgressButton";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const progress = userId
    ? await getMyProgressForCourse(mintInternalToken(userId), course.slug)
    : { status: "NOT_STARTED" as const, progressPercent: 0 };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
        {course.category.name}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{course.title}</h1>
      <p className="mt-2 text-lg text-slate-600">{course.summary}</p>
      <p className="mt-6 text-slate-700">{course.description}</p>

      <div className="mt-8 rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Your progress</h2>
        <div className="mt-3">
          <MarkProgressButton
            slug={course.slug}
            initialStatus={progress.status}
            isAuthenticated={Boolean(userId)}
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-dashed border-slate-300 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Video lectures</h2>
          <p className="mt-1 text-sm text-slate-500">Coming soon.</p>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Reading materials</h2>
          <p className="mt-1 text-sm text-slate-500">Coming soon.</p>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Coding exercises</h2>
          <p className="mt-1 text-sm text-slate-500">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}
