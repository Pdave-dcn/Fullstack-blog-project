import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

export const getDashboardStatsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await container.dashboard.getStatsUseCase.execute();
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
    const articles = await container.dashboard.getRecentArticlesUseCase.execute(
      4
    );

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
    const comments = await container.dashboard.getRecentCommentsUseCase.execute(
      2
    );

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
