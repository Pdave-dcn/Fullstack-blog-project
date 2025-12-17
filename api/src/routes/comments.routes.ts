import express, { RequestHandler } from "express";
import passport from "passport";
import { AuthorGetComments } from "../controllers/comments.controller.js";
import { createCommentController } from "@/interfaces/http/controllers/comments/createComment.controller.js";
import { deleteCommentController } from "@/interfaces/http/controllers/comments/deleteComment.controller.js";
import { editCommentController } from "@/interfaces/http/controllers/comments/editComment.controller.js";

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
  "comments/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

router.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  editCommentController
);
export default router;
