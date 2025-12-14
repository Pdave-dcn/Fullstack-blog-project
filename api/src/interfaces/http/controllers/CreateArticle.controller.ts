import { NextFunction, Request, Response } from "express";
import { CreateArticleUseCase } from "@/application/articles/CreateArticleUseCase.js";
import { PrismaArticleRepository } from "@/infrastructure/db/prisma/PrismaArticleRepository.js";
import { createArticleSchema } from "../validators/createArticle.schema.js";

const articleRepository = new PrismaArticleRepository();
const createArticleUseCase = new CreateArticleUseCase(articleRepository);

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any;

    const body = createArticleSchema.parse(req.body);

    const article = await createArticleUseCase.execute({
      authorId: user.id,
      authorRole: user.role,
      title: body.title,
      content: body.content,
      status: body.status,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};
