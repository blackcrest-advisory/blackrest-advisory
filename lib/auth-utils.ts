import { jwtVerify } from "jose";
import { cookies } from "next/headers";

type CurrentUser = {
  id: string;
  email: string;
  role: string;
  name: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const token = (await cookies()).get("authjs.session-token")?.value;
    const secret = process.env.NEXTAUTH_SECRET;

    if (!token || !secret) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
