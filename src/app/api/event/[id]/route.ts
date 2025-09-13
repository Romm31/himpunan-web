import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET event by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/event/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error mengambil event", detail: message },
      { status: 500 }
    );
  }
}

// PUT update event
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { judul, deskripsi, tanggal, lokasi } = body;

    if (!judul || !deskripsi || !tanggal || !lokasi) {
      return NextResponse.json(
        { error: "Semua field wajib diisi (judul, deskripsi, tanggal, lokasi)" },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: { id: Number(params.id) },
      data: {
        judul,
        deskripsi,
        tanggal: new Date(tanggal),
        lokasi,
      },
    });

    return NextResponse.json(event);
  } catch (err: unknown) {
    console.error("❌ Error PUT /api/event/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error update event", detail: message },
      { status: 500 }
    );
  }
}

// DELETE hapus event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Event dihapus" });
  } catch (err: unknown) {
    console.error("❌ Error DELETE /api/event/[id]:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Error hapus event", detail: message },
      { status: 500 }
    );
  }
}
