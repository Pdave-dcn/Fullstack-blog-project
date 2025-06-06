import React from "react";
import { Button } from "@/components/ui/button";
import { Reply, Trash2, Pencil } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import type { BlogComment } from "@/types/comment";

interface CommentActionsProps {
  comment: BlogComment;
  onEdit: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onReply: (commentId: number) => void;
  showReply?: boolean;
}

export const CommentActions: React.FC<CommentActionsProps> = ({
  comment,
  onEdit,
  onDelete,
  onReply,
}) => {
  const { user } = useAuth();
  const isOwner = user && comment.user.username === user?.username;
  const canReply = !!user;

  if (!user) return null;

  return (
    <div className="flex gap-3 items-center">
      {canReply && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReply(comment.id)}
          className="h-8 w-8 p-0 hover:text-primary"
          title="Reply"
        >
          <Reply className="h-4 w-4" />
        </Button>
      )}

      {isOwner && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(comment.id)}
            className="h-8 w-8 p-0 hover:text-primary"
            title="Edit comment"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(comment.id)}
            className="h-8 w-8 p-0 hover:text-primary"
            title="Delete comment"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
