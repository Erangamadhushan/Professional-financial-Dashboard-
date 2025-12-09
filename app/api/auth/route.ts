import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword, comparePassword } from "@/utils/hash";
import { signToken } from "@/utils/jwt";
import { apiError } from "@/lib/errorHandler";

export async function POST(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  // use search param 'action' to decide between signup/login OR accept body { type: 'signup' } 
  const body = await req.json().catch(() => ({}));

  // decide action by body.type or url param
  const action = (body.type || url.searchParams.get("action") || "").toString().toLowerCase();

  if (action === "signup") {
    const { username, email, password } = body;
    if (!username || !email || !password) return apiError(400, "Missing fields");
    

    const exists = await User.findOne({ email });
    if (exists) return apiError(409, "Email already in use");

    const hashed = await hashPassword(password);
    const user = await User.create({ username, email, password: hashed });
    const token = signToken({ id: user._id, email: user.email });
    return NextResponse.json({ user: { id: user._id, username: user.username, email: user.email }, token }, { status: 201 });
  }

  if (action === "login") {
    const { email, password } = body;
    if (!email || !password) return apiError(400, "Missing fields");

    const user = await User.findOne({ email });
    if (!user) return apiError(401, "Invalid credentials");

    const ok = await comparePassword(password, user.password);
    if (!ok) return apiError(401, "Invalid credentials");

    const token = signToken({ id: user._id, email: user.email });
    return NextResponse.json({ user: { id: user._id, username: user.username, email: user.email }, token });
  }

  return apiError(400, "Invalid action. Use ?action=signup or ?action=login or body.type = 'signup'|'login'");
}
