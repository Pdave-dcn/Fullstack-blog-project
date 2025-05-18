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

interface Article {
  id: number;
  title: string;
  status: "published" | "draft";
  date: string;
  views: number;
  comments: number;
}

const Articles = () => {
  const [filter, setFilter] = useState("all");

  const articles: Article[] = [
    {
      id: 1,
      title: "How to Build a Better Blog",
      status: "published",
      date: "May 12, 2025",
      views: 432,
      comments: 12,
    },
    {
      id: 2,
      title: "SEO Tips for Content Writers",
      status: "published",
      date: "May 10, 2025",
      views: 289,
      comments: 8,
    },
    {
      id: 3,
      title: "The Future of Content Marketing",
      status: "draft",
      date: "May 8, 2025",
      views: 0,
      comments: 0,
    },
    {
      id: 4,
      title: "Writing Effective Headlines",
      status: "published",
      date: "May 5, 2025",
      views: 567,
      comments: 24,
    },
    {
      id: 5,
      title: "Social Media Strategy for Bloggers",
      status: "draft",
      date: "May 3, 2025",
      views: 0,
      comments: 0,
    },
    {
      id: 6,
      title: "Creating Engaging Content",
      status: "published",
      date: "May 1, 2025",
      views: 421,
      comments: 18,
    },
    {
      id: 7,
      title: "Email Marketing for Bloggers",
      status: "published",
      date: "Apr 28, 2025",
      views: 312,
      comments: 7,
    },
    {
      id: 8,
      title: "Building an Audience",
      status: "draft",
      date: "Apr 25, 2025",
      views: 0,
      comments: 0,
    },
  ];

  const filteredArticles =
    filter === "all"
      ? articles
      : articles.filter((article) => article.status === filter);

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
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Button variant="outline" className="flex items-center">
              <Filter size={16} className="mr-2" />
              Filter
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                {filter === "all" ? articles.length : filteredArticles.length}
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
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
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
                <TableCell>{article.date}</TableCell>
                <TableCell className="text-right">{article.views}</TableCell>
                <TableCell className="text-right">{article.comments}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Articles;
