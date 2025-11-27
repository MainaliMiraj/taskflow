import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const { params } = context;

  const token = req.cookies.get("token")?.value;
  const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

  const updateData = await req.json();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: params.id, userId: decoded.userId },
    updateData,
    { new: true }
  );

  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Task updated successfully",
    task: updatedTask,
  });
}
export async function DELETE(req: Request, context: any) {
  await connectDB();

  const { params } = await context; // <-- FIX (await the params!)

  const token = req.cookies.get("token")?.value;
  const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

  const deletedTask = await Task.findOneAndDelete({
    _id: params.id,
    userId: decoded.userId,
  });

  if (!deletedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}

