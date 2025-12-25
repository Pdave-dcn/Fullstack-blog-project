import { useState } from "react";
import { toast } from "sonner";
import {
  useArticlesQuery,
  useDeleteArticleMutation,
  useUpdateArticleStatusMutation,
} from "@/queries/article.query";
import type { ArticleStatus } from "@/zodSchemas/article.zod";
import { useDebouncedValue } from "./useDebounce";

/**
 * Custom hook for managing articles with filtering, searching, and status operations.
 *
 * Provides functionality to fetch, filter, search, delete, and update the publication status of articles.
 * Includes debounced search to optimize API calls and toast notifications for user feedback.
 *
 * @return {Object} An object containing:
 * - `filter` {ArticleStatus | "all"} - Current filter state for article status
 * - `setFilter` {Function} - Function to update the filter state
 * - `searchQuery` {string} - Current search query string
 * - `setSearchQuery` {Function} - Function to update the search query
 * - `articles` {Array} - Array of fetched articles based on current filter and search
 * - `isLoading` {boolean} - Loading state of the articles query
 * - `isError` {boolean} - Error state of the articles query
 * - `refetch` {Function} - Function to manually refetch articles
 * - `handleDeleteArticle` {Function} - Function to delete an article by ID with confirmation
 * - `handlePublishStatus` {Function} - Function to update an article's publication status
 */
export const useArticles = () => {
  const [filter, setFilter] = useState<ArticleStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useArticlesQuery({
    status: filter,
    search: debouncedSearch,
  });

  const updateStatusMutation = useUpdateArticleStatusMutation();
  const deleteArticleMutation = useDeleteArticleMutation();

  const handleDeleteArticle = (articleId: string) => {
    toast.warning("Delete Article", {
      description: "Are you sure you want to delete this article?",
      action: {
        label: "Delete",
        onClick: () => {
          deleteArticleMutation.mutate(articleId, {
            onSuccess: () => {
              toast.success("Article deleted successfully");
            },
            onError: (error) => {
              toast.error("Failed to delete article", {
                description:
                  error instanceof Error ? error.message : "Unknown error",
              });
            },
          });
        },
      },
    });
  };

  const handlePublishStatus = (articleId: string, newStatus: ArticleStatus) => {
    updateStatusMutation.mutate(
      {
        articleId,
        data: { status: newStatus },
      },
      {
        onSuccess: () => {
          toast.success(
            `Article ${
              newStatus === "PUBLISHED" ? "published" : "unpublished"
            } successfully`
          );
        },
        onError: (error) => {
          toast.error(
            `Failed to ${
              newStatus === "PUBLISHED" ? "publish" : "unpublish"
            } article`,
            {
              description:
                error instanceof Error ? error.message : "Unknown error",
            }
          );
        },
      }
    );
  };

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    articles,
    isLoading,
    isError,
    refetch,
    handleDeleteArticle,
    handlePublishStatus,
  };
};
