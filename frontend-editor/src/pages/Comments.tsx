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
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "../components/ui/MessageLoading";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { handleApiResponseError, handleNetworkError } from "@/lib/utils";
import { useState } from "react";

interface Comment {
  id: number;
  content: string;
  post: {
    id: number;
    title: string;
  };
  user: {
    name: string;
    username: string;
  };
  createdAt: string;
}

interface ResponseData {
  data: Comment[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const Comments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { token } = useAuth();
  const {
    data: responseData,
    error,
    loading,
    refetch,
  } = useDataFetching<ResponseData>(
    `${import.meta.env.VITE_API_BASE_URL}`,
    `/comments?page=${currentPage}&pageSize=${itemsPerPage}`
  );

  const comments = responseData?.data || [];
  const pagination = responseData?.pagination;

  const navigate = useNavigate();

  const handleDeleteComment = (commentId: number) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this comment?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (!res.ok) {
              handleApiResponseError(res, "Failed to delete comment");
            }

            toast.success(`Comment deleted successfully`);
            refetch();
          } catch (error) {
            handleNetworkError(error);
          }
        },
      },
    });
  };

  const handleViewComment = (id: number) => {
    navigate(`/articles/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <p>A network error was encountered</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-background rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader className="pointer-events-none bg-accent">
            <TableRow>
              <TableHead className="w-[200px]">Author</TableHead>
              <TableHead className="w-[250px]">Article</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              comments?.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        @{comment.user.username}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-muted-foreground">
                      {comment.post.title}
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
                          onClick={() => handleViewComment(comment.post.id)}
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
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={pagination.currentPage <= 1}
            >
              Previous
            </Button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(pagination.totalPages, prev + 1)
                )
              }
              disabled={pagination.currentPage >= pagination.totalPages}
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
