// src/app/api/berita/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth"; // ✅ perbaikan

// Ambil semua berita (publik)
export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { createdAt: "desc" },
      include: { kategori: true },
    });
    return NextResponse.json(berita);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil berita" }, { status: 500 });
  }
}

// Tambah berita (hanya admin dengan token)
export async function POST(req: Request) {
  try {
    const user = verifyToken(req); // ✅ pakai verifyToken
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
    console.error(error);
    return NextResponse.json({ success: false, message: "Gagal tambah berita", data: null }, { status: 500 });
  }
}
