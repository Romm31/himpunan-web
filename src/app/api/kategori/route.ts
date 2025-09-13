import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET semua kategori
export async function GET() {
  try {
    const kategori = await prisma.kategori.findMany({
      include: { berita: true }, // bisa lihat berita di tiap kategori
      orderBy: { id: "asc" },
    });
    return NextResponse.json(kategori);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/kategori:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal mengambil data kategori", detail: message },
      { status: 500 }
    );
  }
}

// POST tambah kategori
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama } = body;

    if (!nama) {
      return NextResponse.json(
        { error: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const kategori = await prisma.kategori.create({
      data: { nama },
    });

    return NextResponse.json(kategori, { status: 201 });
  } catch (err: unknown) {
    console.error("❌ Error POST /api/kategori:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal menambah kategori", detail: message },
      { status: 500 }
    );
  }
}
