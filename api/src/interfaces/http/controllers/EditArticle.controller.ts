import { NextFunction, Request, Response } from "express";
import { editArticleSchema } from "../validators/editArticle.schema";
import { EditArticleCommand } from "@/application/articles/EditArticleCommand";
import { EditArticleUseCase } from "@/application/articles/EditArticleUseCase";
import { PrismaArticleRepository } from "@/infrastructure/db/prisma/PrismaArticleRepository";
import { AuthenticatedRequest } from "../types/AuthRequest";

const articleRepository = new PrismaArticleRepository();
const editArticleUseCase = new EditArticleUseCase(articleRepository);

export const editArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    const parsed = editArticleSchema.parse({
      ...authReq.body,
      authorId: user?.id,
      authorRole: user?.role,
      articleId: authReq.params.id,
    });

    const command: EditArticleCommand = {
      articleId: parsed.articleId,
      authorId: parsed.authorId,
      authorRole: parsed.authorRole,
      title: parsed.title,
      content: parsed.content,
      status: parsed.status,
    };

    const updatedArticle = await editArticleUseCase.execute(command);

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};
