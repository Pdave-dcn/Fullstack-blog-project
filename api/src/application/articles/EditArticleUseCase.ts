import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { EditArticleCommand } from "./EditArticleCommand.js";
import {
  ArticleNotFoundError,
  ForbiddenArticleEditError,
  UnauthorizedAuthorError,
} from "@/domains/articles/ArticleErrors.js";

export class EditArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: EditArticleCommand) {
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

    article.update({
      title: command.title,
      content: command.content,
      status: command.status,
    });

    this.articleRepository.update(article);

    return article;
  }
}
