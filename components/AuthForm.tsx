"use client";

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/schemas";
import type { ApiError } from "@/types";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const isRegister = mode === "register";
  const schema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (isRegister) {
        response = await api.register(data as RegisterFormData);
      } else {
        response = await api.login(data as LoginFormData);
      }

      // Extract user info from form data
      const user = isRegister
        ? {
            firstName: (data as RegisterFormData).firstName,
            lastName: (data as RegisterFormData).lastName,
            email: data.email,
          }
        : {
            firstName: "",
            lastName: "",
            email: data.email,
          };

      setAuth(response.token, user);
      router.push("/dashboard");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="md:w-[545px] w-[90vw] shrink-0">
      <CardHeader>
        <CardTitle>
          {isRegister ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Enter your details to create your account"
            : "Enter your credentials to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName" as keyof RegisterFormData)}
                  disabled={isLoading}
                />
                {(errors as FieldErrors<RegisterFormData>).firstName && (
                  <p className="text-sm text-red-500">
                    {
                      (errors as FieldErrors<RegisterFormData>).firstName
                        ?.message
                    }
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName" as keyof RegisterFormData)}
                  disabled={isLoading}
                />
                {(errors as FieldErrors<RegisterFormData>).lastName && (
                  <p className="text-sm text-red-500">
                    {
                      (errors as FieldErrors<RegisterFormData>).lastName
                        ?.message
                    }
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRegister ? "Create Account" : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Sign up
                </a>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
