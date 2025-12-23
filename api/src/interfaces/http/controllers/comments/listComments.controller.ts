import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import {
  ArticleCommentsQuerySchema,
  AuthorCommentsQuerySchema,
  CommentRepliesQuerySchema,
} from "../../validators/comments/commentQueries.schema.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const getCommentsForAuthorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthenticatedRequest;

    req.log.info(
      {
        userId: user.id,
        role: user.role,
      },
      "Get comments for author request received"
    );

    const parsed = AuthorCommentsQuerySchema.parse(req.query);

    const result = await container.comments.listForAuthorUseCase.execute(
      parsed
    );

    req.log.info(
      {
        userId: user.id,
        totalItems: result.total,
        page: parsed.page,
        pageSize: parsed.pageSize,
      },
      "Author comments retrieved successfully"
    );

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
    const { params, query } = req as AuthenticatedRequest;

    req.log.info(
      {
        articleId: params.articleId,
        limit: query.limit,
        cursor: query.cursor,
      },
      "List article comments request received"
    );

    const parsed = ArticleCommentsQuerySchema.parse({
      articleId: params.id,
      limit: query.limit,
      cursor: query.cursor,
    });

    const result = await container.comments.listArticleCommentsUseCase.execute(
      parsed
    );

    req.log.info(
      {
        articleId: params.articleId,
        count: result.items.length,
        hasMore: result.hasMore,
      },
      "Article comments retrieved successfully"
    );

    res.status(200).json({
      data: result.items,
      pagination: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const listCommentRepliesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, query } = req as AuthenticatedRequest;

    req.log.info(
      {
        parentCommentId: params.id,
        limit: query.limit,
        cursor: query.cursor,
      },
      "List comment replies request received"
    );

    const parsed = CommentRepliesQuerySchema.parse({
      parentCommentId: params.id,
      limit: query.limit,
      cursor: query.cursor,
    });

    const result = await container.comments.listRepliesUseCase.execute(parsed);

    req.log.info(
      {
        parentCommentId: params.id,
        count: result.items.length,
        hasMore: result.hasMore,
      },
      "Comment replies retrieved successfully"
    );

    res.status(200).json({
      data: result.items,
      pagination: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  } catch (err) {
    next(err);
  }
};
