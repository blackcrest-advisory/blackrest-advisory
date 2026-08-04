import client from "@/api-client/base.axios";
import { signupInput } from "@/lib/validations/auth";
import { RegisterResponse } from "@/types/auth/register";

export async function registerUser(data: signupInput) {
  const response = await client.post<RegisterResponse>(
    "/api/auth/register",
    data,
  );
  return response.data;
}
