import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export class GetRecentArticlesUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(limit = 3) {
    const articles = await this.articleRepository.findByStatuses([
      ArticleStatus.PUBLISHED,
    ]);

    return articles.slice(0, limit);
  }
}
