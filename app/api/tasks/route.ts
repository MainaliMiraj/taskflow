import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types/auth";

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

  const search = req.nextUrl.searchParams.get("search") || "";

  let query: any = { userId: decoded.userId };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // important: .lean() gives plain objects → easy to transform
  const tasks = await Task.find(query).sort({ createdAt: -1 }).lean();

  // Normalize _id → id
  const formatted = tasks.map((t) => ({
    ...t,
    id: t._id.toString(),
  }));

  return NextResponse.json({ tasks: formatted });
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
