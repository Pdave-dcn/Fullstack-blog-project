// src/interfaces/http/routes/articles.routes.ts
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

const router = express.Router();

// Public endpoints
router.get("/published", listPublicArticlesController);
router.get("/recent", getRecentArticlesController);

// Authenticated endpoints
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", listArticlesController);
router.get("/:id", getArticleController);
router.post("/", createArticleController);
router.put("/:id", editArticleController);
router.patch("/:id", updateArticleStatusController);
router.delete("/:id", deleteArticleController);

export default router;
