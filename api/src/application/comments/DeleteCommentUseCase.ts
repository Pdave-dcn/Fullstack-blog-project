import { CommentRepository } from "@/domains/comments/CommentRepository.js";
import {
  CommentNotFoundError,
  ForbiddenCommentDeleteError,
} from "@/domains/comments/CommentErrors.js";
import { DeleteCommentCommand } from "./DeleteCommentCommand.js";

export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    const comment = await this.commentRepository.findById(command.commentId);

    if (!comment) {
      throw new CommentNotFoundError(command.commentId);
    }

    // If articleId is provided, enforce article ownership
    if (command.articleId && comment.articleId !== command.articleId) {
      throw new CommentNotFoundError(command.commentId);
    }

    const isAuthor = command.requesterRole === "AUTHOR";
    const isOwner = comment.authorId === command.requesterId;

    if (!isAuthor && !isOwner) {
      throw new ForbiddenCommentDeleteError();
    }

    await this.commentRepository.deleteById(comment.id);
  }
}
