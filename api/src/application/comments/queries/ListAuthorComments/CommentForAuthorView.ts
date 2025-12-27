export interface CommentForAuthorView {
  id: string;
  content: string;
  authorId: string;
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
