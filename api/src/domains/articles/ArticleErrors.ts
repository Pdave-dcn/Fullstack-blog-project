import { DomainError } from "@/domains/shared/DomainError.js";

export class UnauthorizedAuthorError extends DomainError {
  constructor() {
    super("Only authors can perform this action.");
  }
}

export class ArticleNotFoundError extends DomainError {
  constructor(articleId: string) {
    super(`Article with ID ${articleId} not found.`);
  }
}

export class ForbiddenArticleEditError extends DomainError {
  constructor() {
    super("You cannot edit someone else's article.");
  }
}
