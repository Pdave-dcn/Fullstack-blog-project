import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/container.js";

export const getDashboardStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthenticatedRequest;

    if (user.role !== "AUTHOR") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const stats = await container.getDashboardStatsUseCase.execute();
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
    const { user } = req as AuthenticatedRequest;

    if (user.role !== "AUTHOR") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const articles = await container.getRecentArticlesUseCase.execute(4);

    res.status(200).json(articles);
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
    const { user } = req as AuthenticatedRequest;

    if (user.role !== "AUTHOR") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const comments = await container.getRecentCommentsUseCase.execute(2);

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
