// src/app/api/kategori/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ GET detail kategori + berita terkait
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const kategori = await prisma.kategori.findUnique({
      where: { id },
      include: { berita: true },
    });

    if (!kategori) {
      return NextResponse.json(
        { success: false, message: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(kategori);
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil detail kategori" },
      { status: 500 }
    );
  }
}

// ✅ PUT update kategori (admin)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token tidak valid" },
        { status: 401 }
      );
    }

    const id = Number(params.id);
    const { nama } = await req.json();

    const kategori = await prisma.kategori.update({
      where: { id },
      data: { nama },
    });

    return NextResponse.json({ success: true, data: kategori });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal update kategori" },
      { status: 500 }
    );
  }
}

// ✅ DELETE kategori (admin)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token tidak valid" },
        { status: 401 }
      );
    }

    const id = Number(params.id);
    await prisma.kategori.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal hapus kategori" },
      { status: 500 }
    );
  }
}
