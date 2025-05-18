import express from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";
import commentsRoutes from "./comments.routes";
import dashboardRoutes from "./dashboard.routes";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", postsRoutes);
router.use("/api", commentsRoutes);
router.use("/api", dashboardRoutes);

export default router;
