// src/app/api/kategori/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Detail kategori
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const kategori = await prisma.kategori.findUnique({
      where: { id: Number(params.id) },
      include: { berita: true }, // ikutkan berita di kategori tsb
    });

    if (!kategori) {
      return NextResponse.json({ success: false, message: "Kategori tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(kategori);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
  }
}

// ✅ Update kategori (hanya admin)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { nama } = await req.json();

    const kategori = await prisma.kategori.update({
      where: { id: Number(params.id) },
      data: { nama },
    });

    return NextResponse.json({ success: true, data: kategori });
  } catch (err) {
    return NextResponse.json({ error: "Gagal update kategori" }, { status: 500 });
  }
}

// ✅ Hapus kategori (hanya admin)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await prisma.kategori.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true, message: "Kategori berhasil dihapus" });
  } catch (err) {
    return NextResponse.json({ error: "Gagal hapus kategori" }, { status: 500 });
  }
}
