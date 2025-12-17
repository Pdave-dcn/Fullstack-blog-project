import { NextFunction, Request, Response } from "express";
import { container } from "@/infrastructure/di/container.js";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { EditCommentSchema } from "../../validators/comments/editComment.schema.js";

export const editCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = EditCommentSchema.parse({
      editorId: authReq.user.id,
      commentId: req.params.commentId,
      articleId: req.body.postId,
      content: req.body.content,
    });

    await container.editCommentUseCase.execute(parsed);

    res.status(200).json({
      message: "Comment edited successfully",
    });
  } catch (err) {
    next(err);
  }
};
