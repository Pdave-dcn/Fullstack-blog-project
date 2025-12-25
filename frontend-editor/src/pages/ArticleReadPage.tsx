import { Card, CardContent } from "@/components/ui/card";
import { useSingleArticleQuery } from "@/queries/article.query";
import { useParams } from "react-router-dom";
import { ArticleHeader } from "@/components/ArticleReadPage/ArticleHeader";
import CommentCard from "@/components/Comment/CommentCard";
import { Badge } from "@/components/ui/badge";
import { ArticleReadSkeleton } from "@/components/ArticleReadPage/ArticleReadSkeleton";
import { ArticleReadError } from "@/components/ArticleReadPage/ArticleReadError";

const ArticleReadPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useSingleArticleQuery(id ?? "");

  if (isLoading) return <ArticleReadSkeleton />;

  if (isError) return <ArticleReadError refetch={() => refetch()} />;

  if (!article) return <ArticleReadError refetch={() => refetch()} />;

  return (
    <div title={article.title}>
      <div className="max-w-4xl mx-auto">
        <ArticleHeader article={article} />

        {/* Article content */}
        <Card className="mb-8">
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </CardContent>
        </Card>

        {/* Comments section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">Comments</h2>
            <Badge variant="secondary" className="text-sm">
              {article.commentsCount}
            </Badge>
          </div>
          <CommentCard articleId={article.id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleReadPage;
