import { NextFunction, Request, Response } from "express";
import { editArticleSchema } from "../../validators/editArticle.schema.js";
import { EditArticleCommand } from "@/application/articles/edit/EditArticleCommand.js";
import { AuthenticatedRequest } from "../../types/AuthRequest.js";
import { container } from "@/infrastructure/di/container.js";

export const editArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    const parsed = editArticleSchema.parse({
      ...authReq.body,
      authorId: user?.id,
      authorRole: user?.role,
      articleId: authReq.params.id,
    });

    const command: EditArticleCommand = {
      articleId: parsed.articleId,
      authorId: parsed.authorId,
      authorRole: parsed.authorRole,
      title: parsed.title,
      content: parsed.content,
      status: parsed.status,
    };

    const updatedArticle = await container.editArticleUseCase.execute(command);

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};
