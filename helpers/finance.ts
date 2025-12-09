import Transaction from "@/models/Transaction";
import Category from "@/models/Category";
import mongoose from "mongoose";

/**
 * Returns a summary of totals + category break down for given user/month/year.
 */
export async function computeMonthlySummary(userId: string | mongoose.Types.ObjectId, year: number, month: number) {
  // month: 1-12
  const start = new Date(year, month - 1, 1, 0, 0, 0);
  const end = new Date(year, month, 1, 0, 0, 0); // exclusive

  // pipeline: filter user + date range -> group by type + category
  const pipeline = [
    { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: start, $lt: end } } },
    {
      $group: {
        _id: { type: "$type", category: "$category" },
        amount: { $sum: "$amount" }
      }
    },
    {
      $project: {
        _id: 0,
        type: "$_id.type",
        category: "$_id.category",
        amount: 1
      }
    }
  ];

  const groups = await Transaction.aggregate(pipeline).exec();

  let totalIncome = 0;
  let totalExpense = 0;
  const byCategoryMap = new Map<string, number>(); // key: categoryId or 'uncat:income' etc.

  for (const g of groups) {
    if (g.type === "income") {
      totalIncome += g.amount;
    } else if (g.type === "expense") {
      totalExpense += g.amount;
    }
    const key = g.category ? g.category.toString() : `__uncat__:${g.type}`;
    byCategoryMap.set(key, (byCategoryMap.get(key) || 0) + g.amount);
  }

  // Resolve category names
  const results: { categoryId: string | null; name: string; amount: number }[] = [];
  const categoryIds = Array.from(byCategoryMap.keys()).filter(k => !k.startsWith("__uncat__")).map(k => new mongoose.Types.ObjectId(k));

  const categories = categoryIds.length ? await Category.find({ _id: { $in: categoryIds } }).lean() : [];

  for (const [k, amt] of byCategoryMap.entries()) {
    if (k.startsWith("__uncat__")) {
      const [, type] = k.split(":");
      results.push({ categoryId: null, name: `Uncategorized (${type})`, amount: amt });
    } else {
      const cat = categories.find(c => c._id.toString() === k);
      results.push({ categoryId: k, name: cat ? cat.name : "Unknown", amount: amt });
    }
  }

  return {
    year,
    month,
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    byCategory: results
  };
}
