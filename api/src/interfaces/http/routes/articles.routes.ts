import express from "express";
import {
  listArticlesController,
  listPublicArticlesController,
  getRecentArticlesController,
  getArticleController,
  createArticleController,
  editArticleController,
  updateArticleStatusController,
  deleteArticleController,
} from "@/interfaces/http/controllers/articles/index.js";
import {
  generalApiLimiter,
  writeOperationsLimiter,
} from "@/infrastructure/http/rateLimit/coreRateLimits.js";
import { authenticateJwt } from "../middlewares/authenticateJWT.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { UserRole } from "@/domains/users/UserRole.js";

const router = express.Router();

router.use(generalApiLimiter);

router.get("/published", listPublicArticlesController);
router.get("/recent", getRecentArticlesController);
router.get("/:id", getArticleController);

router.use(authenticateJwt);

router.get("/", listArticlesController);

router.use(writeOperationsLimiter);
router.use(requireRole(UserRole.AUTHOR));

router.post("/", createArticleController);
router.put("/:id", editArticleController);
router.patch("/:id", updateArticleStatusController);
router.delete("/:id", deleteArticleController);

export default router;
