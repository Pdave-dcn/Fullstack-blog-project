import { useEffect, useState } from "react";
import { AuthContext } from "@/hooks/use-auth";
import { isTokenValid } from "@/utils/isTokenValid";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          if (isTokenValid(storedToken)) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Error restoring auth state:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!token) return;

    const checkTokenValidity = () => {
      const isValid = isTokenValid(token);

      if (!isValid) {
        logout();
      }
    };

    checkTokenValidity();

    const interval = setInterval(checkTokenValidity, 60000);

    return () => clearInterval(interval);
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    try {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const generateAvatarColor = (identifier: string) => {
    const colors = [
      "from-red-500 to-pink-500",
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-pink-500 to-rose-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-500 to-green-500",
      "from-violet-500 to-purple-500",
      "from-amber-500 to-yellow-500",
    ];

    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const generateAvatarUrl = (user: User) => {
    const identifier =
      String(user.id) || user.username || user.name || "default";

    return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
      identifier
    )}&backgroundColor=transparent`;
  };

  const getUserIdentifier = (user: User): string => {
    return String(user?.id) || user.username || user.name || "default";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        getInitials,
        generateAvatarColor,
        generateAvatarUrl,
        getUserIdentifier,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
