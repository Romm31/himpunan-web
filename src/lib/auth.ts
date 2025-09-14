import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function verifyToken(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return { id: payload.id as number, email: payload.email as string };
  } catch {
    return null;
  }
}

// ✅ Helper agar konsisten di semua route
export async function requireAuth(req: Request) {
  const user = await verifyToken(req);
  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 }),
    };
  }
  return { user, error: null };
}
