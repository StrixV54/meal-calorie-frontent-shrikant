"use client";

import { useMealStore } from "@/stores/mealStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function MealHistory() {
  const { meals, clearMeals } = useMealStore();

  if (meals.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Searches</CardTitle>
          <CardDescription className="mt-2">Your search history</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No searches yet. Try looking up a dish!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription className="mt-2">Your search history</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearMeals}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {meals.map((meal, index) => (
            <div
              key={`${meal.dish_name}-${meal.timestamp}-${index}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{meal.dish_name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(meal.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    {meal.servings} serving{meal.servings !== 1 ? "s" : ""}
                  </Badge>
                  <p className="text-sm font-medium">
                    {meal.total_calories} kcal
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
