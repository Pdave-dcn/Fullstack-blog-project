import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import estimateReadTime from "@/utils/estimatedReadTime";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface LatestArticleCardProps {
  post: BlogPost;
}

const LatestArticleCard = ({ post }: LatestArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    let plainText = content.replace(/<[^>]*>/g, "").replace(/[#*`]/g, "");

    const entityMap: { [key: string]: string } = {
      "&nbsp;": " ",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&hellip;": "...",
      "&mdash;": "—",
      "&ndash;": "–",
    };

    plainText = plainText.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
      return entityMap[match] || match;
    });

    plainText = plainText.replace(/\s+/g, " ").trim();

    if (plainText.length <= maxLength) return plainText;

    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.substring(0, lastSpace) + "...";
  };

  return (
    <Link to={`/articles/${post.id}`} className="block group">
      <Card className="h-full transition-all duration-300 transform group-hover:-translate-y-1 rounded-xl">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium border">
              Article
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <CardTitle className="text-lg text-pretty font-bold leading-tight mb-3 line-clamp-2">
            {post.title}
          </CardTitle>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {getExcerpt(post.content)}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>TextNode</span>
            <span className="flex items-center">
              {estimateReadTime(post.content)} min read
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default LatestArticleCard;
