"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface ClientWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectIfAuth?: boolean;
}

export function ClientWrapper({
  children,
  requireAuth = false,
  redirectIfAuth = false
}: ClientWrapperProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/login");
    }
    if (redirectIfAuth && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, requireAuth, redirectIfAuth]);

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
