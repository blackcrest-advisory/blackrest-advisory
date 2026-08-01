import { getCurrentUser } from "@/lib/utils/auth-utils";

export async function getAdminUser() {
  const user = await getCurrentUser();

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return user;
}
