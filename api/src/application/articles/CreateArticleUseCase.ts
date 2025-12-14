import { Article } from "../../domains/articles/Article";
import { ArticleRepository } from "../../domains/articles/ArticleRepository";
import { UnauthorizedAuthorError } from "../../domains/articles/errors/UnauthorizedAuthorError";
import { CreateArticleCommand } from "./CreateArticleCommand";
import { randomUUID } from "crypto";

export class CreateArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: CreateArticleCommand) {
    // 1. Authorization rule (application-level)
    if (command.authorRole !== "AUTHOR") {
      throw new UnauthorizedAuthorError();
    }

    // 2. Create domain entity
    const article = Article.create({
      id: randomUUID(),
      title: command.title,
      content: command.content,
      status: command.status,
      authorId: command.authorId,
    });

    // 3. Persist
    await this.articleRepository.save(article);

    return article;
  }
}
