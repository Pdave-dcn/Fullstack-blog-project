import { Button } from "@/components/ui/button";
import { NavLinkItem } from "./NavLinkItem";
import { navLinks } from "./navLinks";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import type { User } from "@/zodSchemas/auth.zod";
import { useLogoutMutation } from "@/queries/auth.query";
import { motion } from "motion/react";
import {
  staggerContainerFaster,
  fadeUp,
  scaleFade,
} from "@/lib/animation-variants";

interface MobileNavProps {
  user: User | null;
  onClose: () => void;
  onAuthClick: () => void;
}

export const MobileNav = ({ user, onClose, onAuthClick }: MobileNavProps) => {
  const { logout } = useAuthStore();
  const { mutate: logoutMutate } = useLogoutMutation();

  const handleAuthClick = () => {
    onAuthClick();
    onClose();
  };

  const handleLogout = () => {
    logoutMutate();
    logout();
    onClose();
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={scaleFade}
      className="md:hidden py-4 border-t bg-background/95 backdrop-blur-xl"
    >
      <motion.div
        variants={staggerContainerFaster}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-2"
      >
        {navLinks.map((link) => (
          <motion.div key={link.path} variants={fadeUp}>
            <NavLinkItem link={link} isMobile onClick={onClose} />
          </motion.div>
        ))}

        {/* Mobile Auth Section */}
        <motion.div variants={fadeUp} className="pt-4 border-t space-y-3">
          {user ? (
            <>
              <motion.div variants={fadeUp} className="px-3 py-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{user.username}
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full justify-start px-3 py-3"
                >
                  <LogOut size={18} className="mr-2" />
                  <span className="font-medium">Sign Out</span>
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div variants={fadeUp}>
              <Button
                onClick={handleAuthClick}
                className="w-full text-background font-medium py-2 rounded-lg transition-all duration-200"
              >
                Sign In
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};
