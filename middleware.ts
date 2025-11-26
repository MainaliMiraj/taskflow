import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Do NOT verify JWT here (Edge can't run crypto)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/add/:path*", "/edit/:path*"],
};
