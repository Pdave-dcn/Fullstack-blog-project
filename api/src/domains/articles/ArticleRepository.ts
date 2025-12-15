import { Article } from "./Article.js";

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  create(article: Article): Promise<void>;
  update(article: Article): Promise<void>;
}
