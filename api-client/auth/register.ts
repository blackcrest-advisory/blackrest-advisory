import client from "@/api-client/client";
import { signupInput } from "@/lib/validations/auth";
import { RegisterResponse } from "@/types/auth/register";

export async function registerUser(data: signupInput) {
  const response = await client.post<RegisterResponse>("/api/register", data);
  return response.data;
}
