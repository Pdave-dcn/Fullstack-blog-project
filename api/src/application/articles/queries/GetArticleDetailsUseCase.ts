import { ArticleRepository } from "@/domains/articles/ArticleRepository";

export class GetArticleDetailsUseCase {
  constructor(private readonly repo: ArticleRepository) {}

  async execute(articleId: string) {
    return this.repo.getArticleDetails(articleId);
  }
}
