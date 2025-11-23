import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientWrapper } from "@/components/ClientWrapper";
import { FeaturesSection } from "@/components/FeaturesSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Track your meal calories with precision using USDA FoodData Central",
};

export default function Home() {

  return (
    <ClientWrapper redirectIfAuth>
      <div className="container px-4 mx-auto">
        <section className="flex flex-col items-center justify-center py-20 md:py-28">
          <div className="max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Track Your Meal Calories
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Get accurate nutritional information for your meals. Simple and
              fast calorie tracking.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FeaturesSection />
      </div>
    </ClientWrapper>
  );
}
