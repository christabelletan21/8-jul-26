"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Enrollment } from "@/lib/api";

interface MarkProgressButtonProps {
  slug: string;
  initialStatus: Enrollment["status"];
  isAuthenticated: boolean;
}

const STATUS_LABEL: Record<Enrollment["status"], string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export function MarkProgressButton({
  slug,
  initialStatus,
  isAuthenticated,
}: MarkProgressButtonProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(nextStatus: Enrollment["status"]) {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/progress/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error("Failed to update progress");
      setStatus(nextStatus);
      router.refresh();
    } catch {
      setError("Couldn't save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <p className="text-sm text-slate-600">
        <a href="/login" className="font-medium text-brand-700 underline">
          Sign in
        </a>{" "}
        to track your progress on this course.
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-600">
        Status: <span className="font-medium text-slate-900">{STATUS_LABEL[status]}</span>
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          disabled={isSaving || status === "IN_PROGRESS"}
          onClick={() => updateStatus("IN_PROGRESS")}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
        >
          Mark as in progress
        </button>
        <button
          type="button"
          disabled={isSaving || status === "COMPLETED"}
          onClick={() => updateStatus("COMPLETED")}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
        >
          Mark as completed
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
