import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest";
import { UpdateArticleStatusSchema } from "../../validators/editArticle.schema";
import { container } from "@/infrastructure/di/container";

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

    await container.updateArticleStatusUseCase.execute(parsed);
  } catch (error) {
    next(error);
  }
};
