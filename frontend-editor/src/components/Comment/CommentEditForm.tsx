import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";

import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEditCommentMutation } from "@/queries/comment.query";
import type { CommentEditData } from "@/api/comment.api";

interface CommentEditFormProps {
  commentId: string;
  articleId: string;
  initialContent: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const MAX_LENGTH = 780;

const CommentEditForm = ({
  commentId,
  articleId,
  initialContent,
  onCancel,
  onSuccess,
}: CommentEditFormProps) => {
  const { register, handleSubmit, watch, reset } = useForm<CommentEditData>({
    defaultValues: {
      content: initialContent,
      articleId,
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const content = watch("content") ?? "";

  const editMutation = useEditCommentMutation();

  const onSubmit = (data: CommentEditData) => {
    editMutation.mutate(
      { commentId, data },
      {
        onSuccess: () => {
          onSuccess?.();
          reset();
        },
      }
    );
  };

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [content]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
    // Move cursor to end
    const length = textareaRef.current?.value.length || 0;
    textareaRef.current?.setSelectionRange(length, length);
  }, []);

  const isDisabled =
    content.trim().length === 0 ||
    content.length > MAX_LENGTH ||
    content === initialContent;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-3">
        <div className="flex justify-center items-center">
          <div className="relative w-full">
            <textarea
              {...register("content")}
              ref={(e) => {
                register("content").ref(e);
                textareaRef.current = e;
              }}
              className="
                w-full
                min-h-[50px]
                resize-none
                overflow-hidden
                border-b-2 border-b-muted-foreground
                focus:outline-none focus:ring-0 focus:border-b-muted-foreground
                bg-muted/30
                px-2
                py-1
              "
            />

            <div className="absolute right-0 -bottom-2.5 text-right text-xs text-muted-foreground">
              <span
                className={content.length > MAX_LENGTH ? "text-red-500" : ""}
              >
                {content.length}
              </span>
              /{MAX_LENGTH}
            </div>
          </div>

          <div className="flex gap-2 px-5">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={onCancel}
              disabled={editMutation.isPending}
            >
              <X className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              type="submit"
              disabled={isDisabled || editMutation.isPending}
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentEditForm;
