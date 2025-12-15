import { ArticleStatus } from "@/domains/articles/ArticleStatus";

export interface EditArticleCommand {
  articleId: string;
  authorId: string;
  authorRole: "AUTHOR" | "READER";
  title?: string;
  content?: string;
  status?: ArticleStatus;
}
