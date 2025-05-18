import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";

interface Comment {
  id: number;
  content: string;
  articleTitle: string;
  articleId: number;
  author: {
    name: string;
    username: string;
  };
  createdAt: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: "This is a great article! Very informative and well written.",
      articleTitle: "How to Build a Better Blog",
      articleId: 1,
      author: {
        name: "John Doe",
        username: "@johndoe",
      },
      createdAt: "2025-05-12T10:00:00",
    },
    {
      id: 2,
      content: "Thanks for sharing these SEO tips. They're really helpful!",
      articleTitle: "SEO Tips for Content Writers",
      articleId: 2,
      author: {
        name: "Jane Smith",
        username: "@janesmith",
      },
      createdAt: "2025-05-10T15:30:00",
    },
  ]);

  const handleDeleteComment = (commentId: number) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this comment?",
      action: {
        label: "Delete",
        onClick: () => {
          setComments(comments.filter((comment) => comment.id !== commentId));
          toast.success("Comment deleted successfully");
        },
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm">{comment.author.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {comment.author.username}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                On article:{" "}
                <span className="font-medium text-foreground">
                  {comment.articleTitle}
                </span>
              </p>
              <p className="text-sm">{comment.content}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No comments found.</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
