export interface ArticleCommentView {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    username: string;
  };
  repliesCount: number;
}
