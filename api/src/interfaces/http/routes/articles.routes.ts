import express from "express";
import {
  listPublicArticlesController,
  getRecentArticlesController,
  getArticleController,
  createArticleController,
  editArticleController,
  updateArticleStatusController,
  deleteArticleController,
  listArticlesForAuthorTableController,
} from "@/interfaces/http/controllers/articles/index.js";
import {
  generalApiLimiter,
  writeOperationsLimiter,
} from "@/infrastructure/http/rateLimit/coreRateLimits.js";
import { authenticateJwt } from "../middlewares/authenticateJwt.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { UserRole } from "@/domains/users/UserRole.js";

const router = express.Router();

router.use(generalApiLimiter);

router.get("/published", listPublicArticlesController);
router.get("/latest", getRecentArticlesController);
router.get("/:id", getArticleController);

router.use(authenticateJwt);

router.get(
  "/",
  requireRole(UserRole.AUTHOR, UserRole.GUEST),
  listArticlesForAuthorTableController
);

router.use(requireRole(UserRole.AUTHOR));

router.use(writeOperationsLimiter);

router.post("/", createArticleController);
router.put("/:id", editArticleController);
router.patch("/:id", updateArticleStatusController);
router.delete("/:id", deleteArticleController);

export default router;
