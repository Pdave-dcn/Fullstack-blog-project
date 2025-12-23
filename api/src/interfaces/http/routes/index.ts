import express from "express";
import authRoutes from "./auth.routes.js";
import articlesRoutes from "./articles.routes.js";
import commentsRoutes from "./comments.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP", message: "Server is healthy" });
});

router.use("/api/users", authRoutes);
router.use("/api", commentsRoutes);
router.use("/api/articles", articlesRoutes);
router.use("/api/dashboard", dashboardRoutes);

router.use(/.*/, (_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default router;
