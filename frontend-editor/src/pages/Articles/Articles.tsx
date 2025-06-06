import { useState } from "react";
import { MoreVertical, Edit, Trash2, Eye, Send, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "../../components/ui/MessageLoading";
import {
  handleApiResponseError,
  handleDate,
  handleNetworkError,
} from "@/lib/utils";
import Toolbar from "./Toolbar";
import { useAuth } from "@/hooks/use-auth";

export interface Article {
  id: number;
  title: string;
  status: "published" | "draft";
  createdAt: string;
  comments: string[];
}

const Articles = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useAuth();

  const {
    data: articles,
    error: articleError,
    loading: articleLoading,
    refetch,
  } = useDataFetching<Article[]>(
    `${import.meta.env.VITE_API_BASE_URL}`,
    "/posts"
  );

  const filteredArticles = articles?.filter((article) => {
    const matchesFilter = filter === "all" || article.status === filter;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteArticle = (articleId: number) => {
    toast.warning("Delete Comment", {
      description: "Are you sure you want to delete this article?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/posts/${articleId}`,
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
              handleApiResponseError(res, "Failed to delete article");
            }

            toast.success(`Article deleted successfully`);
            refetch();
          } catch (error) {
            handleNetworkError(error);
          }
        },
      },
    });
  };

  const handlePublishStatus = async (
    articleId: number,
    newStatus: "published" | "draft"
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${articleId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        handleApiResponseError(
          res,
          `Failed to ${
            newStatus === "published" ? "publish" : "unpublish"
          } article`
        );
      }

      toast.success(
        `Article ${
          newStatus === "published" ? "published" : "unpublished"
        } successfully`
      );
      refetch();
    } catch (error) {
      handleNetworkError(error);
    }
  };

  if (articleLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (articleError) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <p>A network error was encountered</p>
      </div>
    );
  }

  return (
    <div title="Articles">
      <Toolbar
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        articles={articles}
        filteredArticles={filteredArticles}
      />

      <div className="bg-background rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader className="pointer-events-none bg-accent">
            <TableRow>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No articles found{searchQuery && ` matching "${searchQuery}"`}
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles?.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        article.status === "published"
                          ? "bg-primary text-secondary"
                          : "bg-accent text-foreground"
                      }`}
                    >
                      {article.status === "published" ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>{handleDate(article.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    {article.comments.length}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/articles/${article.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/articles/${article.id}/edit`}
                            className="flex items-center cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handlePublishStatus(
                              article.id,
                              article.status === "draft" ? "published" : "draft"
                            )
                          }
                        >
                          {article.status === "draft" ? (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              <span>Publish</span>
                            </>
                          ) : (
                            <>
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Unpublish</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteArticle(article.id)}
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

export default Articles;
