import { DeleteArticleUseCase } from "@/application/articles/DeleteArticleUseCase.js";
import { PrismaArticleRepository } from "@/infrastructure/db/prisma/PrismaArticleRepository.js";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthRequest.js";
import { DeleteArticleSchema } from "../validators/deleteArticle.schema.js";

const articleRepository = new PrismaArticleRepository();
const deleteArticleUseCase = new DeleteArticleUseCase(articleRepository);

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

    await deleteArticleUseCase.execute(parsed);

    res.status(204).json({ message: "Article successfully deleted" });
  } catch (error) {
    next(error);
  }
};
