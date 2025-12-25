import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export interface ArticlesForAuthorTableView {
  id: string;
  title: string;
  status: ArticleStatus;
  commentsCount: number;
  createdAt: Date;
}

export interface GetArticlesForAuthorTableParams {
  status?: string;
  search?: string;
}
