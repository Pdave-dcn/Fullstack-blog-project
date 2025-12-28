import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-tokens";
import { useAuthStore } from "@/store/auth.store";
import AuthModal from "@/components/AuthModal/AuthModal";
import UserMenu from "@/components/UserMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuthStore();

  const handleMobileMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const closeMobileMenu = () => setIsMenuOpen(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <header
      className={cn(
        spacing.padding_x,
        "sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b shadow-lg"
      )}
    >
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to="/" className="text-2xl font-bold">
            TextNode
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <UserMenu />
          ) : (
            <Button
              onClick={openAuthModal}
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
          onClick={handleMobileMenuToggle}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MobileNav
          user={user}
          onClose={closeMobileMenu}
          onAuthClick={openAuthModal}
        />
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
};

export default Header;
