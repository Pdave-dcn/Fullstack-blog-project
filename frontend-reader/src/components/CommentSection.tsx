import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Lock, User } from "lucide-react";
import AuthModal from "./AuthModal";

interface User {
  name: string;
  email: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
  postId: string;
}

const user: User = { name: "John Doe", email: "jdoe@gmail.com" };

const comments: Comment[] = [
  {
    id: "1",
    author: "John Doe",
    content:
      "Great article! I've been using these techniques in my projects and they've made a huge difference in performance.",
    publishedAt: "2024-01-16",
    postId: "1",
  },
  {
    id: "2",
    author: "Jane Smith",
    content:
      "Thanks for the comprehensive guide. The section on AI integration was particularly insightful.",
    publishedAt: "2024-01-16",
    postId: "1",
  },
  {
    id: "3",
    author: "Alex Johnson",
    content:
      "React.memo has been a game-changer for my apps. Thanks for explaining it so clearly!",
    publishedAt: "2024-01-13",
    postId: "2",
  },
];

const CommentSection = () => {
  const [commentText, setCommentText] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isLoading = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Comment Form Section */}
      <Card className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <MessageSquare className="text-blue-600" size={24} />
            <span>Join the Discussion</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar className="ring-2 ring-blue-100">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    Commenting as{" "}
                    <span className="text-blue-600">{user.name}</span>
                  </p>
                  <Textarea
                    placeholder="Share your thoughts on this article..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    className="bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  // disabled={addCommentMutation.isPending || !commentText.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                >
                  {/* {addCommentMutation.isPending ? "Posting..." : "Post Comment"} */}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Lock className="text-blue-600" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sign in to join the conversation
                </h3>
                <p className="text-gray-600 mb-6">
                  Create an account or sign in to share your thoughts and engage
                  with the community.
                </p>
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Sign In to Comment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <MessageSquare className="text-blue-600" size={28} />
          <span>Comments ({comments.length})</span>
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="animate-pulse space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-4 rounded-full">
                  <MessageSquare className="text-gray-500" size={32} />
                </div>
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card
                key={comment.id}
                className="bg-white hover:shadow-md transition-shadow duration-200 border border-gray-100"
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
                        <h4 className="font-semibold text-gray-900">
                          {comment.author}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.publishedAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
