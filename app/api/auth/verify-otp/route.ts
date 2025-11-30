import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user.verified) {
      return NextResponse.json(
        { message: "User already verified." },
        { status: 400 }
      );
    }

    // Check OTP match
    if (String(user.otp) !== String(otp)) {
      return NextResponse.json({ message: "Invalid OTP." }, { status: 400 });
    }

    // Check OTP expiry
    if (!user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: "OTP has expired." },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.verified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return NextResponse.json(
      { message: "Account verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
