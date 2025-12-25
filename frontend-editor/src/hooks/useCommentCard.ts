import { useParentCommentsQuery } from "@/queries/comment.query";

interface UseCommentCardProps {
  articleId: string;
}

export const useCommentCard = ({ articleId }: UseCommentCardProps) => {
  const {
    data,
    isLoading,
    error,
    hasNextPage: hasMoreComments,
    fetchNextPage: fetchMoreComments,
    isFetchingNextPage: isFetchingComments,
    refetch,
  } = useParentCommentsQuery(articleId);

  const handleRetry = async () => {
    await refetch();
  };

  const comments = data?.pages.flatMap((page) => page?.data) ?? [];

  return {
    comments,
    isLoading,
    error,
    hasMoreComments,
    isFetchingComments,
    handlers: {
      handleRetry,
      fetchMoreComments,
    },
  };
};
