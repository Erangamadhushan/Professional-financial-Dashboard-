import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAuth } from "@/middleware/requireAuth";
import { apiError } from "@/lib/errorHandler";
import { computeMonthlySummary } from "@/helpers/finance";

export async function GET(req: Request) {
  await connectDB();
  const fakeReq = { headers: (req as any).headers } as any;
  const auth = await requireAuth(fakeReq);
  if ((auth as any).error) return (auth as any).error;

  const url = new URL(req.url);
  const year = parseInt(url.searchParams.get("year") || "");
  const month = parseInt(url.searchParams.get("month") || "");

  if (!year || !month) return apiError(400, "Provide year and month query parameters");

  const summary = await computeMonthlySummary(auth.user.id, year, month);
  return NextResponse.json({ summary });
}
