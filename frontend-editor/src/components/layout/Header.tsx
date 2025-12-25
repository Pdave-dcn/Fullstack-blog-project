import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Link, useLocation, matchPath } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";

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

  const title = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 w-full bg-background border-b py-4">
      <div className="flex items-center justify-between md:px-5">
        <div className="flex items-center gap-1 md:gap-5">
          <SidebarTrigger />
          <h1 className="text-xl md:text-2xl font-semibold text-foreground">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link to="/new-article">New Article</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
