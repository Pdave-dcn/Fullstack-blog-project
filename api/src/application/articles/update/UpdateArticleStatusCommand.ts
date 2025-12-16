import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export interface UpdateArticleStatusCommand {
  articleId: string;
  authorRole: "AUTHOR" | "READER";
  authorId: string;
  status: ArticleStatus;
}
