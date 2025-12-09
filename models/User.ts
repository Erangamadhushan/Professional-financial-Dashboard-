import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // optional if using OAuth
  currency: string; // e.g. "LKR" or "USD"
  timezone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // hashed password
    currency: { type: String, default: "LKR" },
    timezone: { type: String, default: "Asia/Colombo" }
  },
  { timestamps: true }
);

const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
export default User;
