import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  // Allow all public routes without JWT
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Read the token from cookies
  const token = req.cookies.get("token")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET!);

    // If token is valid → allow request
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    // Invalid or expired token → redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/add/:path*", "/edit/:path*"],
};
