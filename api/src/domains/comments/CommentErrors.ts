import { DomainError } from "../shared/DomainError.js";

export class CommentNotFoundError extends DomainError {
  constructor(commentId: string) {
    super(`Comment with ID ${commentId} not found.`);
  }
}

export class ParentCommentNotFoundError extends DomainError {
  constructor(parentCommentId: string) {
    super(`Parent comment with ID ${parentCommentId} not found.`);
  }
}

export class ParentCommentArticleMismatchError extends DomainError {
  constructor(parentCommentId: string, articleId: string) {
    super(
      `Parent comment with ID ${parentCommentId} does not belong to article with ID ${articleId}.`
    );
  }
}

export class InvalidCommentContentError extends DomainError {
  constructor() {
    super("Comment content cannot be empty.");
  }
}
