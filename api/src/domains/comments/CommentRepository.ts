import { Comment } from "./Comment.js";

export interface CommentRepository {
  create(comment: Comment): Promise<void>;
  deleteById(id: string): Promise<void>;
  findByArticleId(articleId: string): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
}
