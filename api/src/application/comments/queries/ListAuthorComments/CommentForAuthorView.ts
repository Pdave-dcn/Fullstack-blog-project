export interface CommentForAuthorView {
  id: string;
  content: string;
  article: {
    id: string;
    title: string;
  };
  author: {
    name: string;
    username: string;
  };
  createdAt: Date;
}
