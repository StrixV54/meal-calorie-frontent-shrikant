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
      <div className="flex items-center w-full justify-center p-4 md:p-0 h-[calc(100vh-128px)] bg-cover bg-center bg-no-repeat bg-[linear-gradient(0deg,rgba(255,255,255,0.3),rgba(255,255,255,0.7)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')]">
        <AuthForm mode="login" />
      </div>
    </ClientWrapper>
  );
}
