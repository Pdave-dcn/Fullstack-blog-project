import { DomainError } from "@/domains/shared/DomainError.js";

export class UnauthorizedAuthorError extends DomainError {
  readonly code = "UNAUTHORIZED_AUTHOR";
  readonly status = 403;

  constructor() {
    super("Only authors can perform this action.");
  }
}

export class ArticleNotFoundError extends DomainError {
  readonly code = "ARTICLE_NOT_FOUND";
  readonly status = 404;

  constructor(articleId: string) {
    super(`Article with ID ${articleId} not found.`);
  }
}

export class ForbiddenArticleEditError extends DomainError {
  readonly code = "FORBIDDEN_ARTICLE_EDIT";
  readonly status = 403;

  constructor() {
    super("You cannot edit someone else's article.");
  }
}

export class ForbiddenArticleDeleteError extends DomainError {
  readonly code = "FORBIDDEN_ARTICLE_DELETE";
  readonly status = 403;

  constructor() {
    super("You cannot delete someone else's article.");
  }
}

export class ArticleAlreadyPublishedError extends DomainError {
  readonly code = "ARTICLE_ALREADY_PUBLISHED";
  readonly status = 400;

  constructor() {
    super("You cannot publish an already published article.");
  }
}

export class ArticleAlreadyDraftError extends DomainError {
  readonly code = "ARTICLE_ALREADY_DRAFT";
  readonly status = 400;

  constructor() {
    super("You cannot draft an already drafted article.");
  }
}
