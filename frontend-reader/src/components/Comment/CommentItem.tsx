import { useCommentStore } from "@/store/comment.store";
import type { Comment } from "@/zodSchemas/comment.zod";

import RepliesList from "./RepliesList";
import { Separator } from "../ui/separator";

import CommentActions from "./CommentActions";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentRepliesToggle from "./CommentRepliesToggle";
import CommentReplyForm from "./CommentReplyForm";
import CommentEditForm from "./CommentEditForm"; // ✅ Add this

interface CommentItemProps {
  comment: Comment;
  showSeparator: boolean;
}

const CommentItem = ({ comment, showSeparator }: CommentItemProps) => {
  const {
    toggleReplies,
    openReplies,
    articleId,
    openCommentForm,
    toggleCommentForm,
    editingComments,
    toggleEditMode,
  } = useCommentStore();

  const isEditing = editingComments.has(comment.id);

  return (
    <div>
      <div className="flex space-x-3 ">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <CommentAuthor
              author={comment.author}
              createdAt={comment.createdAt}
            />
            <CommentActions
              comment={comment}
              onReplyClick={() => toggleCommentForm(comment.id)}
            />
          </div>

          <div className="ml-11">
            {isEditing ? (
              <CommentEditForm
                commentId={comment.id}
                articleId={articleId}
                initialContent={comment.content}
                onCancel={() => toggleEditMode(comment.id)}
                onSuccess={() => toggleEditMode(comment.id)}
              />
            ) : (
              <CommentContent content={comment.content} />
            )}

            <CommentReplyForm
              isOpen={openCommentForm.has(comment.id)}
              author={comment.author.username}
              articleId={articleId}
              parentId={comment.id}
              onSubmitStart={() => toggleCommentForm(comment.id)}
            />

            <CommentRepliesToggle
              totalReplies={comment.repliesCount}
              isOpen={openReplies.has(comment.id)}
              onToggle={() => toggleReplies(comment.id)}
            />
          </div>
        </div>
      </div>

      {openReplies.has(comment.id) && (
        <RepliesList parentId={comment.id} articleId={articleId} />
      )}
      {showSeparator && <Separator className="mt-4" />}
    </div>
  );
};

export default CommentItem;
