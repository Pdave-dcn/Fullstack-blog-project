import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import type { ArticleStatus } from "@/zodSchemas/article.zod";

interface ToolbarProps {
  filter: ArticleStatus | "all";
  setFilter: (filter: ArticleStatus | "all") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount: number;
}

const Toolbar = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  totalCount,
}: ToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} />
        </div>
        <Input
          type="text"
          placeholder="Search articles..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center pointer-events-none"
          >
            <Filter size={16} className="mr-2" />
            Filter
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-primary text-secondary">
              {totalCount}
            </span>
          </Button>
        </div>

        <div className="flex space-x-3">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "PUBLISHED" ? "default" : "outline"}
            onClick={() => setFilter("PUBLISHED")}
          >
            Published
          </Button>
          <Button
            variant={filter === "DRAFT" ? "default" : "outline"}
            onClick={() => setFilter("DRAFT")}
          >
            Drafts
          </Button>
        </div>

        <Button asChild>
          <Link to="/new-article">New Article</Link>
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
