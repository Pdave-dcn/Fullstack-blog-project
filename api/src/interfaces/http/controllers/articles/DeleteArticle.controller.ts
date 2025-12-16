import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { DeleteArticleSchema } from "../../validators/articles/deleteArticle.schema.js";
import { container } from "@/infrastructure/di/container.js";

export const deleteArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = DeleteArticleSchema.parse({
      articleId: authReq.params.id,
      authorId: authReq.user.id,
      authorRole: authReq.user.role,
    });

    await container.deleteArticleUseCase.execute(parsed);

    res.status(204).json({ message: "Article successfully deleted" });
  } catch (error) {
    next(error);
  }
};
