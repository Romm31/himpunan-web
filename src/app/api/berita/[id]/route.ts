// src/app/api/berita/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Ambil 1 berita (publik, tanpa token)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const berita = await prisma.berita.findUnique({
      where: { id: Number(params.id) },
      include: { kategori: true },
    });

    if (!berita) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(berita);
  } catch (error) {
    console.error("GET detail error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal ambil detail berita" },
      { status: 500 }
    );
  }
}

// ✅ Update berita (butuh token admin)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { judul, konten, kategoriId, gambarUrl } = await req.json();

    const updated = await prisma.berita.update({
      where: { id: Number(params.id) },
      data: { judul, konten, kategoriId, gambarUrl },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diupdate",
      data: updated,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal update berita" },
      { status: 500 }
    );
  }
}

// ✅ Hapus berita (butuh token admin)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.berita.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal hapus berita" },
      { status: 500 }
    );
  }
}
