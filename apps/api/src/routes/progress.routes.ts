import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireAuth } from "../middleware/auth.middleware";
import * as progressController from "../controllers/progress.controller";

export const progressRouter = Router();

progressRouter.get("/me/progress", requireAuth, asyncHandler(progressController.getMyProgress));
progressRouter.get(
  "/me/progress/:slug",
  requireAuth,
  asyncHandler(progressController.getMyProgressForCourse)
);
progressRouter.post(
  "/me/progress/:slug",
  requireAuth,
  asyncHandler(progressController.upsertMyProgress)
);
