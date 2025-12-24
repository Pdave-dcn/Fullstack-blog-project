import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

export const getDashboardStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.log.info("Get dashboard stats request received");

    const stats = await container.dashboard.getStatsUseCase.execute();

    req.log.info(
      {
        stats,
      },
      "Dashboard stats retrieved successfully"
    );

    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const getRecentArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.log.info(
      {
        limit: 4,
      },
      "Get recent articles for dashboard request received"
    );

    const articles = await container.dashboard.getRecentArticlesUseCase.execute(
      6
    );

    req.log.info(
      {
        count: articles.length,
      },
      "Recent articles for dashboard retrieved successfully"
    );

    res.status(200).json({ data: articles });
  } catch (err) {
    next(err);
  }
};

export const getRecentCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.log.info(
      {
        limit: 2,
      },
      "Get recent comments for dashboard request received"
    );

    const comments = await container.dashboard.getRecentCommentsUseCase.execute(
      2
    );

    req.log.info(
      {
        count: comments.length,
      },
      "Recent comments for dashboard retrieved successfully"
    );

    res.status(200).json({ data: comments });
  } catch (err) {
    next(err);
  }
};
