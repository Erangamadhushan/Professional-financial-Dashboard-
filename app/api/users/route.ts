import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/middleware/requireAuth";
import { apiError } from "@/lib/errorHandler";

export async function GET(req: Request) {
  await connectDB();

  // adapt NextRequest-like header methods
  const fakeReq = { headers: (req as any).headers } as NextRequest;
  const auth = await requireAuth(fakeReq);
  if ((auth as any).error) return (auth as any).error;

  const userId = (auth as any).user.id;
  const user = await User.findById(userId).select("-password");
  if (!user) return apiError(404, "User not found");

  return NextResponse.json({ user });
}
