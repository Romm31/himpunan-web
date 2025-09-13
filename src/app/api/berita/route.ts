import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      include: { kategori: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(berita);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/berita:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal mengambil data", detail: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const judul = body.judul || "Tanpa Judul";
    const konten = body.konten || "";
    const gambarUrl = body.gambarUrl ?? null;
    const kategoriId = body.kategoriId ?? null;

    const berita = await prisma.berita.create({
      data: { judul, konten, gambarUrl, kategoriId },
    });

    return NextResponse.json(berita, { status: 201 });
  } catch (err: unknown) {
    console.error("❌ Error POST /api/berita:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal menambah berita", detail: message },
      { status: 500 }
    );
  }
}
