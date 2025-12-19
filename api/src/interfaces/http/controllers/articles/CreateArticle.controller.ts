import { NextFunction, Request, Response } from "express";
import { createArticleSchema } from "../../validators/articles/createArticle.schema.js";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, body } = req as AuthenticatedRequest;

  req.log.info(
    {
      userId: user.id,
      role: user.role,
    },
    "Create article request received"
  );

  try {
    const parsed = createArticleSchema.parse(body);

    const article = await container.articles.createUseCase.execute({
      authorId: user.id,
      authorRole: user.role,
      title: parsed.title,
      content: parsed.content,
      status: parsed.status,
    });

    req.log.info(
      {
        articleId: article.id,
        authorId: user.id,
        status: article.status,
      },
      "Article created successfully"
    );

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};
