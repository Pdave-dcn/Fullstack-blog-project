// components/CommentForm.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const UI_TEXT = {
  PLACEHOLDER_COMMENT: "Share your thoughts on this article...",
  POSTING: "Posting...",
  POST_COMMENT: "Post Comment",
  COMMENTING_AS: "Commenting as",
};

interface CommentFormProps {
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  placeholder?: string;
  buttonText?: string;
  isSubmitting?: boolean;
  showCancel?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  content,
  onContentChange,
  onSubmit,
  onCancel,
  placeholder = UI_TEXT.PLACEHOLDER_COMMENT,
  buttonText = UI_TEXT.POST_COMMENT,
  isSubmitting = false,
  showCancel = false,
}) => {
  const { user } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar className="ring-2 ring-blue-100">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          {!showCancel && (
            <p className="text-sm font-medium text-gray-700">
              {UI_TEXT.COMMENTING_AS}{" "}
              <span className="text-blue-600">{user?.username}</span>
            </p>
          )}
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={4}
            className="bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {showCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
        >
          {showCancel ? <Send className="h-4 w-4 mr-1" /> : null}
          {isSubmitting ? UI_TEXT.POSTING : buttonText}
        </Button>
      </div>
    </form>
  );
};
