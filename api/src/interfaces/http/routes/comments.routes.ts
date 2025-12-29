// comments.routes.ts
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
} from "../../../infrastructure/http/rateLimit/coreRateLimits.js";
import { authenticateJwt } from "../middlewares/authenticateJwt.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { UserRole } from "../../../domains/users/UserRole.js";

const router = express.Router();

router.use(generalApiLimiter);

router.use(authenticateJwt);

router.get("/article/:id", listArticleCommentsController);
router.get("/:id/replies", listCommentRepliesController);

router.get(
  "/author",
  requireRole(UserRole.AUTHOR),
  getCommentsForAuthorController
);

router.delete("/:id", writeOperationsLimiter, deleteCommentController);
router.put("/:id", writeOperationsLimiter, editCommentController);
router.post("/", writeOperationsLimiter, createCommentController);

export default router;
