import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Home, BookOpen, User, type LucideIcon } from "lucide-react";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "motion/react";

interface NavLink {
  path: string;
  label: string;
  icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/articles", label: "Articles", icon: BookOpen },
  { path: "/about", label: "About", icon: User },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const NavLinkItem = ({
    link,
    isMobile = false,
    onClick,
  }: {
    link: NavLink;
    isMobile?: boolean;
    onClick?: () => void;
  }) => {
    const Icon = link.icon;
    const active = isActive(link.path);

    if (isMobile) {
      return (
        <Link
          to={link.path}
          className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            active
              ? "text-muted-foreground bg-muted shadow-sm"
              : "hover:bg-muted/30"
          }`}
          onClick={onClick}
        >
          <Icon size={18} />
          <span className="font-medium">{link.label}</span>
        </Link>
      );
    }

    return (
      <Link
        to={link.path}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          active
            ? "text-muted-foreground bg-muted shadow-sm"
            : "hover:bg-muted/30"
        }`}
      >
        <Icon size={18} />
        <span className="font-medium">{link.label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/" className="text-2xl font-bold">
              TextNode
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path} link={link} />
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-background font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLinkItem
                  key={link.path}
                  link={link}
                  isMobile
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-background font-medium py-2 rounded-lg transition-all duration-200"
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
