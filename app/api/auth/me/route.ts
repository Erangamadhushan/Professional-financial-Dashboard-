import { NextResponse } from "next/server";
import { getTokenFromHeader } from "@/lib/auth";
import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();

  const token = getTokenFromHeader(req.headers.get("authorization"));

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  let decoded: { id: string; email: string };
  try {
    decoded = verifyToken(token) as { id: string; email: string };
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
