import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRepliesQuery } from "@/queries/comment.query";
import { useAuthStore } from "@/stores/auth.store";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { getInitials } from "@/utils/getInitials";

import CommentCardMenu from "./CommentCardMenu";
import CommentForm from "./CommentForm";
import { LoadMoreButton } from "../LoadMoreButton";
import { Separator } from "../ui/separator";

interface RepliesListProps {
  parentId: string;
  articleId: string;
}

const RepliesList = ({ parentId, articleId }: RepliesListProps) => {
  const [openCommentForm, setOpenCommentForm] = useState<Set<string>>(
    new Set()
  );
  const toggleCommentForm = (commentId: string) => {
    setOpenCommentForm((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useRepliesQuery(parentId);

  const replies = data?.pages.flatMap((p) => p.data) ?? [];

  const { user } = useAuthStore();
  if (!user) return;

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <p className="text-sm text-red-500">Failed to load replies</p>
          <Button variant={"ghost"} onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );

  return (
    <div className="ml-11">
      <div className="mt-2 flex flex-col gap-3">
        {replies.map((reply, index) => (
          <div key={reply.id}>
            <div className="flex space-x-3">
              <Avatar className="w-7 h-7">
                <AvatarImage src={""} />
                <AvatarFallback className="text-xs">
                  {getInitials(reply.author.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    {reply.author.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(reply.createdAt)}
                  </span>
                  <button
                    onClick={() => toggleCommentForm(reply.id)}
                    type="button"
                    className="text-xs text-muted-foreground cursor-pointer hover:underline"
                  >
                    Reply
                  </button>

                  <CommentCardMenu comment={reply} />
                </div>

                <div>
                  <p className="text-sm leading-relaxed">
                    {reply.mentionedUser && (
                      <span className="font-medium text-sm mr-2">
                        @{reply.mentionedUser.username}
                      </span>
                    )}

                    {reply.content}
                  </p>
                </div>

                {openCommentForm.has(reply.id) && (
                  <div className="mt-2">
                    <CommentForm
                      isReply
                      author={reply.author.username}
                      articleId={articleId}
                      parentId={reply.id}
                      onSubmitStart={() => toggleCommentForm(reply.id)}
                    />
                  </div>
                )}
              </div>
            </div>
            {index < replies.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}

        {hasNextPage && (
          <LoadMoreButton
            variant="outline"
            onClick={fetchNextPage}
            isLoading={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default RepliesList;
