import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const listPublicArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.log.info("List public articles request received");

    const articles = await container.articles.listUseCase.execute({});

    req.log.info(
      {
        count: articles.length,
      },
      "Public articles retrieved successfully"
    );

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

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
      },
      "List articles request received"
    );

    const articles = await container.articles.listUseCase.execute({
      requesterRole: authReq.user.role,
    });

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
        count: articles.length,
      },
      "Articles retrieved successfully"
    );

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};
