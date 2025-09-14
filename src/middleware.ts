import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PREFIXES = ["/api/berita", "/api/kategori", "/api/event", "/api/about", "/api/visimisi"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Public: semua GET & semua /api/auth/*
  const isProtectedPath = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = pathname.startsWith("/api/auth");
  const isWriteMethod = method !== "GET";

  if (!isProtectedPath || isAuthRoute || !isWriteMethod) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Token tidak ada", data: null },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7).trim(); // buang "Bearer "
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) {
    return NextResponse.json(
      { success: false, message: "Server misconfig: JWT_SECRET tidak ada", data: null },
      { status: 500 }
    );
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET)); // ✅ Edge-safe verify
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Token tidak valid", data: null },
      { status: 401 }
    );
  }
}

// Middleware selalu untuk API
export const config = {
  matcher: ["/api/:path*"],
};
