import express, { RequestHandler } from "express";
import passport from "passport";
import {
  editComment,
  AuthorGetComments,
} from "../controllers/comments.controller.js";
import { createCommentController } from "@/interfaces/http/controllers/comments/createComment.controller.js";
import { deleteCommentController } from "@/interfaces/http/controllers/comments/deleteComment.controller.js";

const router = express.Router();

router.get(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  AuthorGetComments as RequestHandler
);

router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

router.delete(
  "comments/:Id",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

router.put(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  editComment as RequestHandler
);
export default router;
