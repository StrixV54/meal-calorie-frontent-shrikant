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
      <div className="flex items-center justify-center p-4 py-20">
        <AuthForm mode="register" />
      </div>
    </ClientWrapper>
  );
}
