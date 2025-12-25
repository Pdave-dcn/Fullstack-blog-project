import { ArticleQueryRepository } from "@/domains/articles/ArticleQueryRepository.js";

export class GetArticleDetailsUseCase {
  constructor(private readonly repo: ArticleQueryRepository) {}

  async execute(articleId: string) {
    return this.repo.getArticleDetails(articleId);
  }
}
