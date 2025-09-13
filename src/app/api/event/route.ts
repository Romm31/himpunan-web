import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET semua event
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { tanggal: "asc" },
    });
    return NextResponse.json(events);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/event:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal mengambil data event", detail: message },
      { status: 500 }
    );
  }
}

// POST tambah event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { judul, deskripsi, tanggal, lokasi } = body;

    if (!judul || !deskripsi || !tanggal || !lokasi) {
      return NextResponse.json(
        { error: "Semua field wajib diisi (judul, deskripsi, tanggal, lokasi)" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        judul,
        deskripsi,
        tanggal: new Date(tanggal),
        lokasi,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (err: unknown) {
    console.error("❌ Error POST /api/event:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal menambah event", detail: message },
      { status: 500 }
    );
  }
}
