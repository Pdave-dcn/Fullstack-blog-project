import handleZodValidationError from "@/utils/zodErrorHandler";
import {
  CommentForAuthorViewResponseSchema,
  ParentCommentsResponseSchema,
  RepliesResponseSchema,
  type CommentCreationData,
} from "@/zodSchemas/comment.zod";

import api from "./axios";

export interface CommentEditData {
  articleId: string;
  content: string;
}

const getCommentsForAuthorView = async (page: number, pageSize: number) => {
  try {
    const res = await api.get("/comments/author", {
      params: { page, pageSize },
    });
    const parsed = CommentForAuthorViewResponseSchema.parse(res.data);

    return parsed;
  } catch (error) {
    handleZodValidationError(error, "getCommentsForAuthorView");
    throw error;
  }
};

const getArticleParentComments = async (
  articleId: string,
  cursor?: string | number,
  limit = 10
) => {
  try {
    const res = await api.get(`/articles/${articleId}/comments`, {
      params: { cursor, limit },
    });

    const validatedData = ParentCommentsResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "getArticleParentComments");
    throw error;
  }
};

const getParentCommentReplies = async (
  parentId: string,
  cursor?: string | number,
  limit = 10
) => {
  try {
    const res = await api.get(`/comments/${parentId}/replies`, {
      params: { cursor, limit },
    });

    const validatedData = RepliesResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "getParentCommentReplies");
    throw error;
  }
};

const createComment = async (data: CommentCreationData) => {
  await api.post(`/comments`, data);
};

const editComment = async (commentId: string, data: CommentEditData) => {
  await api.put(`/comments/${commentId}`, data);
};

const deleteComment = async (commentId: string) => {
  await api.delete(`/comments/${commentId}`);
};

export {
  getArticleParentComments,
  getParentCommentReplies,
  getCommentsForAuthorView,
  createComment,
  editComment,
  deleteComment,
};
