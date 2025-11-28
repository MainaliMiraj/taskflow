import { NextResponse,NextRequest } from "next/server";
import crypto from "crypto";
import {connectDB} from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // For security: pretend it's ok even if no user exists
      return NextResponse.json({ message: "Check your email for reset link" });
    }

    // Create token
    const token = crypto.randomBytes(32).toString("hex");

    // Save to user in DB
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() +1000*60*10);
    await user.save();

    // Create reset link (frontend)
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    // For now, log it (later we send email)
    console.log("RESET LINK:", resetLink);

    return NextResponse.json({
      message: "Reset link sent successfully (check console)",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
