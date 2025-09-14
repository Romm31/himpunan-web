// src/app/api/event/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Ambil 1 event
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) },
    });
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (err) {
    console.error("GET /api/event/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil event" },
      { status: 500 }
    );
  }
}

// ✅ Update event (admin only)
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

    const { judul, deskripsi, tanggal, lokasi } = await req.json();
    const updated = await prisma.event.update({
      where: { id: Number(params.id) },
      data: { judul, deskripsi, tanggal: new Date(tanggal), lokasi },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PUT /api/event/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal update event" },
      { status: 500 }
    );
  }
}

// ✅ Hapus event (admin only)
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

    await prisma.event.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({
      success: true,
      message: "Event berhasil dihapus",
    });
  } catch (err) {
    console.error("DELETE /api/event/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus event" },
      { status: 500 }
    );
  }
}
