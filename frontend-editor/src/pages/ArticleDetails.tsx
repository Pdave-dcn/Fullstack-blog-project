import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Trash2, Reply, Send } from "lucide-react";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "../components/ui/MessageLoading";
import { handleDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  parentId?: number;
  user: {
    name: string;
    username: string;
  };
  parent?: {
    id: number;
    user: {
      username: string;
      name: string;
    };
  };
  replies?: Comment[];
  _count?: {
    replies: number;
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
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [mainComment, setMainComment] = useState("");
  const { token } = useAuth();

  const {
    data: article,
    error: articleError,
    loading: articleLoading,
    refetch,
  } = useDataFetching<Article>(
    `${import.meta.env.VITE_API_BASE_URL}`,
    `/posts/${id}`
  );

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  const handleDeleteComment = async (commentId: number) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this comment?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (!res.ok) {
              const errorData = await res.json();
              console.error("Server error:", errorData.message);
              toast.error("Failed to delete comment", {
                description: errorData.message,
              });
              return;
            }

            toast.success(`Comment deleted successfully`);
            refetch();
          } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error", {
              description: "Could not connect to the server.",
            });
          }
        },
      },
    });
  };

  const handleReplySubmit = async (
    parentCommentId: number,
    articleId = article?.id
  ) => {
    if (!replyContent.trim()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: replyContent,
            parentId: parentCommentId,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
        toast.error("Failed to create reply", {
          description: errorData.message,
        });
        return;
      }

      setReplyContent("");
      setReplyingTo(null);
      refetch();
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Network error", {
        description: "Failed to post reply",
      });
    }
  };

  const handleMainCommentSubmit = async (articleId: number) => {
    if (!mainComment.trim()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: mainComment }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
        toast.error("Failed to create comment", {
          description: errorData.message,
        });
        return;
      }

      setMainComment("");
      refetch();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Network error", {
        description: "Failed to post comment",
      });
    }
  };

  const CommentCard = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
    <Card
      key={comment.id}
      className={`bg-background ${
        isReply ? "ml-8 border-l-4 border-l-blue-200" : ""
      }`}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between mb-2">
          <div>
            <h4 className="font-medium">{comment.user.name}</h4>
            <p className="text-xs text-muted-foreground">
              @{comment.user.username}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {handleDate(comment.createdAt)}
            </span>
            <div className="flex gap-1">
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className="h-8 w-8 p-0"
                  title="Reply to comment"
                >
                  <Reply className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComment(comment.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                title="Delete comment"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {isReply &&
          comment.parent &&
          comment.parentId !== comment.parent.id && (
            <p className="text-sm text-blue-600 mb-2">
              Replying to @{comment.parent.user.username}
            </p>
          )}

        <p className="mt-2">{comment.content}</p>

        {replyingTo === comment.id && !isReply && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium mb-2">
              Reply to {comment.user.name}
            </h5>
            <Textarea
              placeholder="Type your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleReplySubmit(comment.id)}
                disabled={!replyContent.trim()}
              >
                <Send className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="ml-8 border-l-2 border-l-accent-foreground"
              >
                <Card className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{reply.user.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          @{reply.user.username}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {handleDate(reply.createdAt)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(reply.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                          title="Delete reply"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {reply.parent && reply.parentId !== comment.id && (
                      <p className="text-sm text-blue-600 mb-2">
                        Replying to @{reply.parent.user.username}
                      </p>
                    )}

                    <p className="mt-2">{reply.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

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
            <div className="flex items-center text-sm text-muted-foreground">
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
            <CardContent className="prose prose-blue max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </CardContent>
        </Card>

        {/* Comments section */}
        <div className="mt-10 mb-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Comments ({article.comments.length})
            </h2>
          </div>

          <Separator className="mb-6" />

          {/* Main comment form */}
          <div className="mb-10">
            <h3 className="mb-5">Leave a comment</h3>
            <Textarea
              placeholder="Type your comment here..."
              value={mainComment}
              onChange={(e) => setMainComment(e.target.value)}
              className="mb-3"
            />
            <Button
              onClick={() => {
                handleMainCommentSubmit(article.id);
              }}
              disabled={!mainComment.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>

          {article.comments.length === 0 ? (
            <p className="text-center py-4">No comments yet</p>
          ) : (
            <div className="space-y-6">
              {article.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
