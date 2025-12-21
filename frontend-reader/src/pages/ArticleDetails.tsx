import { Link, useParams } from "react-router-dom";
//import CommentSection from "@/components/CommentSection";
//import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import estimateReadTime from "@/utils/estimatedReadTime";
import { articles } from "@/lib/mock-article-data";

const ArticleDetails = () => {
  const { id } = useParams();

  const article = articles.find((article) => article.id === id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="flex-1">
      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/articles"
              className="inline-flex items-center text-primary mb-8"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Articles
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-muted-foreground">
                {formatDate(article?.createdAt ?? "")}
              </span>
              <span className="text-muted-foreground">
                {estimateReadTime(article?.content ?? "")} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article?.title}
            </h1>

            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}
            />

            {/* <CommentSection
              comments={post.comments}
              _count={post._count.comments}
              blogPostId={post.id}
              reFetch={refetch}
            /> */}
          </div>
        </div>
      </article>
    </main>
  );
};

export default ArticleDetails;
