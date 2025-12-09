// app/api/finance/transactions/route.ts
import { NextResponse } from "next/server";
import connectDB, { startSession } from "@/lib/db";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";
import Category from "@/models/Category";
import { requireAuth } from "@/middleware/requireAuth";
import { apiError } from "@/lib/errorHandler";
import mongoose from "mongoose";

/**
 * GET /api/finance/transactions?limit=10
 * Returns recent transactions for the authenticated user.
 */
export async function GET(req: Request) {
  await connectDB();

  const fakeReq = { headers: (req as any).headers } as any;
  const auth = await requireAuth(fakeReq);
  if ((auth as any).error) return (auth as any).error;

  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const userId = auth.user.id;

    // fetch recent transactions, populate account and category
    const txs = await Transaction.find({ user: new mongoose.Types.ObjectId(userId) })
      .sort({ date: -1, createdAt: -1 })
      .limit(Math.min(limit, 100))
      .populate({ path: "account", select: "name balance currency" })
      .populate({ path: "category", select: "name type color icon" })
      .lean();

    return NextResponse.json({ transactions: txs });
  } catch (err: any) {
    return apiError(500, err.message || "Failed to fetch transactions");
  }
}


