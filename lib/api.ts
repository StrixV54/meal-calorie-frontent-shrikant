import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  CalorieRequest,
  CalorieResponse,
  ApiError,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://flybackend-misty-feather-6458.fly.dev";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || "Something went wrong",
          status: response.status,
        };
        throw error;
      }

      return data;
    } catch (error) {
      if ((error as ApiError).message) {
        throw error;
      }
      throw {
        message: "Network error. Check your connection.",
        status: 0,
      } as ApiError;
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async getCalories(
    request: CalorieRequest,
    token: string,
  ): Promise<CalorieResponse> {
    return this.request<CalorieResponse>("/get-calories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
