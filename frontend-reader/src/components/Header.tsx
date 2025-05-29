import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Home, BookOpen, User } from "lucide-react";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            BlogReader
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "text-blue-600 bg-blue-50 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
            >
              <Home size={18} />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/articles"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/articles")
                  ? "text-blue-600 bg-blue-50 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
            >
              <BookOpen size={18} />
              <span className="font-medium">Articles</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/about")
                  ? "text-blue-600 bg-blue-50 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
            >
              <User size={18} />
              <span className="font-medium">About</span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/articles"
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/articles")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={18} />
                <span className="font-medium">Articles</span>
              </Link>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/about")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span className="font-medium">About</span>
              </Link>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200/50">
                {user ? (
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">@{user.username}</p>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
