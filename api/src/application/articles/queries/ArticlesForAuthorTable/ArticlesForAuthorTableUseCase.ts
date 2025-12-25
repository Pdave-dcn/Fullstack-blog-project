import { ArticleQueryRepository } from "@/domains/articles/ArticleQueryRepository.js";
import { GetArticlesForAuthorTableParams } from "./ArticlesForAuthorTableView";

export class GetArticlesForAuthorTableUseCase {
  constructor(private readonly repo: ArticleQueryRepository) {}

  async execute(params?: GetArticlesForAuthorTableParams) {
    const articles = await this.repo.getArticlesForAuthorTable(params);

    return articles;
  }
}
