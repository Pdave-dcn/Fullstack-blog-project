import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

export const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = req.params.id;
    const article = await container.articles.getByIdUseCase.execute(articleId);

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};
