import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard = ({ post }: ArticleCardProps) => {
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

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <Link to={`/article/${post.id}`} className="block group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
              Article
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <CardTitle className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
            {post.title}
          </CardTitle>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {getExcerpt(post.content)}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>BlogReader</span>
            <span className="flex items-center">
              {estimateReadTime(post.content)} min read
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ArticleCard;
