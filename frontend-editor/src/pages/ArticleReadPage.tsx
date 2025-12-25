import { Card, CardContent } from "@/components/ui/card";
import { useSingleArticleQuery } from "@/queries/article.query";
import { useParams } from "react-router-dom";
import { ArticleHeader } from "@/components/ArticleReadPage/ArticleHeader";

const ArticleReadPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useSingleArticleQuery(id ?? "");

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error!</h1>;
  if (!article) return null;

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
      </div>
    </div>
  );
};

export default ArticleReadPage;
