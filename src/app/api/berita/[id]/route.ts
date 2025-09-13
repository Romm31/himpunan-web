import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET berita by ID
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
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(berita);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error mengambil berita" }, { status: 500 });
  }
}

// PUT update berita
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { judul, konten, gambarUrl, kategoriId } = body;

    const berita = await prisma.berita.update({
      where: { id: Number(params.id) },
      data: { judul, konten, gambarUrl, kategoriId },
    });

    return NextResponse.json(berita);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error update berita" }, { status: 500 });
  }
}

// DELETE hapus berita
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.berita.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Berita dihapus" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error hapus berita" }, { status: 500 });
  }
}
