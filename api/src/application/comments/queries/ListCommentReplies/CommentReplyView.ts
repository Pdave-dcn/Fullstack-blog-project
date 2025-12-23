export interface CommentReplyView {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    username: string;
  };
  mentionedUser?: {
    id: string;
    username: string;
  };
}
