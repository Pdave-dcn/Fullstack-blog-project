import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export interface ArticleDetailsView {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  createdAt: Date;
  commentsCount: number;
}
