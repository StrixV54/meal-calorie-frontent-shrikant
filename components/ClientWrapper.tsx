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
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-128px)]">
        <svg
          className="animate-spin text-muted-foreground size-12"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}
