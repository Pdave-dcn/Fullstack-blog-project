import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send } from "lucide-react";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "../../components/ui/MessageLoading";
import {
  handleApiResponseError,
  handleDate,
  handleNetworkError,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import CommentCard from "./CommentCard";
import { useMemo } from "react";

export interface Comment {
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
  _count: {
    comments: number;
  };
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
              handleApiResponseError(res, "Failed to delete comment");
            }

            toast.success(`Comment deleted successfully`);
            refetch();
          } catch (error) {
            handleNetworkError(error);
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
        handleApiResponseError(res, "Failed to create reply");
      }

      setReplyContent("");
      setReplyingTo(null);
      refetch();
    } catch (error) {
      handleNetworkError(error);
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
        handleApiResponseError(res, "Failed to create comment");
      }

      setMainComment("");
      refetch();
    } catch (error) {
      handleNetworkError(error);
    }
  };

  // Organizes flat comment array into hierarchical structure with nested replies
  // Top-level comments sorted newest first, replies sorted oldest first
  const organizedComments = useMemo(() => {
    const commentMap = new Map<number, Comment & { replies: Comment[] }>();
    const topLevelComments: (Comment & { replies: Comment[] })[] = [];

    article?.comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    article?.comments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;

      if (comment.parentId && commentMap.has(comment.parentId)) {
        const parent = commentMap.get(comment.parentId)!;
        parent.replies.push(commentWithReplies);
      } else {
        topLevelComments.push(commentWithReplies);
      }
    });

    commentMap.forEach((comment) => {
      comment.replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

    topLevelComments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return topLevelComments;
  }, [article?.comments]);

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
              Comments ({article._count.comments})
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

          {organizedComments.length === 0 ? (
            <p className="text-center py-4">No comments yet</p>
          ) : (
            <div className="space-y-6">
              {organizedComments.map((comment) => (
                <CommentCard
                  key={comment.user.username}
                  comment={comment}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  handleDeleteComment={handleDeleteComment}
                  handleReplySubmit={handleReplySubmit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
