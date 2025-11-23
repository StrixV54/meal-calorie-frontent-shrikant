export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// calorie tracking types
export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

export interface MealHistory extends CalorieResponse {
  timestamp: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
