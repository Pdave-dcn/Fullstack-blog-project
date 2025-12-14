import { NextFunction, Request, Response } from "express";
import { CreateArticleUseCase } from "../../../application/articles/CreateArticleUseCase";
import { PrismaArticleRepository } from "../../../infrastructure/db/prisma/PrismaArticleRepository";
import { ArticleStatus } from "../../../domains/articles/ArticleStatus";

const articleRepository = new PrismaArticleRepository();
const createArticleUseCase = new CreateArticleUseCase(articleRepository);

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any;

    const status = req.body.status;

    if (!Object.values(ArticleStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid article status" });
    }

    const article = await createArticleUseCase.execute({
      authorId: user.id,
      authorRole: user.role,
      title: req.body.title,
      content: req.body.content,
      status: status as ArticleStatus,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};
