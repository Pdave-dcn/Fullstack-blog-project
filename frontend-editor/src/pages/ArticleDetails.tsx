import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "../components/ui/MessageLoading";
import { handleDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    name: string;
    username: string;
  };
}

interface Article {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft";
  createdAt: string;
  comments: Comment[];
}

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: article,
    error: articleError,
    loading: articleLoading,
  } = useDataFetching<Article>("http://localhost:3000/api", `/posts/${id}`);

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  if (articleLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (!article) {
    return (
      <div title="Article Not Found">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-gray-700">
            Article not found
          </h2>
          <p className="text-gray-500 mt-2">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => handleNavigation("articles")}
          >
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  if (articleError) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <p>A network error was encountered</p>
      </div>
    );
  }

  return (
    <div title={article.title}>
      <div className="max-w-4xl mx-auto">
        {/* Article header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {article?.title}
          </h1>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mx-2">•</span>
              <span>{handleDate(article.createdAt)}</span>
            </div>
            <Badge
              variant={article.status === "published" ? "default" : "outline"}
            >
              {article.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>

        {/* Article content */}
        <Card className="mb-8">
          <CardContent className="prose prose-blue max-w-none pt-6">
            {article.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Comments section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Comments ({article.comments.length})
            </h2>
          </div>

          <Separator className="mb-6" />

          {article.comments.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No comments yet</p>
          ) : (
            <div className="space-y-6">
              {article.comments.map((comment) => (
                <Card key={comment.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{comment.user.name}</h4>
                        <p className="text-xs text-gray-500">
                          @{comment.user.username}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {handleDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
