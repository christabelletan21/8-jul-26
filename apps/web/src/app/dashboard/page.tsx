import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMyProgress } from "@/lib/api";
import { mintInternalToken } from "@/lib/internalToken";
import { ProgressList } from "@/components/dashboard/ProgressList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const enrollments = await getMyProgress(mintInternalToken(userId));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Your dashboard</h1>
      <p className="mt-1 text-slate-600">Track progress across the courses you&apos;ve started.</p>

      <div className="mt-8">
        <ProgressList enrollments={enrollments} />
      </div>
    </div>
  );
}
