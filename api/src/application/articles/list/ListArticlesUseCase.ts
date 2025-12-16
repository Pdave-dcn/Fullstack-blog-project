import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { ListArticleQuery } from "./ListArticlesQuery.js";
import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

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
