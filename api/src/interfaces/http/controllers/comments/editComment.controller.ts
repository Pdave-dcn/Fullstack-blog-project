import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { EditCommentSchema } from "../../validators/comments/editComment.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const editCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    req.log.info(
      {
        userId: authReq.user.id,
        commentId: req.params.commentId,
        articleId: req.body.postId,
      },
      "Edit comment request received"
    );

    const parsed = EditCommentSchema.parse({
      editorId: authReq.user.id,
      commentId: req.params.id,
      articleId: req.body.articleId,
      content: req.body.content,
    });

    await container.comments.editUseCase.execute(parsed);

    req.log.info(
      {
        commentId: req.params.id,
        userId: authReq.user.id,
      },
      "Comment edited successfully"
    );

    res.status(200).json({
      message: "Comment edited successfully",
    });
  } catch (err) {
    next(err);
  }
};
