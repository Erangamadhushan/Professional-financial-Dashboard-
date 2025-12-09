import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  name: string; // e.g., "Cash", "My Bank"
  type: "cash" | "bank" | "credit" | "wallet" | string;
  currency: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, default: "bank" },
    currency: { type: String, required: true, default: "LKR" },
    balance: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

const Account: Model<IAccount> = (mongoose.models.Account as Model<IAccount>) || mongoose.model<IAccount>("Account", AccountSchema);
export default Account;
