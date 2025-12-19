import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { CreateCommentSchema } from "../../validators/comments/createComment.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    req.log.info(
      {
        userId: authReq.user.id,
        articleId: authReq.body.articleId,
        parentId: authReq.body.parentId,
      },
      "Create comment request received"
    );

    const parsed = CreateCommentSchema.parse({
      authorId: authReq.user.id,
      articleId: authReq.body.articleId,
      content: authReq.body.content,
      parentId: authReq.body.parentId,
    });

    const comment = await container.comments.createUseCase.execute(parsed);

    req.log.info(
      {
        commentId: comment.id,
        userId: authReq.user.id,
        articleId: authReq.body.articleId,
        isReply: !!authReq.body.parentId,
      },
      "Comment created successfully"
    );

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    next(error);
  }
};
