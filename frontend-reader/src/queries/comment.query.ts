import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createComment,
  deleteComment,
  getParentCommentReplies,
  getArticleParentComments,
  type CommentEditData,
  editComment,
} from "@/api/comment.api";
import type { CommentCreationData } from "@/zodSchemas/comment.zod";

const useParentCommentsQuery = (articleId: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["comments", articleId, "parents"],
    queryFn: ({ pageParam }: { pageParam?: string | number }) => {
      return getArticleParentComments(articleId, pageParam as number, limit);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.nextCursor
        : undefined;
    },
  });
};

const useRepliesQuery = (parentId: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["comments", parentId, "replies"],
    queryFn: ({ pageParam }: { pageParam?: string | number }) => {
      return getParentCommentReplies(parentId, pageParam as number, limit);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.nextCursor
        : undefined;
    },
  });
};

const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: CommentCreationData }) =>
      createComment(data),

    onSuccess: async (_newComment, { data }) => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["articles", data.articleId],
      });
    },
  });
};

const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: string;
      data: CommentEditData;
    }) => editComment(commentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

const useDeleteCommentMutation = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export {
  useParentCommentsQuery,
  useRepliesQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
};
