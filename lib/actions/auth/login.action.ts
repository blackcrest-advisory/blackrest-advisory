"use server";

import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/client";
import { loginSchema, type loginInput } from "@/lib/validations/auth";

type LoginActionResult =
  | {
      success: true;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }
  | { success: false; error: string };

export async function loginWithCredentials(
  input: loginInput,
): Promise<LoginActionResult> {
  const validation = loginSchema.safeParse(input);

  if (!validation.success) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const { email, password } = validation.data;
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return { success: false, error: "Invalid credentials" };
    }

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET is not configured");

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(secret));

    (await cookies()).set("authjs.session-token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      maxAge: 86400,
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: unknown) {
    console.error("loginWithCredentials error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
