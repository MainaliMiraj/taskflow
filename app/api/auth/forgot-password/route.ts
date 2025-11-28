import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Check your email for reset link" });
    }

    const token = crypto.randomBytes(32).toString("hex");


    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 10);
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "TaskFlow Password Reset",
        html: `
    <p>You requested a password reset.</p>
    <p>Click this link to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link expires in 10 minutes.</p>
  `,
      });
    } catch (err) {
      console.log("Failed to send Email:", err);
    }

    return NextResponse.json({
      message: "Reset link sent successfully (check console)",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
