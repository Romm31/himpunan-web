import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";   // ✅ pake named import

interface BeritaRequest {
  judul: string;
  konten: string;
  gambarUrl?: string | null;
  kategoriId?: number | null;
}

export async function POST(req: Request) {
  try {
    const body: BeritaRequest = await req.json();
    const { judul, konten, gambarUrl, kategoriId } = body;

    if (!judul || judul.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Judul wajib diisi", data: null },
        { status: 400 }
      );
    }

    if (!konten || konten.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Konten wajib diisi", data: null },
        { status: 400 }
      );
    }

    const berita = await prisma.berita.create({
      data: {
        judul,
        konten,
        gambarUrl: gambarUrl ?? null,
        kategoriId: kategoriId ?? null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berita berhasil ditambahkan", data: berita },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tambah berita:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
