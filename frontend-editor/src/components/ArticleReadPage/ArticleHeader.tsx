import { formatDate } from "@/utils/formatDate";
import { Badge } from "../ui/badge";
import type { ArticleDetails } from "@/zodSchemas/article.zod";
import { Calendar } from "lucide-react";

interface ArticleHeaderProps {
  article: Pick<ArticleDetails, "status" | "title" | "createdAt">;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  return (
    <header className="mb-10 pb-8 border-b">
      <div className="space-y-4">
        {/* Status badge */}
        <Badge
          variant={article.status === "PUBLISHED" ? "default" : "outline"}
          className="text-xs font-medium"
        >
          {article.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
        </Badge>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={article.createdAt}>
            {formatDate(article.createdAt)}
          </time>
        </div>
      </div>
    </header>
  );
};
