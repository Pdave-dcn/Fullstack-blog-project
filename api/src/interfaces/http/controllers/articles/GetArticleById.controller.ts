import { Request, Response, NextFunction } from "express";
import { container } from "@/infrastructure/di/container";

export const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = req.params.id;
    const article = await container.getArticleByIdUseCase.execute(articleId);

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};
