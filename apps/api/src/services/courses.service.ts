import { prisma, CourseLevel } from "@sde/db";

interface ListCoursesParams {
  category?: string;
  level?: string;
  search?: string;
}

function parseLevel(level?: string): CourseLevel | undefined {
  if (!level) return undefined;
  return (Object.values(CourseLevel) as string[]).includes(level)
    ? (level as CourseLevel)
    : undefined;
}

export function listCourses(params: ListCoursesParams) {
  return prisma.course.findMany({
    where: {
      published: true,
      category: params.category ? { slug: params.category } : undefined,
      level: parseLevel(params.level),
      title: params.search ? { contains: params.search, mode: "insensitive" } : undefined,
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export function listCategories() {
  return prisma.courseCategory.findMany({ orderBy: { name: "asc" } });
}
