import { Request, Response, NextFunction } from "express";
import { container } from "@/infrastructure/di/container.js";

export const getRecentArticlesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recentArticles = await container.getRecentArticlesUseCase.execute();
    res.status(200).json(recentArticles);
  } catch (err) {
    next(err);
  }
};
