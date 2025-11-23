import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MealHistory } from "@/types";

interface MealState {
  meals: MealHistory[];
  addMeal: (meal: MealHistory) => void;
  clearMeals: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      meals: [],
      addMeal: (meal: MealHistory) =>
        set((state) => ({
          meals: [meal, ...state.meals].slice(0, 20),
        })),
      clearMeals: () => set({ meals: [] }),
    }),
    {
      name: "meal-storage",
    },
  ),
);
