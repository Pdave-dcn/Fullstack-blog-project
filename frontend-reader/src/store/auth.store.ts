import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/zodSchemas/auth.zod";
import { createAbility, type AppAbility } from "@/lib/security/ability";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  ability: AppAbility | null;

  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      ability: null,

      login: (user) => {
        const ability = createAbility({
          id: user.id,
          role: user.role,
        });
        set({ user, isAuthenticated: true, ability });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, ability: null });
      },
    }),
    {
      name: "auth-data",
      // Only persist user data, not ability
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // Recreate ability after rehydration
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          const ability = createAbility({
            id: state.user.id,
            role: state.user.role,
          });
          state.ability = ability;
        }
      },
    }
  )
);

// Convenience hook for components
export function useAbility() {
  const ability = useAuthStore((state) => state.ability);

  if (!ability) {
    throw new Error("User not authenticated or ability not initialized");
  }

  return ability;
}
