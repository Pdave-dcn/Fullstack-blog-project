import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Lock } from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/hooks/use-auth";
import { useComments } from "@/hooks/use-comments";
import { useCommentForm } from "@/hooks/use-commentForms";
import { CommentForm } from "./CommentForm";
import { Comment } from "./Comment";
import type { BlogComment } from "@/types/comment";

const UI_TEXT = {
  JOIN_DISCUSSION: "Join the Discussion",
  SIGN_IN_TO_COMMENT: "Sign In to Comment",
  SIGN_IN_MESSAGE:
    "Create an account or sign in to share your thoughts and engage with the community.",
  NO_COMMENTS: "No comments yet. Be the first to share your thoughts!",
};

interface CommentSectionParams {
  comments: BlogComment[];
  _count: number;
  blogPostId: string;
  reFetch: () => void;
}

const CommentSection: React.FC<CommentSectionParams> = ({
  comments,
  _count,
  blogPostId,
  reFetch,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { user, isLoading, token } = useAuth();
  const { createComment, deleteComment, editComment } = useComments(
    blogPostId,
    token
  );
  const commentForm = useCommentForm();

  const organizedComments = useMemo(() => {
    const commentMap = new Map<
      number,
      BlogComment & { replies: BlogComment[] }
    >();
    const topLevelComments: (BlogComment & { replies: BlogComment[] })[] = [];

    // First pass: create a map of all comments with empty replies arrays
    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize comments into parent-child relationships
    comments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;

      if (comment.parentId && commentMap.has(comment.parentId)) {
        // This is a reply, add it to its parent's replies
        const parent = commentMap.get(comment.parentId)!;
        parent.replies.push(commentWithReplies);
      } else {
        // This is a top-level comment
        topLevelComments.push(commentWithReplies);
      }
    });

    // Sort replies by creation date (ascending - oldest first)
    commentMap.forEach((comment) => {
      comment.replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

    // Sort top-level comments by creation date (descending - newest first)
    topLevelComments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return topLevelComments;
  }, [comments]);

  const handleCommentSubmit = async () => {
    await commentForm.handleSubmit((content) => createComment(content));
    reFetch();
  };

  const handleReplySubmit = async (
    parentId: number,
    content: string
  ): Promise<boolean> => {
    try {
      const success = await createComment(content, parentId);
      if (success) {
        await reFetch();
        setReplyingTo(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to create reply:", error);
      return false;
    }
  };

  const handleEditSubmit = async (
    commentId: number,
    content: string
  ): Promise<boolean> => {
    try {
      const success = await editComment(commentId, content);
      if (success) {
        reFetch();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to edit comment:", error);
      return false;
    }
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    try {
      await deleteComment(commentId);
      reFetch();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      {/* Comment Form Section */}
      <Card className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-lg sm:text-xl">
            <MessageSquare className="text-blue-600 shrink-0" size={24} />
            <span className="break-words">{UI_TEXT.JOIN_DISCUSSION}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {user ? (
            <CommentForm
              content={commentForm.content}
              onContentChange={commentForm.setContent}
              onSubmit={handleCommentSubmit}
              isSubmitting={commentForm.isSubmitting}
            />
          ) : (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
                  <Lock className="text-blue-600" size={28} />
                </div>
              </div>
              <div className="px-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sign in to join the conversation
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                  {UI_TEXT.SIGN_IN_MESSAGE}
                </p>
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 sm:px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] w-full sm:w-auto"
                >
                  <span className="text-sm sm:text-base">
                    {UI_TEXT.SIGN_IN_TO_COMMENT}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 px-1">
          <MessageSquare className="text-blue-600 shrink-0" size={28} />
          <span className="break-words">Comments ({_count})</span>
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white shadow-sm">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                  <div className="animate-pulse space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 min-w-[60px]"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full sm:w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 sm:w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : organizedComments.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8 text-center px-4 sm:px-6">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-3 sm:p-4 rounded-full">
                  <MessageSquare className="text-gray-500" size={28} />
                </div>
              </div>
              <p className="text-gray-500 text-base sm:text-lg font-medium px-4">
                {UI_TEXT.NO_COMMENTS}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {organizedComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onEdit={handleEditSubmit}
                onDelete={handleDeleteComment}
                onReply={handleReplySubmit}
                replyingTo={replyingTo}
                editingCommentId={editingCommentId}
                onSetReplyingTo={setReplyingTo}
                onSetEditingCommentId={setEditingCommentId}
              />
            ))}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default CommentSection;
