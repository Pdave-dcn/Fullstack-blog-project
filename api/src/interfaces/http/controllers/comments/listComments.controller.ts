import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/container.js";
import {
  ArticleCommentsQuerySchema,
  AuthorCommentsQuerySchema,
  CommentRepliesQuerySchema,
} from "../../validators/comments/commentQueries.schema.js";

export const getCommentsForAuthorController = async (
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

    const parsed = AuthorCommentsQuerySchema.parse(req.query);

    const result = await container.listCommentsForAuthorUseCase.execute(parsed);

    res.status(200).json({
      data: result.items,
      pagination: {
        totalItems: result.total,
        currentPage: parsed.page,
        pageSize: parsed.pageSize,
        totalPages: Math.ceil(result.total / parsed.pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const listArticleCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = ArticleCommentsQuerySchema.parse({
      articleId: authReq.params.articleId,
      limit: authReq.query.limit,
      cursor: authReq.query.cursor,
    });

    const result = await container.listArticleCommentsUseCase.execute(parsed);

    res.status(200).json({
      data: result.items,
      pagination: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
        limit: parsed.limit,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const listCommentRepliesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const parsed = CommentRepliesQuerySchema.parse({
      parentCommentId: authReq.params.id,
      limit: authReq.query.limit,
      cursor: authReq.query.cursor,
    });

    const result = await container.listCommentRepliesUseCase.execute(parsed);

    res.status(200).json({
      data: result.items,
      pagination: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
        limit: parsed.limit,
      },
    });
  } catch (err) {
    next(err);
  }
};
