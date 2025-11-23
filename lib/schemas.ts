import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name too short"),
  lastName: z.string().min(2, "Last name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const calorieSchema = z.object({
  dish_name: z
    .string()
    .min(1, "Dish name is required")
    .max(100, "Dish name is too long")
    .regex(/^[a-zA-Z0-9\s\-,.']+$/, "Invalid characters in dish name"),
  servings: z
    .number()
    .min(0.1, "Minimum 0.1 servings")
    .max(1000, "Maximum 1000 servings")
    .positive("Servings must be positive"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CalorieFormData = z.infer<typeof calorieSchema>;
