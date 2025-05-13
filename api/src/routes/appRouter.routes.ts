import express from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", postsRoutes);

export default router;
