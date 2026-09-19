"use server";

import { cookies } from "next/headers";

const GOOGLE_SIGNUP_INDUSTRY_COOKIE = "blackcrest-google-signup-industry";

export async function prepareGoogleSignup(industry: string) {
  const normalizedIndustry = industry.trim();

  if (!normalizedIndustry) {
    return {
      success: false as const,
      error: "Choose your industry before continuing with Google.",
    };
  }

  (await cookies()).set(GOOGLE_SIGNUP_INDUSTRY_COOKIE, normalizedIndustry, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  return { success: true as const };
}
