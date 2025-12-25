import { Trash2, MoreVertical, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { useCommentsForAuthorQuery } from "@/queries/comment.query";
import { useDeleteCommentMutation } from "@/queries/comment.query";
import { CommentsPageSkeleton } from "@/components/CommentsPage/CommentsPageSkeleton";
import { CommentsPageError } from "@/components/CommentsPage/CommentsPageError";

const Comments = () => {
  const navigate = useNavigate();

  const {
    comments,
    pagination,
    isLoading,
    isError,
    page,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    refetch,
  } = useCommentsForAuthorQuery({ pageSize: 10 });

  const { mutate: deleteComment } = useDeleteCommentMutation();

  const handleDeleteComment = (commentId: string) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this comment?",
      action: {
        label: "Delete",
        onClick: () => {
          deleteComment(commentId, {
            onSuccess: () => {
              toast.success("Comment deleted successfully");
              refetch();
            },
            onError: (error) => {
              toast.error("Failed to delete comment", {
                description:
                  error instanceof Error
                    ? error.message
                    : "Something went wrong",
              });
            },
          });
        },
      },
    });
  };

  const handleViewComment = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  if (isLoading) return <CommentsPageSkeleton />;

  if (isError) return <CommentsPageError refetch={refetch} />;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-background rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader className="pointer-events-none bg-muted">
            <TableRow>
              <TableHead className="w-[200px]">Author</TableHead>
              <TableHead className="w-[250px]">Article</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!comments || comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-primary dark:text-accent">
                        @{comment.author.username}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-muted-foreground">
                      {comment.article.title}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="text-foreground line-clamp-2 overflow-hidden break-words">
                      {comment.content}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewComment(comment.article.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {pagination && (
          <div className="flex justify-between items-center p-4">
            <Button
              onClick={goToPreviousPage}
              disabled={!hasPreviousPage}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {pagination.totalPages}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={!hasNextPage}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
