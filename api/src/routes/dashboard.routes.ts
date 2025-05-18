import express, { RequestHandler } from "express";
import passport from "passport";
import { getDashboardStats } from "../controllers/dashboard.controller";

const router = express.Router();

router.get(
  "/dashboard/stats",
  passport.authenticate("jwt", { session: false }),
  getDashboardStats as RequestHandler
);

export default router;
