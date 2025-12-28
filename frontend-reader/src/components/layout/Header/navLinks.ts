import { Home, BookOpen, User, type LucideIcon } from "lucide-react";

export interface NavLink {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/articles", label: "Articles", icon: BookOpen },
  { path: "/about", label: "About", icon: User },
];
