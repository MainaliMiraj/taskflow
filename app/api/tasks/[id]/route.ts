import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

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

  const task = await Task.findOne({ _id: id, userId: decoded.userId });
  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

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

  const updateData = await req.json();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: decoded.userId },
    updateData,
    { new: true }
  );

  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTask);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params; // <-- FIX HERE

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

  const deletedTask = await Task.findOneAndDelete({
    _id: id,
    userId: decoded.userId,
  });

  if (!deletedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
