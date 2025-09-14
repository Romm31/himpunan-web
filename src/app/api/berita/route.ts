// src/app/api/berita/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Ambil semua berita (publik) dengan pagination & sorting
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

    const total = await prisma.berita.count();

    const berita = await prisma.berita.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: sort },
      include: { kategori: true },
    });

    return NextResponse.json({
      success: true,
      page,
      pageSize,
      total,
      items: berita,
    });
  } catch (error) {
    console.error("GET /api/berita error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil berita" }, { status: 500 });
  }
}

// ✅ Tambah berita (hanya admin dengan token)
export async function POST(req: Request) {
  try {
    const user = await verifyToken(req); // ⬅️ fix: pakai await
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token tidak ada", data: null },
        { status: 401 }
      );
    }

    const { judul, konten, kategoriId } = await req.json();

    const berita = await prisma.berita.create({
      data: { judul, konten, kategoriId: kategoriId || null },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil ditambahkan",
      data: berita,
    });
  } catch (error) {
    console.error("POST /api/berita error:", error);
    return NextResponse.json({ success: false, message: "Gagal tambah berita", data: null }, { status: 500 });
  }
}
