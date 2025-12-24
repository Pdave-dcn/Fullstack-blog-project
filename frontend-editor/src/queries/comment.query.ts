import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createComment,
  deleteComment,
  getParentCommentReplies,
  getArticleParentComments,
  type CommentEditData,
  editComment,
  getCommentsForAuthorView,
} from "@/api/comment.api";
import type { CommentCreationData } from "@/zodSchemas/comment.zod";
import { useState } from "react";

interface UseCommentsForAuthorQueryOptions {
  initialPage?: number;
  pageSize?: number;
  enabled?: boolean;
}

const useCommentsForAuthorQuery = ({
  initialPage = 1,
  pageSize = 10,
  enabled = true,
}: UseCommentsForAuthorQueryOptions = {}) => {
  const [page, setPage] = useState(initialPage);

  const query = useQuery({
    queryKey: ["comments", "author", { page, pageSize }],
    queryFn: () => getCommentsForAuthorView(page, pageSize),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const goToNextPage = () => {
    if (query.data && page < query.data.pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (newPage: number) => {
    if (
      query.data &&
      newPage >= 1 &&
      newPage <= query.data.pagination.totalPages
    ) {
      setPage(newPage);
    }
  };

  return {
    ...query,
    page,
    pageSize,
    pagination: query.data?.pagination,
    comments: query.data?.data,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    hasNextPage: query.data ? page < query.data.pagination.totalPages : false,
    hasPreviousPage: page > 1,
  };
};

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

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
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
  useCommentsForAuthorQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
};
