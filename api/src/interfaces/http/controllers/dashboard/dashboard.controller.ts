import { Request, Response, NextFunction } from "express";
import { container } from "@/infrastructure/di/container.js";

export const getDashboardStatsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await container.getDashboardStatsUseCase.execute();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const getRecentArticlesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await container.getRecentArticlesUseCase.execute(4);

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

export const getRecentCommentsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await container.getRecentCommentsUseCase.execute(2);

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
