const EXPRESS_API_URL = process.env.EXPRESS_API_URL ?? "http://localhost:4000";

export interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  imageUrl: string | null;
  category: { id: string; name: string; slug: string };
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Enrollment {
  id?: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progressPercent: number;
  course?: Course;
}

// Fallback data used only when the Express/Postgres backend isn't reachable yet,
// so the site is browsable without the full local stack running.
const MOCK_CATEGORIES: CourseCategory[] = [
  { id: "cat-web", name: "Web Development", slug: "web-development" },
  { id: "cat-ai", name: "AI & Machine Learning", slug: "ai-ml" },
  { id: "cat-cloud", name: "Cloud Computing", slug: "cloud-computing" },
];

const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Modern Full-Stack Web Development",
    slug: "modern-fullstack-web-development",
    summary: "Build production-grade apps with React, Next.js, and Node.js.",
    description:
      "A hands-on course covering component architecture, server rendering, REST APIs, and deployment for modern full-stack web applications.",
    level: "BEGINNER",
    imageUrl: null,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: "course-2",
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    summary: "Level up your TypeScript with generics, type inference, and design patterns.",
    description:
      "Dive deep into advanced TypeScript features including conditional types, mapped types, and patterns for building type-safe large-scale applications.",
    level: "ADVANCED",
    imageUrl: null,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: "course-3",
    title: "Introduction to Machine Learning",
    slug: "introduction-to-machine-learning",
    summary: "Learn the fundamentals of ML models, training, and evaluation.",
    description:
      "Covers supervised and unsupervised learning, model evaluation, and practical exercises using popular Python ML libraries.",
    level: "BEGINNER",
    imageUrl: null,
    category: MOCK_CATEGORIES[1],
  },
  {
    id: "course-4",
    title: "Deploying Applications on the Cloud",
    slug: "deploying-applications-on-the-cloud",
    summary: "Ship and scale applications using containers and managed cloud services.",
    description:
      "Learn to containerize applications with Docker, orchestrate with Kubernetes basics, and deploy to major cloud providers.",
    level: "INTERMEDIATE",
    imageUrl: null,
    category: MOCK_CATEGORIES[2],
  },
];

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${EXPRESS_API_URL}${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(1500),
  });

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function getCourses(params?: { category?: string }): Promise<Course[]> {
  const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : "";
  try {
    return await fetchJson<Course[]>(`/api/courses${query}`);
  } catch {
    return params?.category
      ? MOCK_COURSES.filter((course) => course.category.slug === params.category)
      : MOCK_COURSES;
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    return await fetchJson<Course>(`/api/courses/${encodeURIComponent(slug)}`);
  } catch {
    return MOCK_COURSES.find((course) => course.slug === slug) ?? null;
  }
}

export async function getCategories(): Promise<CourseCategory[]> {
  try {
    return await fetchJson<CourseCategory[]>(`/api/categories`);
  } catch {
    return MOCK_CATEGORIES;
  }
}

export function getMyProgress(token: string): Promise<Enrollment[]> {
  return fetchJson<Enrollment[]>(`/api/me/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getMyProgressForCourse(token: string, slug: string): Promise<Enrollment> {
  return fetchJson<Enrollment>(`/api/me/progress/${encodeURIComponent(slug)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function upsertMyProgress(
  token: string,
  slug: string,
  body: { status: Enrollment["status"]; progressPercent?: number }
): Promise<Enrollment> {
  return fetchJson<Enrollment>(`/api/me/progress/${encodeURIComponent(slug)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
