import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentActions } from "./CommentActions";
import { CommentForm } from "./CommentForm";
import { useCommentForm } from "@/hooks/use-commentForms";
import { useAuth } from "@/hooks/use-auth";
import { AvatarImage } from "@radix-ui/react-avatar";
import { type BlogComment } from "../types/comment";

interface CommentProps {
  comment: BlogComment;
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
  const {
    user,
    getInitials,
    getUserIdentifier,
    generateAvatarColor,
    generateAvatarUrl,
  } = useAuth();

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
      className={
        isReply
          ? "ml-4 sm:ml-6 md:ml-8 border-l-2 border-l-accent-foreground pl-2 sm:pl-4"
          : ""
      }
    >
      <Card
        className={`${
          isReply ? "bg-background" : "bg-white hover:shadow-md"
        } transition-shadow duration-200 border border-gray-100 w-full`}
      >
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 md:px-6">
          <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
            <Avatar className="ring-2 ring-gray-100 shrink-0 w-8 h-8 sm:w-10 sm:h-10">
              {comment.user.username === user?.username ? (
                <>
                  <AvatarImage
                    src={generateAvatarUrl(user)}
                    alt={user.name || "User avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={`bg-gradient-to-br ${generateAvatarColor(
                      getUserIdentifier(user)
                    )} text-white font-semibold text-xs sm:text-sm`}
                  >
                    {getInitials(user.name)}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="bg-blue-500 text-white font-semibold text-xs sm:text-sm">
                  {getInitials(comment.user.name)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:gap-3 sm:items-center space-y-1 sm:space-y-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {comment.user.username}
                  </h4>
                  <span className="text-xs sm:text-sm text-gray-500 shrink-0">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <div className="shrink-0">
                  <CommentActions
                    comment={comment}
                    onEdit={handleEditClick}
                    onDelete={onDelete}
                    onReply={handleReplyClick}
                  />
                </div>
              </div>

              {comment.parent && comment.parentId !== comment.id && isReply && (
                <p className="text-xs sm:text-sm text-primary mb-2 truncate">
                  Reply to @{comment.parent.user.username}
                </p>
              )}

              {editingCommentId === comment.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={editForm.content}
                    onChange={(e) => editForm.setContent(e.target.value)}
                    className="bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                    rows={3}
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      onClick={handleEditSubmit}
                      disabled={
                        editForm.isSubmitting || !editForm.content.trim()
                      }
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      disabled={editForm.isSubmitting}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
                    {comment.content}
                  </p>
                </div>
              )}

              {replyingTo === comment.id && user && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-lg">
                  <h5 className="text-xs sm:text-sm font-medium mb-2 truncate">
                    Replying to {comment.user.username}
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
                <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
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
