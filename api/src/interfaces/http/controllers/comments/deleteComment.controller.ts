import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { DeleteCommentSchema } from "../../validators/comments/deleteComment.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = DeleteCommentSchema.parse({
      articleId: authReq.body.articleId,
      commentId: authReq.params.id,
      requesterId: authReq.user.id,
      requesterRole: authReq.user.role,
    });

    await container.comments.deleteUseCase.execute(parsed);

    res.status(209).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
