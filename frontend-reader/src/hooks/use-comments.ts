import { useState } from "react";
import { toast } from "sonner";
import { handleApiResponseError } from "@/utils/handleApiResponseError";

const API_ENDPOINTS = {
  COMMENTS: (blogPostId: string) =>
    `${import.meta.env.VITE_API_BASE_URL}/posts/${blogPostId}/comments`,
  DELETE_COMMENT: (blogPostId: string, commentId: number) =>
    `${
      import.meta.env.VITE_API_BASE_URL
    }/posts/${blogPostId}/comments/${commentId}`,
};

export const useComments = (blogPostId: string, token: string | null) => {
  const [isPending, setIsPending] = useState(false);

  const createComment = async (content: string, parentId?: number) => {
    if (!content.trim()) return false;

    setIsPending(true);
    try {
      const res = await fetch(API_ENDPOINTS.COMMENTS(blogPostId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          parentId: parentId || null,
        }),
      });

      if (!res.ok) {
        handleApiResponseError(
          res,
          parentId ? "Failed to create reply" : "Failed to create comment"
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    return new Promise<void>((resolve, reject) => {
      toast.warning("Delete Comment", {
        description: "Are you sure you want to delete this comment?",
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              const res = await fetch(
                API_ENDPOINTS.DELETE_COMMENT(blogPostId, commentId),
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );

              if (!res.ok) {
                handleApiResponseError(res, "Failed to delete comment");
                reject();
                return;
              }

              toast.success("Comment deleted successfully");
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          },
        },
      });
    });
  };

  const editComment = async (commentId: number, content: string) => {
    if (!content.trim()) return false;

    try {
      const res = await fetch(
        API_ENDPOINTS.DELETE_COMMENT(blogPostId, commentId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) {
        handleApiResponseError(res, "Failed to edit comment");
        return false;
      }

      toast.success("Comment updated successfully");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    createComment,
    deleteComment,
    editComment,
    isPending,
  };
};
