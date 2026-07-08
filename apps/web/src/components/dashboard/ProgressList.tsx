import Link from "next/link";
import type { Enrollment } from "@/lib/api";

const STATUS_LABEL: Record<Enrollment["status"], string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const STATUS_STYLES: Record<Enrollment["status"], string> = {
  NOT_STARTED: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  COMPLETED: "bg-green-100 text-green-800",
};

export function ProgressList({ enrollments }: { enrollments: Enrollment[] }) {
  if (enrollments.length === 0) {
    return (
      <p className="text-slate-600">
        You haven&apos;t started any courses yet.{" "}
        <Link href="/courses" className="font-medium text-brand-700 underline">
          Browse the catalog
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {enrollments.map((enrollment) => (
        <li
          key={enrollment.id}
          className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
        >
          <div>
            <Link
              href={`/courses/${enrollment.course?.slug}`}
              className="font-medium text-slate-900 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            >
              {enrollment.course?.title}
            </Link>
            <p className="text-sm text-slate-500">{enrollment.course?.category.name}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[enrollment.status]}`}
          >
            {STATUS_LABEL[enrollment.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
