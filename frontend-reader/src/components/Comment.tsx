// components/Comment.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { CommentActions } from "./CommentActions";
import { CommentForm } from "./CommentForm";
import { useCommentForm } from "@/hooks/use-commentForms";
import { useAuth } from "@/hooks/use-auth";

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

interface CommentProps {
  comment: Comment;
  onEdit: (commentId: number, content: string) => Promise<boolean>;
  onDelete: (commentId: number) => Promise<void>;
  onReply: (parentId: number, content: string) => Promise<boolean>;
  isReply?: boolean;
  replyingTo: number | null;
  editingCommentId: number | null;
  onSetReplyingTo: (commentId: number | null) => void;
  onSetEditingCommentId: (commentId: number | null) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onEdit,
  onDelete,
  onReply,
  isReply = false,
  replyingTo,
  editingCommentId,
  onSetReplyingTo,
  onSetEditingCommentId,
}) => {
  const { user } = useAuth();
  const replyForm = useCommentForm();
  const editForm = useCommentForm();

  React.useEffect(() => {
    if (editingCommentId === comment.id) {
      editForm.setContent(comment.content);
    }
  }, [editingCommentId, comment.id, comment.content]);

  const handleReplySubmit = async () => {
    const success = await onReply(comment.id, replyForm.content);
    if (success) {
      replyForm.resetForm();
      onSetReplyingTo(null);
    }
  };

  const handleEditSubmit = async () => {
    const success = await onEdit(comment.id, editForm.content);
    if (success) {
      editForm.resetForm();
      onSetEditingCommentId(null);
    }
  };

  const handleReplyClick = (commentId: number) => {
    onSetReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleEditClick = (commentId: number) => {
    onSetEditingCommentId(editingCommentId === commentId ? null : commentId);
  };

  const handleCancelReply = () => {
    replyForm.resetForm();
    onSetReplyingTo(null);
  };

  const handleCancelEdit = () => {
    editForm.resetForm();
    onSetEditingCommentId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={isReply ? "ml-8 border-l-2 border-l-accent-foreground" : ""}
    >
      <Card
        className={`${
          isReply ? "bg-background" : "bg-white hover:shadow-md"
        } transition-shadow duration-200 border border-gray-100`}
      >
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar className="ring-2 ring-gray-100">
              <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center">
                  <h4 className="font-semibold text-gray-900">
                    {comment.user.username}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <CommentActions
                  comment={comment}
                  onEdit={handleEditClick}
                  onDelete={onDelete}
                  onReply={handleReplyClick}
                  showReply={!isReply}
                />
              </div>

              {comment.parent && comment.parentId !== comment.id && isReply && (
                <p className="text-sm text-primary mb-2">
                  Replying to @{comment.parent.user.username}
                </p>
              )}

              {editingCommentId === comment.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={editForm.content}
                    onChange={(e) => editForm.setContent(e.target.value)}
                    className="bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleEditSubmit}
                      disabled={
                        editForm.isSubmitting || !editForm.content.trim()
                      }
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      disabled={editForm.isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
              )}

              {replyingTo === comment.id && user && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h5 className="text-sm font-medium mb-2">
                    Reply to {comment.user.username}
                  </h5>
                  <CommentForm
                    content={replyForm.content}
                    onContentChange={replyForm.setContent}
                    onSubmit={handleReplySubmit}
                    onCancel={handleCancelReply}
                    placeholder="Type your reply here..."
                    buttonText="Reply"
                    isSubmitting={replyForm.isSubmitting}
                    showCancel={true}
                  />
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onReply={onReply}
                      isReply={true}
                      replyingTo={replyingTo}
                      editingCommentId={editingCommentId}
                      onSetReplyingTo={onSetReplyingTo}
                      onSetEditingCommentId={onSetEditingCommentId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
