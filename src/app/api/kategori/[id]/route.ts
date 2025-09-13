import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET kategori by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kategori = await prisma.kategori.findUnique({
      where: { id: Number(params.id) },
      include: { berita: true },
    });

    if (!kategori) {
      return NextResponse.json(
        { error: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(kategori);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/kategori/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error mengambil kategori", detail: message },
      { status: 500 }
    );
  }
}

// PUT update kategori
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { nama } = body;

    if (!nama) {
      return NextResponse.json(
        { error: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const kategori = await prisma.kategori.update({
      where: { id: Number(params.id) },
      data: { nama },
    });

    return NextResponse.json(kategori);
  } catch (err: unknown) {
    console.error("❌ Error PUT /api/kategori/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error update kategori", detail: message },
      { status: 500 }
    );
  }
}

// DELETE hapus kategori
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.kategori.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Kategori dihapus" });
  } catch (err: unknown) {
    console.error("❌ Error DELETE /api/kategori/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error hapus kategori", detail: message },
      { status: 500 }
    );
  }
}
