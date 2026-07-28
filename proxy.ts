import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token =
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value;
  let isAuthenticated = false;
  let role: string | null = null;

  if (token && process.env.NEXTAUTH_SECRET) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXTAUTH_SECRET),
      );
      isAuthenticated = true;
      role = typeof payload.role === "string" ? payload.role : null;
    } catch {
      isAuthenticated = false;
    }
  }

  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/client");
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    role !== "ADMIN" &&
    role !== "SUPER_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/client") &&
    (role === "ADMIN" || role === "SUPER_ADMIN")
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardPath =
      role === "ADMIN" || role === "SUPER_ADMIN"
        ? "/admin/dashboard"
        : "/client/dashboard";

    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/login", "/signup"],
};
