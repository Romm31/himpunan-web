// src/app/api/upload/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

// GET /api/upload/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
  }

  const item = await prisma.upload.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ success: false, message: "Upload tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

// DELETE /api/upload/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
  }

  const existing = await prisma.upload.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ success: false, message: "Upload tidak ditemukan" }, { status: 404 });
  }

  // hapus record dulu
  await prisma.upload.delete({ where: { id } });

  // lalu coba hapus file fisik (jangan gagal kalau file-nya nggak ada)
  try {
    const filename = path.basename(existing.url); // aman dari traversal
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.warn("Gagal hapus file fisik:", e);
  }

  return NextResponse.json({ success: true, message: "Upload dihapus" });
}
