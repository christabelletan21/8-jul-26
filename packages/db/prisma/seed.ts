import { prisma } from "../src/index";

async function main() {
  const categories = [
    { name: "Web Development", slug: "web-development" },
    { name: "AI & Machine Learning", slug: "ai-ml" },
    { name: "Cloud Computing", slug: "cloud-computing" },
  ];

  const createdCategories = new Map<string, string>();
  for (const category of categories) {
    const record = await prisma.courseCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.set(category.slug, record.id);
  }

  const courses = [
    {
      title: "Modern Full-Stack Web Development",
      slug: "modern-fullstack-web-development",
      summary: "Build production-grade apps with React, Next.js, and Node.js.",
      description:
        "A hands-on course covering component architecture, server rendering, REST APIs, and deployment for modern full-stack web applications.",
      level: "BEGINNER" as const,
      categorySlug: "web-development",
    },
    {
      title: "Advanced TypeScript Patterns",
      slug: "advanced-typescript-patterns",
      summary: "Level up your TypeScript with generics, type inference, and design patterns.",
      description:
        "Dive deep into advanced TypeScript features including conditional types, mapped types, and patterns for building type-safe large-scale applications.",
      level: "ADVANCED" as const,
      categorySlug: "web-development",
    },
    {
      title: "Introduction to Machine Learning",
      slug: "introduction-to-machine-learning",
      summary: "Learn the fundamentals of ML models, training, and evaluation.",
      description:
        "Covers supervised and unsupervised learning, model evaluation, and practical exercises using popular Python ML libraries.",
      level: "BEGINNER" as const,
      categorySlug: "ai-ml",
    },
    {
      title: "Deploying Applications on the Cloud",
      slug: "deploying-applications-on-the-cloud",
      summary: "Ship and scale applications using containers and managed cloud services.",
      description:
        "Learn to containerize applications with Docker, orchestrate with Kubernetes basics, and deploy to major cloud providers.",
      level: "INTERMEDIATE" as const,
      categorySlug: "cloud-computing",
    },
  ];

  for (const course of courses) {
    const { categorySlug, ...data } = course;
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        ...data,
        categoryId: createdCategories.get(categorySlug)!,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${courses.length} courses.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
