import express from "express";
import cors from "cors";
import { coursesRouter } from "./routes/courses.routes";
import { progressRouter } from "./routes/progress.routes";
import { errorMiddleware } from "./middleware/error.middleware";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", coursesRouter);
  app.use("/api", progressRouter);

  app.use(errorMiddleware);

  return app;
}
