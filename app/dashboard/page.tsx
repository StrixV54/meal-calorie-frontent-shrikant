import type { Metadata } from "next";
import { DashboardClient } from "@/components/DashboardClient";
import { ClientWrapper } from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your meal calories and view your history",
};

export default async function DashboardPage() {
  return (
    <ClientWrapper requireAuth>
      <div className="h-[calc(100vh-128px)] w-full bg-cover bg-center bg-no-repeat bg-[linear-gradient(0deg,rgba(255,255,255,0.3),rgba(255,255,255,0.7)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')]">
        <div className="container px-4 py-8 mx-auto flex-1">
          <DashboardClient />
        </div>
      </div>
    </ClientWrapper>
  );
}
