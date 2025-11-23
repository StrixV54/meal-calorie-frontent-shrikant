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
    <div className="grid gap-6 lg:grid-cols-1">
      <div className="space-y-6">
        <MealForm onResult={setCurrentResult} />
        {currentResult && <ResultCard result={currentResult} />}
      </div>

      <div>
        <MealHistory />
      </div>
    </div>
  );
}
