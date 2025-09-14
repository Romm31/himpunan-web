// src/app/api/user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { verifyToken } from "@/lib/auth";

// ✅ GET semua user (butuh token)
export async function GET(req: Request) {
  const auth = await verifyToken(req);
  if (!auth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  });

  return NextResponse.json(users);
}

// ✅ POST tambah user baru
export async function POST(req: Request) {
  try {
    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email & Password wajib" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    return NextResponse.json({
      success: true,
      message: "User berhasil dibuat",
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Gagal membuat user", error: String(err) }, { status: 500 });
  }
}
