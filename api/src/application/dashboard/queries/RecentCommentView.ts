export interface RecentCommentView {
  id: string;
  content: string;
  articleTitle: string;
  author: {
    name: string;
    username: string;
  };
  createdAt: Date;
}
