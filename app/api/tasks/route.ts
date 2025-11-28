import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types/auth";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const tasks = await Task.find({ userId: decoded.userId }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ tasks });
}
export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { title, description, status, dueDate, priority } = await req.json();

  const newTask = await Task.create({
    userId: decoded.userId,
    title,
    description,
    status: status || "pending",
    dueDate,
    priority: priority || "Low",
  });

  return NextResponse.json({
    message: "Task created successfully",
    task: newTask,
  });
}
