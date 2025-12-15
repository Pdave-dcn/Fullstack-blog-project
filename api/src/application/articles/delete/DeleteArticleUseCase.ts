import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { DeleteArticleCommand } from "./DeleteArticleCommand.js";
import {
  ArticleNotFoundError,
  ForbiddenArticleDeleteError,
  UnauthorizedAuthorError,
} from "@/domains/articles/ArticleErrors.js";

export class DeleteArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: DeleteArticleCommand) {
    if (command.authorRole !== "AUTHOR") {
      throw new UnauthorizedAuthorError();
    }

    const article = await this.articleRepository.findById(command.articleId);
    if (!article) {
      throw new ArticleNotFoundError(command.articleId);
    }

    if (command.authorId !== article.authorId) {
      throw new ForbiddenArticleDeleteError();
    }

    await this.articleRepository.deleteById(command.articleId);
  }
}
