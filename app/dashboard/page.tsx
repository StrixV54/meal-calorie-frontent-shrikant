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
      <div className="container px-4 py-8 mx-auto flex-1">
        <DashboardClient />
      </div>
    </ClientWrapper>
  );
}
