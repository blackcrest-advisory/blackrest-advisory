import client from "@/api-client/client";

type LogoutResponse = {
  success: true;
};
export async function logoutUser() {
  const response = await client.post<LogoutResponse>("/api/auth/logout");

  return response.data;
}
