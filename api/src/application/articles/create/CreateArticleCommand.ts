import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";
import { UserRole } from "@/domains/users/UserRole.js";

export interface CreateArticleCommand {
  authorId: string;
  authorRole: UserRole;
  title: string;
  content: string;
  status: ArticleStatus;
}
