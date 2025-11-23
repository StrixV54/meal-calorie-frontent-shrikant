import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard(redirectTo: string = "/login") {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return isAuthenticated;
}

export function useAuth() {
  const { token, user, isAuthenticated, setAuth, logout } = useAuthStore();

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    logout,
  };
}
