// src/app/api/kategori/[id]/berita/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET semua berita berdasarkan kategori
// URL: /api/kategori/:id/berita?page=1&pageSize=10
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kategoriId = Number(params.id);
    if (isNaN(kategoriId)) {
      return NextResponse.json(
        { success: false, message: "Kategori ID tidak valid" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(searchParams.get("pageSize") || 10))
    );
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.berita.findMany({
        where: { kategoriId },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.berita.count({ where: { kategoriId } }),
    ]);

    return NextResponse.json({
      success: true,
      page,
      pageSize,
      total,
      items,
    });
  } catch (error) {
    console.error("Error fetch berita per kategori:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil berita per kategori" },
      { status: 500 }
    );
  }
}
