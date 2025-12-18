export interface CommentForAuthorView {
  id: string;
  content: string;
  article: {
    id: string;
    title: string;
  };
  user: {
    name: string;
    username: string;
  };
  createdAt: Date;
}
