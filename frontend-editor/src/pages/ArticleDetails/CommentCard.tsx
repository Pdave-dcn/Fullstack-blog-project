import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { handleDate } from "@/lib/utils";
import { Trash2, Send, Reply } from "lucide-react";
import { type Comment } from "./ArticleDetails";

interface CommentCard {
  comment: Comment;
  isReply?: boolean;
  replyingTo: number | null;
  setReplyingTo: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteComment: (commentId: number) => void;
  replyContent: string;
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
  handleReplySubmit: (
    parentCommentId: number,
    articleId?: number | undefined
  ) => void;
}

const CommentCard = ({
  comment,
  isReply = false,
  replyingTo,
  setReplyingTo,
  handleDeleteComment,
  replyContent,
  setReplyContent,
  handleReplySubmit,
}: CommentCard) => (
  <Card
    key={comment.id}
    className={`bg-background ${isReply ? "ml-8 border-l-4" : ""}`}
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
              className="h-8 w-8 p-0 hover:text-primary"
              title="Delete comment"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isReply && comment.parent && comment.parentId !== comment.parent.id && (
        <p className="text-sm mb-2">
          Replying to @{comment.parent.user.username}
        </p>
      )}

      <p className="mt-2">{comment.content}</p>

      {replyingTo === comment.id && !isReply && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
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
                        className="h-8 w-8 p-0 hover:text-primary"
                        title="Delete reply"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {reply.parent && reply.parentId !== comment.id && (
                    <p className="text-sm text-primary mb-2">
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

export default CommentCard;
