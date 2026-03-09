import { useCurrentUser } from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { useRouter, useSegments } from "expo-router";
import { useEffect, type PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const segments = useSegments();
  const rootSegment = segments[0];
  const inAuthGroup = rootSegment === "(auth)";

  const { hasHydrated, isAuthenticated, accessToken, setUser, logout } =
    useAuthStore(
      useShallow((state) => ({
        hasHydrated: state.hasHydrated,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        setUser: state.setUser,
        logout: state.logout,
      })),
    );

  const { data, error } = useCurrentUser();
  const currentUser = data?.data?.data;
  const unauthorized = (error as any)?.response?.status === 401;

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, setUser]);

  useEffect(() => {
    if (accessToken && unauthorized) {
      logout();
    }
  }, [accessToken, logout, unauthorized]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [hasHydrated, inAuthGroup, isAuthenticated, router]);

  if (!hasHydrated) {
    return null;
  }

  return <>{children}</>;
}
