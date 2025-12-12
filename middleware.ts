import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || null;
    const {pathname} = req.nextUrl;

    const publicRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
    ];

    const protectedRoutes = ["/dashboard", "/add", "/edit"];
    const otpRoute = "/verify-otp";

    // Allow OTP page if no token (new user)
    if (pathname.startsWith(otpRoute) && !token) {
        return NextResponse.next();
    }

    // If user WITH token tries to access public pages → redirect to dashboard
    if (token && publicRoutes.some((r) => pathname.startsWith(r))) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user WITHOUT token tries protected pages → redirect to login
    if (!token && protectedRoutes.some((r) => pathname.startsWith(r))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/add/:path*",
        "/edit/:path*",
        "/verify-otp/:path*",
        "/login",
        "/register",
        "/dashboard/change-password/:path*",
    ],
};