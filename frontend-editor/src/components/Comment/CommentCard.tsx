import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useCommentCard } from "@/hooks/useCommentCard";
import { useCommentStore } from "@/stores/comment.store";

import CommentsEmpty from "./CommentsEmpty";
import CommentsError from "./CommentsError";
import CommentsList from "./CommentsList";
import CommentsLoading from "./CommentsLoading";
import CommentForm from "./CommentForm";

interface CommentCardProps {
  articleId: string;
}

const CommentCard = ({ articleId }: CommentCardProps) => {
  const setArticleId = useCommentStore((s) => s.setArticleId);

  useEffect(() => {
    setArticleId(articleId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  const {
    comments,
    isLoading,
    error,
    hasMoreComments,
    isFetchingComments,
    handlers,
  } = useCommentCard({ articleId });

  if (isLoading) {
    return <CommentsLoading />;
  }

  if (error) {
    return <CommentsError error={error} onRetry={handlers.handleRetry} />;
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        {comments.length === 0 ? (
          <CommentsEmpty />
        ) : (
          <div className="flex flex-col gap-10 md:gap-13 lg:gap-15">
            <CommentForm articleId={articleId} />

            <CommentsList
              comments={comments}
              hasMoreComments={hasMoreComments}
              isFetchingComments={isFetchingComments}
              onFetchMore={handlers.fetchMoreComments}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
