import express from "express";
import authRoutes from "../interfaces/http/routes/auth.routes.js";
import articlesRoutes from "../interfaces/http/routes/articles.routes.js";
import commentsRoutes from "../interfaces/http/routes/comments.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = express.Router();

router.use("/api/users", authRoutes);
router.use("/api/articles", articlesRoutes);
router.use("/api", commentsRoutes);
router.use("/api", dashboardRoutes);

export default router;
