import { Article } from "./Article.js";

export interface ArticleRepository {
  save(article: Article): Promise<void>;
}
