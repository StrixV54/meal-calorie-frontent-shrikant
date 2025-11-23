"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAuth } from "@/lib/auth";
import { useMealStore } from "@/stores/mealStore";
import { calorieSchema, type CalorieFormData } from "@/lib/schemas";
import type { ApiError, CalorieResponse } from "@/types";

interface MealFormProps {
  onResult?: (result: CalorieResponse) => void;
}

export function MealForm({ onResult }: MealFormProps) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const addMeal = useMealStore((state) => state.addMeal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalorieFormData>({
    resolver: zodResolver(calorieSchema),
    defaultValues: {
      servings: 1,
    },
  });

  const onSubmit = async (data: CalorieFormData) => {
    if (!token) {
      setError("You must be logged in to use this feature");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await api.getCalories(data, token);

      addMeal({
        ...result,
        timestamp: new Date().toISOString(),
      });

      if (onResult) {
        onResult(result);
      }

      reset();
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.status === 404) {
        setError("Dish not found. Please try a different dish name.");
      } else if (apiError.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError(apiError.message || "Something went wrong. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Look Up Calories</CardTitle>
        <CardDescription>
          Enter a dish name and servings to get calorie info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dish_name">Dish Name</Label>
            <Input
              id="dish_name"
              placeholder="e.g., chicken salad"
              {...register("dish_name")}
              disabled={isLoading}
            />
            {errors.dish_name && (
              <p className="text-sm text-red-500">{errors.dish_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="servings">Number of Servings</Label>
            <Input
              id="servings"
              type="number"
              step="0.1"
              min="0.1"
              max="1000"
              placeholder="1"
              {...register("servings", { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.servings && (
              <p className="text-sm text-red-500">{errors.servings.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" id="get-calorie-button" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Calorie Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
