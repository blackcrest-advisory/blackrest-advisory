import client from "@/api-client/base.axios";

type LogoutResponse = {
  success: true;
};
export async function logoutUser() {
  const response = await client.post<LogoutResponse>("/api/auth/logout");

  return response.data;
}
