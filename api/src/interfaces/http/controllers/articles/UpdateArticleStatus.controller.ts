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

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
        articleId: authReq.params.id,
      },
      "Update article status request received"
    );

    const parsed = UpdateArticleStatusSchema.parse({
      authorId: authReq.user.id,
      articleId: authReq.params.id,
      authorRole: authReq.user.role,
      status: authReq.body.status,
    });

    await container.articles.updateStatusUseCase.execute(parsed);

    req.log.info(
      {
        articleId: authReq.params.id,
        authorId: authReq.user.id,
        authorRole: authReq.user.role,
        status: parsed.status,
      },
      "Article status updated successfully"
    );

    res.status(200).json({ message: "Article status updated successfully" });
  } catch (error) {
    next(error);
  }
};
