import client from "@/api-client/client";
import { loginInput } from "@/lib/validations/auth";
import { LoginResponse } from "@/types/auth/login";

export const loginUser = async (data: loginInput) => {
  const respone = await client.post<LoginResponse>("/api/auth/login", data);
  return respone;
};
