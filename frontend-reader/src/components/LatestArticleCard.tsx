import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import estimateReadTime from "@/utils/estimatedReadTime";
import type { Article } from "@/zodSchemas/article.zod";
import { formatDate } from "@/utils/formatDate";
import { getExcerpt } from "@/utils/getExcerpt";

interface LatestArticleCardProps {
  article: Article;
}

const LatestArticleCard = ({ article }: LatestArticleCardProps) => {
  return (
    <Link to={`/articles/${article.id}`} className="block group">
      <Card className="h-full transition-all duration-300 transform group-hover:-translate-y-1 rounded-xl">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium border">
              Article
            </span>
            <span>{formatDate(article.createdAt)}</span>
          </div>

          <CardTitle className="text-lg text-pretty font-bold leading-tight mb-3 line-clamp-2">
            {article.title}
          </CardTitle>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {getExcerpt(article.content)}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>TextNode</span>
            <span className="flex items-center">
              {estimateReadTime(article.content)} min read
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default LatestArticleCard;
