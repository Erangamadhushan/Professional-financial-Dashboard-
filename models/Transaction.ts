// models/Transaction.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export type TransactionType = "income" | "expense" | "transfer";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  account?: mongoose.Types.ObjectId; // which account changed balance
  targetAccount?: mongoose.Types.ObjectId | null; // for transfers
  type: TransactionType;
  amount: number;
  currency: string;
  date: Date;
  category?: mongoose.Types.ObjectId | null;
  description?: string;
  isRecurring?: boolean;
  recurrence?: { interval: "monthly" | "weekly" | "yearly"; every: number } | null;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    targetAccount: { type: Schema.Types.ObjectId, ref: "Account", default: null },
    type: { type: String, enum: ["income", "expense", "transfer"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    description: { type: String },
    isRecurring: { type: Boolean, default: false },
    recurrence: {
      interval: { type: String, enum: ["monthly", "weekly", "yearly"], default: null },
      every: { type: Number, default: 1 }
    }
  },
  { timestamps: true }
);

// Index for faster queries by user + date
TransactionSchema.index({ user: 1, date: -1 });

const Transaction: Model<ITransaction> =
  (mongoose.models.Transaction as Model<ITransaction>) || mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
