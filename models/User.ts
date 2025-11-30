import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  otp?: string | null;
  otpExpires?: Date | null;
}

// Define the schema for the User collection
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Avoid model overwrite issues in dev
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
