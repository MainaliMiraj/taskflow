import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  priority: string;
  dueDate: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      required: true,
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);


export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
