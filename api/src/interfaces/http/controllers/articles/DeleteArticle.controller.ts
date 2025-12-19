import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { DeleteArticleSchema } from "../../validators/articles/deleteArticle.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const deleteArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthenticatedRequest;

  req.log.info(
    {
      userId: authReq.user.id,
      role: authReq.user.role,
    },
    "Delete article request received"
  );

  try {
    const parsed = DeleteArticleSchema.parse({
      articleId: authReq.params.id,
      authorId: authReq.user.id,
      authorRole: authReq.user.role,
    });

    await container.articles.deleteUseCase.execute(parsed);

    req.log.info(
      {
        articleId: authReq.params.id,
        authorId: authReq.user.id,
        authorRole: authReq.user.role,
      },
      "Article deleted successfully"
    );

    res.status(204).json({ message: "Article successfully deleted" });
  } catch (error) {
    next(error);
  }
};
