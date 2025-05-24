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

const Comments = () => {
  const { token } = useAuth();
  const {
    data: comments,
    error: commentError,
    loading: commentLoading,
    refetch,
  } = useDataFetching<Comment[]>("http://localhost:3000/api", "/comments");
  const navigate = useNavigate();

  const handleDeleteComment = (commentId: number) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this comment?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/comments/${commentId}`,
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
              const errorData = await res.json();
              console.error("Server error:", errorData.message);
              toast.error("Failed to delete comment", {
                description: errorData.message,
              });
              return;
            }

            toast.success(`Comment deleted successfully`);
            refetch();
          } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error", {
              description: "Could not connect to the server.",
            });
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

  if (commentLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (commentError) {
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
                  <TableCell>
                    <p className="text-foreground line-clamp-2">
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
      </div>
    </div>
  );
};

export default Comments;
