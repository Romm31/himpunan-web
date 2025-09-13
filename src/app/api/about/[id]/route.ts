import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update about
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { visi, misi, profile } = body;

    if (!visi || !misi || !profile) {
      return NextResponse.json(
        { error: "Semua field wajib diisi (visi, misi, profile)" },
        { status: 400 }
      );
    }

    const about = await prisma.about.update({
      where: { id: Number(params.id) },
      data: { visi, misi, profile },
    });

    return NextResponse.json(about);
  } catch (err: unknown) {
    console.error("❌ Error PUT /api/about/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error update about", detail: message },
      { status: 500 }
    );
  }
}

// DELETE hapus about
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.about.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "About dihapus" });
  } catch (err: unknown) {
    console.error("❌ Error DELETE /api/about/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error hapus about", detail: message },
      { status: 500 }
    );
  }
}
