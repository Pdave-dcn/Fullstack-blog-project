import { container } from "@/infrastructure/di/container";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest";

export const listPublicArticlesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await container.listArticlesUseCase.execute({});
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

    const articles = await container.listArticlesUseCase.execute({
      requesterRole: authReq.user.role,
    });

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};
