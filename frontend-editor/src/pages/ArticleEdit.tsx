import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useSingleArticleQuery,
  useUpdateArticleMutation,
} from "@/queries/article.query";
import { ArticleEditSkeleton } from "@/components/ArticleEditPage/ArticleEditSkeleton";
import { ArticleEditError } from "@/components/ArticleEditPage/ArticleEditError";
import { ArticleEditForm } from "@/components/ArticleEditPage/ArticleEditForm";

const ArticleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useSingleArticleQuery(id ?? "");

  const updateArticleMutation = useUpdateArticleMutation();

  const handleSubmit = (title: string, content: string) => {
    if (!title.trim() || !content?.trim()) {
      toast.warning("Title and content are required.");
      return;
    }

    if (!article) return;

    updateArticleMutation.mutate(
      {
        articleId: id!,
        data: {
          title,
          content,
        },
      },
      {
        onSuccess: () => {
          toast.success("Article updated successfully!");
          navigate("/articles");
        },
        onError: (error) => {
          toast.error("Failed to update article", {
            description:
              error instanceof Error ? error.message : "Unknown error",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleBack = () => {
    navigate("/articles");
  };

  if (isLoading) {
    return <ArticleEditSkeleton />;
  }

  if (isError || !article) {
    return <ArticleEditError onRetry={() => refetch()} onBack={handleBack} />;
  }

  return (
    <ArticleEditForm
      article={article}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={updateArticleMutation.isPending}
    />
  );
};

export default ArticleEdit;
