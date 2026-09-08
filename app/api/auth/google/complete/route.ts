import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/utils/auth-utils";

const GOOGLE_SIGNUP_INDUSTRY_COOKIE = "blackcrest-google-signup-industry";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const destination =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? "/admin/dashboard"
      : user
        ? "/client/dashboard"
        : "/login";

  const response = NextResponse.redirect(new URL(destination, request.url));

  response.cookies.set(GOOGLE_SIGNUP_INDUSTRY_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
