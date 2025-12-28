import { Link, useLocation } from "react-router-dom";
import type { NavLink } from "./navLinks";

interface NavLinkItemProps {
  link: NavLink;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavLinkItem = ({
  link,
  isMobile = false,
  onClick,
}: NavLinkItemProps) => {
  const location = useLocation();
  const Icon = link.icon;
  const isActive = location.pathname === link.path;

  const baseClasses =
    "flex items-center space-x-2 rounded-lg transition-all duration-200";
  const activeClasses = isActive
    ? "text-muted-foreground bg-muted shadow-sm"
    : "hover:bg-muted/30";
  const sizeClasses = isMobile ? "px-3 py-3" : "px-4 py-2";

  return (
    <Link
      to={link.path}
      className={`${baseClasses} ${activeClasses} ${sizeClasses}`}
      onClick={onClick}
    >
      <Icon size={18} />
      <span className="font-medium">{link.label}</span>
    </Link>
  );
};
