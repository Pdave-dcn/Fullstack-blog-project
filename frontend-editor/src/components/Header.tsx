import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useDataFetching } from "@/hooks/use-dataFetching";

interface Article {
  title: string;
}

const getPageTitle = (pathname: string, articleTitle?: string): string => {
  const articleMatch = matchPath("/articles/:id", pathname);
  const editPageMatch = matchPath("/articles/:id/edit", pathname);

  if (articleMatch) {
    return articleTitle || "Article Details";
  }

  if (editPageMatch) return "Edit Article";

  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/articles":
      return "My Articles";
    case "/new-article":
      return "New Article";
    case "/comments":
      return "Comments";
    default:
      return "Not Found";
  }
};

const Header = () => {
  const location = useLocation();
  const articleMatch = matchPath("/articles/:id", location.pathname);

  const { data: article } = useDataFetching<Article>(
    "http://localhost:3000/api",
    articleMatch?.params.id ? `/posts/${articleMatch.params.id}` : ""
  );

  const title = getPageTitle(location.pathname, article?.title);

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/new-article">New Article</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
