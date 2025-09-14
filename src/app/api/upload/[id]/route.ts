// src/app/api/upload/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

// 🔑 helper auth
async function getUserIdFromAuthHeader(req: Request): Promise<number | null> {
  try {
    const auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) return null;
    const token = auth.slice(7).trim();
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const id = (payload as { id?: number }).id;
    return typeof id === "number" ? id : null;
  } catch {
    return null;
  }
}

// ✅ GET /api/upload/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const upload = await prisma.upload.findUnique({
    where: { id: Number(params.id) },
  });

  if (!upload) {
    return NextResponse.json(
      { success: false, message: "Upload tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(upload);
}

// ✅ DELETE /api/upload/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromAuthHeader(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token tidak valid" },
        { status: 401 }
      );
    }

    const upload = await prisma.upload.findUnique({
      where: { id: Number(params.id) },
    });

    if (!upload) {
      return NextResponse.json(
        { success: false, message: "Upload tidak ditemukan" },
        { status: 404 }
      );
    }

    // hapus file fisik
    const filePath = path.join(process.cwd(), "public", upload.url);
    try {
      await fs.unlink(filePath);
    } catch {
      console.warn("⚠️ File fisik tidak ditemukan, skip hapus");
    }

    // hapus dari DB
    await prisma.upload.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: "Upload berhasil dihapus",
    });
  } catch (err) {
    console.error("Delete upload error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal hapus upload", error: String(err) },
      { status: 500 }
    );
  }
}
