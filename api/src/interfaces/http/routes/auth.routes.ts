import express from "express";
import {
  loginGuestController,
  loginUserController,
  signupUserController,
} from "@/interfaces/http/controllers/auth/auth.controller.js";
import {
  authLimiter,
  registerLimiter,
} from "@/infrastructure/http/rateLimit/coreRateLimits.js";

const router = express.Router();

router.post("/signup", registerLimiter, signupUserController);

router.post("/login", authLimiter, loginUserController);

router.post("/guest", authLimiter, loginGuestController);

export default router;
