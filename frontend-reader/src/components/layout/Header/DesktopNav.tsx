import { NavLinkItem } from "./NavLinkItem";
import { navLinks } from "./navLinks";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex space-x-2">
      {navLinks.map((link) => (
        <NavLinkItem key={link.path} link={link} />
      ))}
    </nav>
  );
};
