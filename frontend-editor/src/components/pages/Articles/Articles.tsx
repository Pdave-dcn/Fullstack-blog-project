import { useState } from "react";
import { Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
import { MessageLoading } from "../../ui/MessageLoading";
import { handleDate } from "@/lib/utils";

interface Article {
  id: number;
  title: string;
  status: "published" | "draft";
  createdAt: string;
  comments: string[];
}

const Articles = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: articles,
    error: articleError,
    loading: articleLoading,
  } = useDataFetching<Article[]>("http://localhost:3000/api", "/posts");

  const filteredArticles = articles?.filter((article) => {
    const matchesFilter = filter === "all" || article.status === filter;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (action: string, article: Article) => {
    switch (action) {
      case "edit":
        toast.info("Edit Article", {
          description: `Editing "${article.title}"`,
        });
        break;
      case "delete":
        toast.warning("Delete Article", {
          description: `Deleting "${article.title}"`,
        });
        break;
      case "view":
        toast.info("View Article", {
          description: `Viewing "${article.title}"`,
        });
        break;
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
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Button variant="outline" className="flex items-center">
              <Filter size={16} className="mr-2" />
              Filter
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                {filter === "all" ? articles?.length : filteredArticles?.length}
              </span>
            </Button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 hidden group-focus-within:block">
              <ul className="py-1">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setFilter("published")}
                  >
                    Published
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setFilter("draft")}
                  >
                    Drafts
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button variant="outline" onClick={() => setFilter("published")}>
              Published
            </Button>
            <Button variant="outline" onClick={() => setFilter("draft")}>
              Drafts
            </Button>
          </div>

          <Button>
            <Link to="/new-article">New Article</Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
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
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
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
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleAction("view", article)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("edit", article)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("delete", article)}
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
