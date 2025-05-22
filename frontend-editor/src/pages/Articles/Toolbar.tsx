import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { type Article } from "./Articles";

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
  );
};

export default Toolbar;
