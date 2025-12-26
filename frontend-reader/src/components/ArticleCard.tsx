import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import estimateReadTime from "@/utils/estimatedReadTime";
import type { Article } from "@/zodSchemas/article.zod";
import { formatDate } from "@/utils/formatDate";
import { getExcerpt } from "@/utils/getExcerpt";
import { Doodle } from "./ui/doodle";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link to={`/articles/${article.id}`} className="block group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium border">
              Article
            </span>
            <span>{formatDate(article.createdAt)}</span>
          </div>

          <div className="flex justify-center items-center py-3">
            {/* Mobile */}
            <div className="md:hidden">
              <Doodle size={300} />
            </div>
            {/* Tablet */}
            <div className="hidden md:block lg:hidden">
              <Doodle size={310} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:block">
              <Doodle size={350} />
            </div>
          </div>

          <CardTitle className="text-lg font-bold leading-tight mb-3 line-clamp-1">
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

export default ArticleCard;
