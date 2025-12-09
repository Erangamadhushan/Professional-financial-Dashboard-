import { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function requireAuth(req: { headers: Headers }) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token)
    return {
      error: NextResponse.json({ error: "Missing token" }, { status: 401 }),
    };
  const decoded = verifyToken(token);
  if (!decoded)
    return {
      error: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  return { user: decoded };
}
