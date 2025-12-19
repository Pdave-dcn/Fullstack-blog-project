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

    const parsed = CreateCommentSchema.parse({
      authorId: authReq.user.id,
      articleId: authReq.body.articleId,
      content: authReq.body.content,
      parentId: authReq.body.parentId,
    });

    await container.comments.createUseCase.execute(parsed);

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    next(error);
  }
};
