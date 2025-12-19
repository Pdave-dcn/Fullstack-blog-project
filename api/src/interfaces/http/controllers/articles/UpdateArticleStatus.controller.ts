import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { UpdateArticleStatusSchema } from "../../validators/articles/editArticle.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const updateArticleStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = UpdateArticleStatusSchema.parse({
      authorId: authReq.user.id,
      articleId: authReq.params.id,
      authorRole: authReq.user.role,
      status: authReq.body.status,
    });

    await container.articles.updateStatusUseCase.execute(parsed);
  } catch (error) {
    next(error);
  }
};
