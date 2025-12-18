import express from "express";
import passport from "passport";
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getCommentsForAuthorController,
  listArticleCommentsController,
  listCommentRepliesController,
} from "../../http/controllers/comments/index.js";

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.delete("comments/:id", deleteCommentController);

router.put("/comments/:id", editCommentController);

router.post("/comments", createCommentController);

router.get("/comments/author", getCommentsForAuthorController);
router.get("/articles/:id/comments", listArticleCommentsController);
router.get("/comments/:id/replies", listCommentRepliesController);

export default router;
