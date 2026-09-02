"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/client";
import { sendWelcomeEmail } from "@/lib/services/email.service";
import { signupSchema, type signupInput } from "@/lib/validations/auth";

type RegisterActionResult =
  | { success: true; userId: string }
  | { success: false; error: string };

export async function registerWithCredentials(
  input: signupInput,
): Promise<RegisterActionResult> {
  const validation = signupSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Invalid registration data",
    };
  }

  try {
    const { name, email, password, industry } = validation.data;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: await bcrypt.hash(password, 12),
        industry: industry?.trim() || undefined,
      },
    });

    void sendWelcomeEmail(user.email, user.name);

    return { success: true, userId: user.id };
  } catch (error: unknown) {
    console.error("registerWithCredentials error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
