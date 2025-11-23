"use client";

import { useState } from "react";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import type { CalorieResponse } from "@/types";

export function DashboardClient() {
  const [currentResult, setCurrentResult] = useState<CalorieResponse | null>(
    null
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="space-y-6 w-full max-w-2xl mx-auto">
        <MealForm onResult={setCurrentResult} />
        {currentResult && <ResultCard result={currentResult} />}
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <MealHistory />
      </div>
    </div>
  );
}
