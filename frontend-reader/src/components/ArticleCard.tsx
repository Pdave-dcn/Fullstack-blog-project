import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

const ArticleCard = ({ post, featured = false }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (featured) {
    return (
      <Link to={`/article/${post.id}`} className="block group">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
          {post.imageUrl && (
            <div className="h-48 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {post.title}
            </CardTitle>
            <CardDescription className="text-base">
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{post.readTime} min read</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${post.id}`} className="block group">
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <CardTitle className="group-hover:text-blue-600 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription>{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>{post.readTime} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
