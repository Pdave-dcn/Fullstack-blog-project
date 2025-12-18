export interface RecentCommentView {
  id: string;
  content: string;
  articleTitle: string;
  user: {
    name: string;
    username: string;
  };
  createdAt: Date;
}
