import { createContext, useContext } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  getInitials: (name: string) => string;
  generateAvatarColor: (identifier: string) => string;
  generateAvatarUrl: (identifier: User) => string;
  getUserIdentifier: (identifier: User) => string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
