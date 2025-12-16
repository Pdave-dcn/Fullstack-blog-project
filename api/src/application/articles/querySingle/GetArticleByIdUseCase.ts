import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { ArticleNotFoundError } from "@/domains/articles/ArticleErrors.js";

export class GetArticleByIdUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(articleId: string) {
    const article = await this.articleRepository.findById(articleId);

    if (!article) {
      throw new ArticleNotFoundError(articleId);
    }

    return article;
  }
}
