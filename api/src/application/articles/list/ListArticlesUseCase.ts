import { ArticleRepository } from "@/domains/articles/ArticleRepository";
import { ListArticleQuery } from "./ListArticlesQuery";
import { ArticleStatus } from "@prisma/client";

export class ListArticlesUseCase {
  constructor(public readonly articleRepository: ArticleRepository) {}

  async execute(query: ListArticleQuery) {
    const isAuthor = query.requesterRole === "AUTHOR";

    const visibleStatuses = isAuthor
      ? [ArticleStatus.DRAFT, ArticleStatus.PUBLISHED]
      : [ArticleStatus.PUBLISHED];

    return await this.articleRepository.findByStatuses(visibleStatuses);
  }
}
