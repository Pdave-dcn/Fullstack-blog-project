import express, { RequestHandler } from "express";
import {
  getRecentArticles,
  getUniquePost,
  updatePostStatus,
} from "../controllers/posts.controller.js";
import passport from "passport";
import { editArticleController } from "@/interfaces/http/controllers/articles/EditArticle.controller.js";
import { createArticleController } from "@/interfaces/http/controllers/articles/CreateArticle.controller.js";
import { deleteArticleController } from "@/interfaces/http/controllers/articles/DeleteArticle.controller.js";
import {
  listArticlesController,
  listPublicArticlesController,
} from "@/interfaces/http/controllers/articles/ListArticles.controller.js";

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  listArticlesController
);

router.get("/posts/published", listPublicArticlesController);

router.get("/posts/recent", getRecentArticles as RequestHandler);

router.get("/posts/:postId", getUniquePost as RequestHandler);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createArticleController
);

router.put(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  editArticleController
);

router.patch(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  updatePostStatus as RequestHandler
);

router.delete(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  deleteArticleController
);

export default router;
