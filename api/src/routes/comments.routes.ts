import express, { RequestHandler } from "express";
import passport from "passport";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/comments.controller";

const router = express.Router();

router.post(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  createComment as RequestHandler
);

router.delete(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  deleteComment as RequestHandler
);

router.put(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  editComment as RequestHandler
);
export default router;
