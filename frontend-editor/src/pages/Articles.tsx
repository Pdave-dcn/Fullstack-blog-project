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
import { handleDate } from "@/lib/utils";
import Toolbar from "../components/ArticlesPage/Toolbar";
import { useArticles } from "@/hooks/useArticles";
import ArticlesSkeleton from "@/components/ArticlesPage/ArticlesSkeleton";
import { ArticlesError } from "@/components/ArticlesPage/ArticlesError";

const Articles = () => {
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    articles,
    isLoading,
    isError,
    refetch,
    handleDeleteArticle,
    handlePublishStatus,
  } = useArticles();

  if (isLoading) {
    return (
      <div title="Articles">
        <div className="mb-6">
          <div className="h-16 w-full bg-accent rounded-lg animate-pulse" />
        </div>
        <ArticlesSkeleton />
      </div>
    );
  }

  if (isError) return <ArticlesError refetch={refetch} />;

  return (
    <div title="Articles">
      <Toolbar
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCount={articles.length}
      />

      <div className="bg-background rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader className="pointer-events-none bg-muted">
            <TableRow>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No articles found{searchQuery && ` matching "${searchQuery}"`}
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        article.status === "PUBLISHED"
                          ? "bg-primary text-background dark:text-foreground"
                          : "bg-accent text-foreground dark:text-background"
                      }`}
                    >
                      {article.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </TableCell>
                  <TableCell>{handleDate(article.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    {article.commentsCount}
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
                              article.status === "DRAFT" ? "PUBLISHED" : "DRAFT"
                            )
                          }
                        >
                          {article.status === "DRAFT" ? (
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
