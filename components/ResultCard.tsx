"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CalorieResponse } from "@/types";

interface ResultCardProps {
  result: CalorieResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{result.dish_name}</CardTitle>
            <CardDescription className="mt-1">Nutrition Info</CardDescription>
          </div>
          <Badge variant="secondary">{result.source}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Servings
            </div>
            <div className="mt-2 text-3xl font-bold">{result.servings}</div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Per Serving
            </div>
            <div className="mt-2 text-3xl font-bold">
              {result.calories_per_serving}
              <span className="ml-1 text-lg font-normal text-muted-foreground">
                kcal
              </span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total
            </div>
            <div className="mt-2 text-3xl font-bold text-primary">
              {result.total_calories}
              <span className="ml-1 text-lg font-normal text-muted-foreground">
                kcal
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
