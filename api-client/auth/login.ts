import client from "@/api-client/base.axios";
import { loginInput } from "@/lib/validations/auth";
import { LoginResponse } from "@/types/auth/login";

export const loginUser = async (data: loginInput) => {
  const response = await client.post<LoginResponse>("/api/auth/login", data);
  return response;
};
