import { DomainError } from "../shared/DomainError.js";

export class CommentNotFoundError extends DomainError {
  readonly code = "COMMENT_NOT_FOUND";
  readonly status = 404;

  constructor(commentId: string) {
    super(`Comment with ID ${commentId} not found.`);
  }
}

export class ParentCommentNotFoundError extends DomainError {
  readonly code = "PARENT_COMMENT_NOT_FOUND";
  readonly status = 404;

  constructor(parentCommentId: string) {
    super(`Parent comment with ID ${parentCommentId} not found.`);
  }
}

export class ParentCommentArticleMismatchError extends DomainError {
  readonly code = "PARENT_COMMENT_ARTICLE_MISMATCH";
  readonly status = 400;

  constructor(parentCommentId: string, articleId: string) {
    super(
      `Parent comment with ID ${parentCommentId} does not belong to article with ID ${articleId}.`
    );
  }
}

export class InvalidCommentContentError extends DomainError {
  readonly code = "INVALID_COMMENT_CONTENT";
  readonly status = 400;

  constructor() {
    super("Comment content cannot be empty.");
  }
}

export class ForbiddenCommentDeleteError extends DomainError {
  readonly code = "FORBIDDEN_COMMENT_DELETE";
  readonly status = 403;

  constructor() {
    super("You cannot delete someone else's comment.");
  }
}

export class ForbiddenCommentEditError extends DomainError {
  readonly code = "FORBIDDEN_COMMENT_EDIT";
  readonly status = 403;

  constructor() {
    super("You cannot edit someone else's comment.");
  }
}
