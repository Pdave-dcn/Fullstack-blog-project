import express, { RequestHandler } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getRecentArticles,
  getUniquePost,
  updatePostStatus,
} from "../controllers/posts.controller";
import passport from "passport";

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getAllPosts as RequestHandler
);

router.get("/posts/recent", getRecentArticles as RequestHandler);

router.get("/posts/:postId", getUniquePost as RequestHandler);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createPost as RequestHandler
);

router.put(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  editPost as RequestHandler
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
