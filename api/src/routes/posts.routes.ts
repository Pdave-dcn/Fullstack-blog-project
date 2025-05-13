import express, { RequestHandler } from "express";
import {
  createPost,
  getAllPosts,
  getUniquePost,
} from "../controllers/posts.controller";
import passport from "passport";

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getAllPosts as RequestHandler
);
router.get("/posts/:postId", getUniquePost as RequestHandler);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createPost as RequestHandler
);

export default router;
