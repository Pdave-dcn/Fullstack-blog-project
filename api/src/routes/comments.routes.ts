import express, { RequestHandler } from "express";
import passport from "passport";
import {
  AuthorDeleteComment,
  deleteComment,
  editComment,
  AuthorGetComments,
} from "../controllers/comments.controller.js";
import { createCommentController } from "@/interfaces/http/controllers/comments/createComment.controller.js";

const router = express.Router();

router.get(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  AuthorGetComments as RequestHandler
);

router.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  AuthorDeleteComment as RequestHandler
);

router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createCommentController
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
