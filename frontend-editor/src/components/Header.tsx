import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">New Article</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
