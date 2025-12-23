import handleZodValidationError from "@/utils/zodErrorHandler";
import {
  ParentCommentsResponseSchema,
  RepliesResponseSchema,
  type CommentCreationData,
} from "@/zodSchemas/comment.zod";

import api from "./axios";

export interface CommentEditData {
  articleId: string;
  content: string;
}

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
  createComment,
  editComment,
  deleteComment,
};
