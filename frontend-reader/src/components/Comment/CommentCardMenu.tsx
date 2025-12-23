import type React from "react";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCommentMutation } from "@/queries/comment.query";
import type { Comment, Reply } from "@/zodSchemas/comment.zod";
import { useAbility } from "@/store/auth.store";
import { useCommentStore } from "@/store/comment.store";

interface CommentCardMenuProps {
  comment: Comment | Reply;
}

const CommentCardMenu = ({ comment }: CommentCardMenuProps) => {
  const ability = useAbility();
  const toggleEditMode = useCommentStore((s) => s.toggleEditMode);
  const deleteCommentMutation = useDeleteCommentMutation(comment.id);

  const canUpdate = ability.can("update", {
    __type: "Comment" as const,
    id: comment.id,
    authorId: comment.authorId,
  });

  const canDelete = ability.can("delete", {
    __type: "Comment" as const,
    id: comment.id,
    authorId: comment.authorId,
  });

  if (!canUpdate && !canDelete) {
    return null;
  }

  const handleDeleteComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCommentMutation.mutate();
  };

  const handleEditComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleEditMode(comment.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {canUpdate && (
          <DropdownMenuItem onClick={(e) => handleEditComment(e)}>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>
        )}

        {canUpdate && canDelete && <DropdownMenuSeparator />}

        {canDelete && (
          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => handleDeleteComment(e)}
          >
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentCardMenu;
