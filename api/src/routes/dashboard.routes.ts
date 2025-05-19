import express, { RequestHandler } from "express";
import passport from "passport";
import {
  getDashboardStats,
  getRecentArticles,
  getRecentComments,
} from "../controllers/dashboard.controller";

const router = express.Router();

router.get(
  "/dashboard/stats",
  passport.authenticate("jwt", { session: false }),
  getDashboardStats as RequestHandler
);

router.get(
  "/dashboard/recent-articles",
  passport.authenticate("jwt", { session: false }),
  getRecentArticles as RequestHandler
);

router.get(
  "/dashboard/recent-comments",
  passport.authenticate("jwt", { session: false }),
  getRecentComments as RequestHandler
);

export default router;
