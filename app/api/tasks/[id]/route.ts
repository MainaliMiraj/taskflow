import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const updateData = await req.json();
  console.log(Task);
  // update the task
  const updatedTask = await Task.findOneAndUpdate(
    { _id: params.id, userId: decoded.userId },
    updateData,
    { new: true }
  );

  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  // normalize _id → id for the client
  const normalizedTask = { ...updatedTask.toObject(), id: updatedTask._id };

  return NextResponse.json({
    message: "Task updated successfully",
    task: normalizedTask,
  });
}

export async function DELETE(req: Request, context: any) {
  await connectDB();

  const { params } = await context;

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
