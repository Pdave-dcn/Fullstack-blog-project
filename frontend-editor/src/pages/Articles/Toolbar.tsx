import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { type Article } from "./Articles";
import { Input } from "@/components/ui/input";

interface Toolbar {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  articles: Article[] | null;
  filteredArticles: Article[] | undefined;
}

const Toolbar = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  articles,
  filteredArticles,
}: Toolbar) => {
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
              {filter === "all" ? articles?.length : filteredArticles?.length}
            </span>
          </Button>
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
  );
};

export default Toolbar;
