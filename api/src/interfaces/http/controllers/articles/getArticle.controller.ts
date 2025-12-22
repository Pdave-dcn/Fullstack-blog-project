import { container } from "@/infrastructure/di/containers";
import { NextFunction, Request, Response } from "express";

export const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = req.params.id;

    req.log.info({ articleId }, "Get article details request");

    const article = await container.articles.getDetailsUseCase.execute(
      articleId
    );

    req.log.info(
      {
        articleId,
      },
      "Article retrieved successfully"
    );

    res.status(200).json({ data: article });
  } catch (err) {
    next(err);
  }
};
