export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: "CLIENT" | "ADMIN";
  };
  error?: string;
}
