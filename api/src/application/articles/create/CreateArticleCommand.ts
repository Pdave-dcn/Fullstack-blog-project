import { ArticleStatus } from "@/domains/articles/ArticleStatus";
import { UserRole } from "@/domains/users/UserRole";

export interface CreateArticleCommand {
  authorId: string;
  authorRole: UserRole;
  title: string;
  content: string;
  status: ArticleStatus;
}
