import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { getInitials } from "@/utils/getInitials";
import type { Comment } from "@/zodSchemas/comment.zod";

interface CommentAuthorProps {
  author: Comment["author"];
  createdAt: string;
}

const CommentAuthor = ({ author, createdAt }: CommentAuthorProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={""} alt={author.username} />
        <AvatarFallback className="text-xs">
          {getInitials(author.username)}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center space-x-2">
        <span className="font-medium text-sm">{author.username}</span>
        <span className="text-xs text-muted-foreground">
          {formatTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CommentAuthor;
