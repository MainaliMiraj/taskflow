import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    console.log("Register API route hit");
  try {
    // 1) Ensure DB is connected
    await connectDB();

    // 2) Read and parse JSON body
    const body = await req.json();
    const { name, email, password } = body;

    // 3) Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 4) Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 409 } // Conflict
      );
    }

    // 5) Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6) Create the user in the database
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // 7) Shape a safe response object (no password)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    // 8) Return success response
    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
