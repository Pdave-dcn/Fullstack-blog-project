import { NextFunction, Request, Response } from "express";
import { EditArticleSchema } from "../../validators/articles/editArticle.schema.js";
import { EditArticleCommand } from "@/application/articles/edit/EditArticleCommand.js";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const editArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, params, body } = req as AuthenticatedRequest;

    req.log.info(
      {
        userId: user.id,
        role: user.role,
      },
      "Edit article request received"
    );

    const parsed = EditArticleSchema.parse({
      ...body,
      authorId: user.id,
      authorRole: user.role,
      articleId: params.id,
    });

    const command: EditArticleCommand = {
      articleId: parsed.articleId,
      authorId: parsed.authorId,
      authorRole: parsed.authorRole,
      title: parsed.title,
      content: parsed.content,
      status: parsed.status,
    };

    const updatedArticle = await container.articles.editUseCase.execute(
      command
    );

    req.log.info(
      {
        articleId: params.id,
        authorId: user.id,
        authorRole: user.role,
      },
      "Article edited successfully"
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};
