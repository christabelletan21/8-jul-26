import { prisma, EnrollmentStatus } from "@sde/db";
import { HttpError } from "../middleware/error.middleware";

export function listMyProgress(userId: string) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getMyProgressForCourse(userId: string, slug: string) {
  return prisma.enrollment.findFirst({
    where: { userId, course: { slug } },
  });
}

interface UpsertProgressInput {
  status: EnrollmentStatus;
  progressPercent?: number;
}

export async function upsertProgress(
  userId: string,
  slug: string,
  input: UpsertProgressInput
) {
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) {
    throw new HttpError(404, `Course not found: ${slug}`);
  }

  const now = new Date();
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });

  return prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    create: {
      userId,
      courseId: course.id,
      status: input.status,
      progressPercent: input.progressPercent ?? (input.status === "COMPLETED" ? 100 : 0),
      startedAt: input.status !== "NOT_STARTED" ? now : null,
      completedAt: input.status === "COMPLETED" ? now : null,
    },
    update: {
      status: input.status,
      progressPercent: input.progressPercent ?? (input.status === "COMPLETED" ? 100 : undefined),
      startedAt: existing?.startedAt ?? (input.status !== "NOT_STARTED" ? now : null),
      completedAt: input.status === "COMPLETED" ? now : null,
    },
  });
}
