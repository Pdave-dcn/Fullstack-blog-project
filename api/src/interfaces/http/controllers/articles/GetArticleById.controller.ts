import { container } from "@/infrastructure/di/containers/index.js";
import { Request, Response, NextFunction } from "express";

// ! Not in use
export const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = req.params.id;

    req.log.info(
      {
        articleId,
      },
      "Get article request received"
    );

    const article = await container.articles.getByIdUseCase.execute(articleId);

    req.log.info(
      {
        articleId,
      },
      "Article retrieved successfully"
    );

    res.status(200).json({
      data: article,
    });
  } catch (err) {
    next(err);
  }
};
