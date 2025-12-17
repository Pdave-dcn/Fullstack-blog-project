import { CommentRepository } from "@/domains/comments/CommentRepository.js";
import {
  CommentNotFoundError,
  ForbiddenCommentEditError,
  ParentCommentArticleMismatchError,
} from "@/domains/comments/CommentErrors.js";
import { EditCommentCommand } from "./EditCommentCommand.js";

export class EditCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: EditCommentCommand) {
    const comment = await this.commentRepository.findById(command.commentId);

    if (!comment) {
      throw new CommentNotFoundError(command.commentId);
    }

    if (comment.articleId !== command.articleId) {
      throw new ParentCommentArticleMismatchError(
        command.commentId,
        command.articleId
      );
    }

    if (comment.authorId !== command.editorId) {
      throw new ForbiddenCommentEditError();
    }

    comment.editContent(command.content);

    await this.commentRepository.update(comment);

    return comment;
  }
}
