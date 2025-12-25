import type { Comment } from "@/zodSchemas/comment.zod";

import CommentCardMenu from "./CommentCardMenu";

interface CommentActionsProps {
  comment: Comment;
  onReplyClick: () => void;
}

const CommentActions = ({ comment, onReplyClick }: CommentActionsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onReplyClick}
        type="button"
        className="text-xs text-muted-foreground cursor-pointer hover:underline"
      >
        Reply
      </button>
      <CommentCardMenu comment={comment} />
    </div>
  );
};

export default CommentActions;
