import express from "express";
import passport from "passport";
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

const router = express.Router();

router.use(generalApiLimiter);

router.get("/published", listPublicArticlesController);
router.get("/recent", getRecentArticlesController);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", listArticlesController);
router.get("/:id", getArticleController);

router.use(writeOperationsLimiter);
router.post("/", createArticleController);
router.put("/:id", editArticleController);
router.patch("/:id", updateArticleStatusController);
router.delete("/:id", deleteArticleController);

export default router;
