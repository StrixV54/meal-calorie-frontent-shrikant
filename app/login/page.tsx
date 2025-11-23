import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { ClientWrapper } from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Meal Calorie Counter account",
};

export default async function LoginPage() {
  return (
    <ClientWrapper redirectIfAuth>
      <div className="flex items-center h-full justify-center p-4 md:p-0">
        <AuthForm mode="login" />
      </div>
    </ClientWrapper>
  );
}
