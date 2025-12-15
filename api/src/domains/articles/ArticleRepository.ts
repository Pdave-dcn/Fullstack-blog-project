import { ArticleStatus } from "@prisma/client";
import { Article } from "./Article.js";

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  findByStatuses(statuses: ArticleStatus[]): Promise<Article[]>;
  deleteById(id: string): Promise<void>;
  create(article: Article): Promise<void>;
  update(article: Article): Promise<void>;
}
