import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

export const getRecentArticlesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recentArticles = await container.articles.getRecentUseCase.execute();
    res.status(200).json(recentArticles);
  } catch (err) {
    next(err);
  }
};
