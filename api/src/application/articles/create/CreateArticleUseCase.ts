import { Article } from "@/domains/articles/Article.js";
import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { UnauthorizedAuthorError } from "@/domains/articles/ArticleErrors.js";
import { CreateArticleCommand } from "./CreateArticleCommand.js";
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
    await this.articleRepository.create(article);

    return article;
  }
}
