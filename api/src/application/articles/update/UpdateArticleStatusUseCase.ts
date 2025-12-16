import { ArticleRepository } from "@/domains/articles/ArticleRepository";
import { UpdateArticleStatusCommand } from "./UpdateArticleStatusCommand";
import {
  ArticleNotFoundError,
  ForbiddenArticleEditError,
  UnauthorizedAuthorError,
} from "@/domains/articles/ArticleErrors";
import { ArticleStatus } from "@/domains/articles/ArticleStatus";

export class UpdateArticleStatusUseCase {
  constructor(public readonly articleRepository: ArticleRepository) {}

  async execute(command: UpdateArticleStatusCommand) {
    if (command.authorRole !== "AUTHOR") {
      throw new UnauthorizedAuthorError();
    }

    const article = await this.articleRepository.findById(command.articleId);
    if (!article) {
      throw new ArticleNotFoundError(command.articleId);
    }

    if (article.authorId !== command.authorId) {
      throw new ForbiddenArticleEditError();
    }

    if (command.status === ArticleStatus.PUBLISHED) {
      article.publish();
    } else {
      article.unpublish();
    }

    await this.articleRepository.update(article);
  }
}
