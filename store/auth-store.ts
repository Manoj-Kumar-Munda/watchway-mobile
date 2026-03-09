import { asyncStorageAdapter } from "@/lib/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  coverImage?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  hasHydrated: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;

  logout: () => Promise<void>;

  setUser: (user: User) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,

      login: async (user, accessToken, refreshToken) => {
        set({ user, isAuthenticated: true, accessToken, refreshToken });
      },

      logout: async () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },

      setUser: (user) => set({ user, isAuthenticated: true }),
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(accessToken),
        }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.getState().setHasHydrated(true);
      },
    },
  ),
);
