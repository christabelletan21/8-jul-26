import type { Request, Response } from "express";
import { HttpError } from "../middleware/error.middleware";
import * as coursesService from "../services/courses.service";

export async function getCourses(req: Request, res: Response) {
  const { category, level, search } = req.query;
  const courses = await coursesService.listCourses({
    category: typeof category === "string" ? category : undefined,
    level: typeof level === "string" ? level : undefined,
    search: typeof search === "string" ? search : undefined,
  });
  res.json(courses);
}

export async function getCourseBySlug(req: Request, res: Response) {
  const course = await coursesService.getCourseBySlug(req.params.slug);
  if (!course) {
    throw new HttpError(404, `Course not found: ${req.params.slug}`);
  }
  res.json(course);
}

export async function getCategories(_req: Request, res: Response) {
  const categories = await coursesService.listCategories();
  res.json(categories);
}
