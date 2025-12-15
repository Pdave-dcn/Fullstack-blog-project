import { NextFunction, Request, Response } from "express";
import { createArticleSchema } from "../../validators/createArticle.schema.js";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/container.js";

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    const body = createArticleSchema.parse(authReq.body);

    const article = await container.createArticleUseCase.execute({
      authorId: user.id,
      authorRole: user.role,
      title: body.title,
      content: body.content,
      status: body.status,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};
