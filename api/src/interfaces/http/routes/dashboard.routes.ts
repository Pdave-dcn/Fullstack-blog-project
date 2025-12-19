import express from "express";
import {
  getDashboardStatsController,
  getRecentArticlesController,
  getRecentCommentsController,
} from "@/interfaces/http/controllers/dashboard/dashboard.controller.js";
import { generalApiLimiter } from "@/infrastructure/http/rateLimit/coreRateLimits.js";
import { authenticateJwt } from "../middlewares/authenticateJWT.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { UserRole } from "@/domains/users/UserRole.js";

const router = express.Router();

router.use(generalApiLimiter);
router.use(authenticateJwt);
router.use(requireRole(UserRole.AUTHOR));

router.get("/stats", getDashboardStatsController);

router.get("/recent-articles", getRecentArticlesController);

router.get("/recent-comments", getRecentCommentsController);

export default router;
