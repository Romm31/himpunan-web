import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// ✅ Ambil semua slide
export async function GET() {
  const slides = await prisma.slide.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(slides);
}

// ✅ Tambah / update slide (butuh token)
export async function POST(req: Request) {
  const { error } = await requireAuth(req); // ❌ user dihapus, cukup error
  if (error) return error;

  try {
    const body = await req.json();
    const { title, imageUrl, order } = body;

    if (!title || !imageUrl || !order) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const slide = await prisma.slide.upsert({
      where: { order },
      update: { title, imageUrl },
      create: { title, imageUrl, order },
    });

    return NextResponse.json({ success: true, data: slide });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal membuat slide" },
      { status: 500 }
    );
  }
}
