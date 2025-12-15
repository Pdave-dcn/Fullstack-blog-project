import express, { RequestHandler } from "express";
import {
  deletePost,
  getAllPosts,
  getPosts,
  getRecentArticles,
  getUniquePost,
  updatePostStatus,
} from "../controllers/posts.controller.js";
import passport from "passport";
import { editArticleController } from "@/interfaces/http/controllers/EditArticle.controller.js";
import { createArticleController } from "@/interfaces/http/controllers/CreateArticle.controller.js";

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getAllPosts as RequestHandler
);

router.get("/posts/published", getPosts as RequestHandler);

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
  deletePost as RequestHandler
);

export default router;
