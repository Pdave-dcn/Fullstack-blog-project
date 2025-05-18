import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/articles':
      return 'My Articles';
    case '/new-article':
      return 'New Article';
    case '/comments':
      return 'Comments';
    default:
      return 'Not Found';
  }
};

const Header = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

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
