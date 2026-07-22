import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("authjs.session-token", "", {
    maxAge: 0,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
  });

  return response;
}
