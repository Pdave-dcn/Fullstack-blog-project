import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const listPublicArticlesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await container.articles.listUseCase.execute({});
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

export const listArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const articles = await container.articles.listUseCase.execute({
      requesterRole: authReq.user.role,
    });

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};
