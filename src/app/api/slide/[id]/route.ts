import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// ✅ Ambil slide by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const slide = await prisma.slide.findUnique({ where: { id } });

  if (!slide) {
    return NextResponse.json(
      { success: false, message: "Slide tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(slide);
}

// ✅ Update slide by ID (butuh token)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await requireAuth(req); // ❌ user dihapus
  if (error) return error;

  try {
    const id = Number(params.id);
    const body = await req.json();
    const { title, imageUrl, order } = body;

    const updated = await prisma.slide.update({
      where: { id },
      data: { title, imageUrl, order },
    });

    return NextResponse.json({
      success: true,
      message: "Slide berhasil diupdate",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal update slide" },
      { status: 500 }
    );
  }
}

// ✅ Hapus slide by ID (butuh token)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await requireAuth(req); // ❌ user dihapus
  if (error) return error;

  try {
    const id = Number(params.id);
    await prisma.slide.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Slide berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus slide" },
      { status: 500 }
    );
  }
}
