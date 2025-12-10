import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {userId}: any = jwt.verify(token, process.env.JWT_SECRET!);

        const {currentPassword, newPassword} = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                {error: "Current and new password are required"},
                {status: 400}
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                {error: "Incorrect current password"},
                {status: 400}
            );
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        const response = NextResponse.json({
            message: "Password updated successfully",
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (err) {
        console.error("Change password error:", err);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
