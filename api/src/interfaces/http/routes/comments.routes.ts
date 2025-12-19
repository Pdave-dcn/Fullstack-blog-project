import express from "express";
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getCommentsForAuthorController,
  listArticleCommentsController,
  listCommentRepliesController,
} from "../../http/controllers/comments/index.js";
import {
  generalApiLimiter,
  writeOperationsLimiter,
} from "@/infrastructure/http/rateLimit/coreRateLimits.js";
import { authenticateJwt } from "../middlewares/authenticateJWT.middleware.js";

const router = express.Router();

router.use(generalApiLimiter);

router.use(authenticateJwt);

router.delete("comments/:id", writeOperationsLimiter, deleteCommentController);
router.put("/comments/:id", writeOperationsLimiter, editCommentController);
router.post("/comments", writeOperationsLimiter, createCommentController);

router.get("/comments/author", getCommentsForAuthorController);
router.get("/articles/:id/comments", listArticleCommentsController);
router.get("/comments/:id/replies", listCommentRepliesController);

export default router;
