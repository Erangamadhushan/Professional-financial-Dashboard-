import { NextResponse } from "next/server";

export function apiError(status = 500, message = "Internal Server Error") {
  return NextResponse.json({ error: message }, { status });
}
