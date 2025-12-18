export interface CommentReplyView {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    username: string;
  };
  mentionedUser?: {
    username: string;
  };
}
