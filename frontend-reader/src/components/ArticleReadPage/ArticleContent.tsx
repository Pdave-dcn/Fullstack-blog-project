import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import estimateReadTime from "@/utils/estimatedReadTime";
import { formatDate } from "@/utils/formatDate";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  commentsCount: number;
}

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <article>
      <Link
        to="/articles"
        className="inline-flex items-center text-primary mb-8"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Articles
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-muted-foreground">
          {formatDate(article.createdAt)}
        </span>
        <span className="text-muted-foreground">
          {estimateReadTime(article.content)} min read
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {article.title}
      </h1>

      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({article.commentsCount})
        </h2>
      </div>
    </article>
  );
};
