import express from "express";
import passport from "passport";
import {
  getDashboardStatsController,
  getRecentArticlesController,
  getRecentCommentsController,
} from "@/interfaces/http/controllers/dashboard/dashboard.controller.js";
import { generalApiLimiter } from "@/infrastructure/http/rateLimit/coreRateLimits.js";

const router = express.Router();

router.use(generalApiLimiter);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/stats", getDashboardStatsController);

router.get("/recent-articles", getRecentArticlesController);

router.get("/recent-comments", getRecentCommentsController);

export default router;
