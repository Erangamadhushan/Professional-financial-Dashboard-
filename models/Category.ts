import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICategory extends Document {
  user: mongoose.Types.ObjectId | null; // null => global category
  name: string;
  type: "income" | "expense" | string;
  color?: string; // for UI Development
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null }, // null = shared/global category
    name: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    color: { type: String, default: "#5b21b6" },
    icon: { type: String, default: "" }
  },
  { timestamps: true }
);

const Category: Model<ICategory> = (mongoose.models.Category as Model<ICategory>) || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
