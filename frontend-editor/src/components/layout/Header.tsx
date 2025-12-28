import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Link, useLocation, matchPath } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { ExternalLink } from "lucide-react";

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
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex"
          >
            <a
              href="https://textnode-reader.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>View Reader App</span>
              <ExternalLink size={16} />
            </a>
          </Button>

          {/* Mobile */}
          <Button variant="outline" size="sm" asChild className="sm:hidden">
            <a
              href="https://textnode-reader.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink size={16} />
            </a>
          </Button>

          <ModeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/new-article">New Article</Link>
          </Button>
          <Button asChild size="sm" className="sm:hidden">
            <Link to="/new-article">New</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
