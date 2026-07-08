import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import * as coursesController from "../controllers/courses.controller";

export const coursesRouter = Router();

coursesRouter.get("/courses", asyncHandler(coursesController.getCourses));
coursesRouter.get("/courses/:slug", asyncHandler(coursesController.getCourseBySlug));
coursesRouter.get("/categories", asyncHandler(coursesController.getCategories));
