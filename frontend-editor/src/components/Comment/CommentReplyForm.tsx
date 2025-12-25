import CommentForm from "./CommentForm";

interface CommentReplyFormProps {
  isOpen: boolean;
  author: string;
  articleId: string;
  parentId: string;
  onSubmitStart: () => void;
}

const CommentReplyForm = ({
  isOpen,
  author,
  articleId,
  parentId,
  onSubmitStart,
}: CommentReplyFormProps) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2">
      <CommentForm
        isReply
        author={author}
        articleId={articleId}
        parentId={parentId}
        onSubmitStart={onSubmitStart}
      />
    </div>
  );
};

export default CommentReplyForm;
