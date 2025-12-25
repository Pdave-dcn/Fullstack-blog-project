import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateArticleMutation } from "@/queries/article.query";
import { NewArticleForm } from "@/components/NewArticlePage/NewArticleForm";
import type { ArticleStatus } from "@/zodSchemas/article.zod";

const NewArticle = () => {
  const navigate = useNavigate();
  const createArticleMutation = useCreateArticleMutation();

  const handleSubmit = (
    title: string,
    content: string,
    status: ArticleStatus
  ) => {
    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content are required.");
      return;
    }

    createArticleMutation.mutate(
      {
        title,
        content,
        status,
      },
      {
        onSuccess: () => {
          toast.success(
            `Article ${
              status === "PUBLISHED" ? "published" : "saved as draft"
            }!`
          );
          navigate("/articles");
        },
        onError: (error) => {
          toast.error("Failed to create article", {
            description:
              error instanceof Error ? error.message : "Unknown error",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <NewArticleForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={createArticleMutation.isPending}
    />
  );
};

export default NewArticle;
