import { ArticleStatus } from "@/domains/articles/ArticleStatus";

export interface CreateArticleCommand {
  authorId: string;
  authorRole: "AUTHOR" | "READER";
  title: string;
  content: string;
  status: ArticleStatus;
}
