import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleArticleQuery } from "@/queries/article.query";
import { ArticleContent } from "@/components/ArticleReadPage/ArticleContent";
import { ArticleReadSkeleton } from "@/components/ArticleReadPage/ArticleReadSkeleton";
import { ArticleReadError } from "@/components/ArticleReadPage/ArticleReadError";
import { SignInPrompt } from "@/components/ArticleReadPage/SignInPrompt";
import { useAuthStore } from "@/store/auth.store";
import AuthModal from "@/components/AuthModal/AuthModal";
import CommentCard from "@/components/Comment/CommentCard";

const ArticleReadPage = () => {
  const { id } = useParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { isAuthenticated } = useAuthStore();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useSingleArticleQuery(id ?? "");

  if (isLoading) return <ArticleReadSkeleton />;

  if (isError || !article)
    return <ArticleReadError refetch={refetch} isError={isError} />;

  return (
    <main className="py-12 container mx-auto px-4 lg:px-8 max-w-4xl">
      <ArticleContent article={article} />

      {isAuthenticated ? (
        <div>
          <CommentCard articleId={id ?? ""} />
        </div>
      ) : (
        <SignInPrompt onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />
    </main>
  );
};

export default ArticleReadPage;
