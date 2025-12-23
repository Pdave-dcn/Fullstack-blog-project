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
import { authenticateJwt } from "../middlewares/authenticateJwt.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { UserRole } from "@/domains/users/UserRole.js";

const router = express.Router();

router.use(generalApiLimiter);

router.use(authenticateJwt);

router.get("/articles/:id/comments", listArticleCommentsController);
router.get("/comments/:id/replies", listCommentRepliesController);

router.get(
  "/comments/author",
  requireRole(UserRole.AUTHOR),
  getCommentsForAuthorController
);

router.delete("/comments/:id", writeOperationsLimiter, deleteCommentController);
router.put("/comments/:id", writeOperationsLimiter, editCommentController);
router.post("/comments", writeOperationsLimiter, createCommentController);

export default router;
