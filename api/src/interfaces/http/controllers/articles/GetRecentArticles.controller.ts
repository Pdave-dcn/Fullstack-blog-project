import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

export const getRecentArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.log.info("Get recent articles request received");

    const recentArticles = await container.articles.getRecentUseCase.execute();

    req.log.info(
      {
        count: recentArticles.length,
      },
      "Recent articles retrieved successfully"
    );

    res.status(200).json({
      data: recentArticles,
    });
  } catch (err) {
    next(err);
  }
};
