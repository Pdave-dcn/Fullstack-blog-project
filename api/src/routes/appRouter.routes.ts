import express from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";
import commentsRoutes from "./comments.routes";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", postsRoutes);
router.use("/api", commentsRoutes);

export default router;
