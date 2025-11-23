import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { ClientWrapper } from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Meal Calorie Counter account",
};

export default async function RegisterPage() {
  return (
    <ClientWrapper redirectIfAuth>
      <div className="flex items-center w-full justify-center p-4 md:p-0 h-full">
        <AuthForm mode="register" />
      </div>
    </ClientWrapper>
  );
}
