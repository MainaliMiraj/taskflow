import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Create a response
  const response = NextResponse.json(
    { message: "Logged out successfully." },
    { status: 200 }
  );

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Force cookie to expire immediately
    path: "/",
  });

  return response;
}
