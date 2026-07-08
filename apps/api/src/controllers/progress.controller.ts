import type { Response } from "express";
import { EnrollmentStatus } from "@sde/db";
import { HttpError } from "../middleware/error.middleware";
import type { AuthedRequest } from "../middleware/auth.middleware";
import * as progressService from "../services/progress.service";

const VALID_STATUSES = Object.values(EnrollmentStatus) as string[];

export async function getMyProgress(req: AuthedRequest, res: Response) {
  const progress = await progressService.listMyProgress(req.userId!);
  res.json(progress);
}

export async function getMyProgressForCourse(req: AuthedRequest, res: Response) {
  const progress = await progressService.getMyProgressForCourse(req.userId!, req.params.slug);
  res.json(progress ?? { status: "NOT_STARTED", progressPercent: 0 });
}

export async function upsertMyProgress(req: AuthedRequest, res: Response) {
  const { status, progressPercent } = req.body ?? {};

  if (typeof status !== "string" || !VALID_STATUSES.includes(status)) {
    throw new HttpError(400, `status must be one of ${VALID_STATUSES.join(", ")}`);
  }

  if (progressPercent !== undefined) {
    if (typeof progressPercent !== "number" || progressPercent < 0 || progressPercent > 100) {
      throw new HttpError(400, "progressPercent must be a number between 0 and 100");
    }
  }

  const enrollment = await progressService.upsertProgress(req.userId!, req.params.slug, {
    status: status as EnrollmentStatus,
    progressPercent,
  });

  res.json(enrollment);
}
