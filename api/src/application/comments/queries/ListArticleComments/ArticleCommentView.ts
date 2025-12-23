export interface ArticleCommentView {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    username: string;
  };
  repliesCount: number;
}
