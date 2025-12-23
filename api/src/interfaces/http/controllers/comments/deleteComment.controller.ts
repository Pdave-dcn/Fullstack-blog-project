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

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
        commentId: authReq.params.id,
      },
      "Delete comment request received"
    );

    const parsed = DeleteCommentSchema.parse({
      commentId: authReq.params.id,
      requesterId: authReq.user.id,
      requesterRole: authReq.user.role,
    });

    await container.comments.deleteUseCase.execute(parsed);

    req.log.info(
      {
        commentId: authReq.params.id,
        userId: authReq.user.id,
        role: authReq.user.role,
      },
      "Comment deleted successfully"
    );

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
