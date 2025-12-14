import { Article } from "./Article";

export interface ArticleRepository {
  save(article: Article): Promise<void>;
}
