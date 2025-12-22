import { ArticleDetailsView } from "@/application/articles/queries/ArticleDetailsView.js";
import { Article } from "./Article.js";
import { ArticleStatus } from "./ArticleStatus.js";

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  getArticleDetails(id: string): Promise<ArticleDetailsView | null>;
  findByStatuses(statuses: ArticleStatus[]): Promise<Article[]>;
  deleteById(id: string): Promise<void>;
  create(article: Article): Promise<void>;
  update(article: Article): Promise<void>;
}
