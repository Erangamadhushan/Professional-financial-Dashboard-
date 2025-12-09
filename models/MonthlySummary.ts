// models/MonthlySummary.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMonthlySummary extends Document {
  user: mongoose.Types.ObjectId;
  year: number;
  month: number; // 1-12
  totalIncome: number;
  totalExpense: number;
  byCategory: { category: mongoose.Types.ObjectId | null; name?: string; amount: number }[];
  createdAt: Date;
  updatedAt: Date;
  computedAt: Date;
}

const MonthlySummarySchema = new Schema<IMonthlySummary>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    totalIncome: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
    byCategory: [
      {
        category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 }
      }
    ],
    computedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

MonthlySummarySchema.index({ user: 1, year: 1, month: 1 }, { unique: true });

const MonthlySummary: Model<IMonthlySummary> =
  (mongoose.models.MonthlySummary as Model<IMonthlySummary>) || mongoose.model<IMonthlySummary>("MonthlySummary", MonthlySummarySchema);

export default MonthlySummary;
