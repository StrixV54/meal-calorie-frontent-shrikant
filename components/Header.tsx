"use client";

import Link from "next/link";
import { ChefHat, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
    setTimeout(() => {
      window.open("/", "_self");
    }, 100);
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isHomePage = pathname === "/";

  return (
    <header className="border-b bg-theme-gradient">
      <div className="container mx-auto flex h-17 items-center justify-between px-4">
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold dark:text-white">Meal Calorie Counter</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {user && user.firstName && (
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              )}
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-6 w-6" />
                <span className="hidden sm:block">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <ThemeToggle />
              {!isAuthPage && !isHomePage && (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
