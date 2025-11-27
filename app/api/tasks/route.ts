import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function POST(req: Request) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  console.log(token)
  const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

  const { title, description, status } = await req.json();

  const newTask = await Task.create({
    userId: decoded.userId,
    title,
    description,
    status: status || "pending",
  });

  return NextResponse.json({
    message: "Task created successfully",
    task: newTask,
  });
}

export async function GET(req: Request) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);


  const tasks = await Task.find({ userId: decoded.userId }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ tasks });
}
