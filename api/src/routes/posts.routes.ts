import express, { RequestHandler } from "express";
import { getRecentArticles } from "../controllers/posts.controller.js";
import passport from "passport";
import { editArticleController } from "@/interfaces/http/controllers/articles/EditArticle.controller.js";
import { createArticleController } from "@/interfaces/http/controllers/articles/CreateArticle.controller.js";
import { deleteArticleController } from "@/interfaces/http/controllers/articles/DeleteArticle.controller.js";
import {
  listArticlesController,
  listPublicArticlesController,
} from "@/interfaces/http/controllers/articles/ListArticles.controller.js";
import { updateArticleStatusController } from "@/interfaces/http/controllers/articles/UpdateArticleStatus.controller.js";
import { getArticleController } from "@/interfaces/http/controllers/articles/GetArticleById.controller.js";

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  listArticlesController
);

router.get("/posts/published", listPublicArticlesController);

router.get("/posts/recent", getRecentArticles as RequestHandler);

router.get("/posts/:id", getArticleController);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createArticleController
);

router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  editArticleController
);

router.patch(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  updateArticleStatusController
);

router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  deleteArticleController
);

export default router;
