import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { CommentRepository } from "@/domains/comments/CommentRepository.js";
import { CreateCommentCommand } from "./CreateCommentCommand.js";
import { ArticleNotFoundError } from "@/domains/articles/ArticleErrors.js";
import {
  ParentCommentArticleMismatchError,
  ParentCommentNotFoundError,
} from "@/domains/comments/CommentErrors";
import { Comment } from "@/domains/comments/Comment.js";

export class CreateCommentUseCase {
  constructor(
    public readonly commentRepository: CommentRepository,
    public readonly articleRepository: ArticleRepository
  ) {}

  async execute(command: CreateCommentCommand) {
    const article = await this.articleRepository.findById(command.articleId);
    if (!article) {
      throw new ArticleNotFoundError(command.articleId);
    }

    let comment: Comment;

    if (command.parentId) {
      const parentComment = await this.commentRepository.findById(
        command.parentId
      );
      if (!parentComment)
        throw new ParentCommentNotFoundError(command.parentId);

      if (parentComment.articleId !== command.articleId) {
        throw new ParentCommentArticleMismatchError(
          command.parentId,
          command.articleId
        );
      }

      comment = Comment.createReply(
        parentComment,
        command.authorId,
        command.content
      );
    } else {
      comment = Comment.create({
        id: crypto.randomUUID(),
        articleId: command.articleId,
        authorId: command.authorId,
        content: command.content,
      });
    }

    await this.commentRepository.create(comment);
    return comment;
  }
}
