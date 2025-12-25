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

    res.status(200).json({
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};

export const listArticlesForAuthorTableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const { status, search } = req.query;

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
        filters: { status, search },
      },
      "List articles request received"
    );

    const articles = await container.articles.getForAuthorTableUseCase.execute({
      status: status as string | undefined,
      search: search as string | undefined,
    });

    req.log.info(
      {
        userId: authReq.user.id,
        role: authReq.user.role,
        count: articles.length,
        filters: { status, search },
      },
      "Articles retrieved successfully"
    );

    res.status(200).json({
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};
