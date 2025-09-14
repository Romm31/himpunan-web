// src/app/api/event/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Ambil semua event (public)
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { tanggal: "asc" },
    });
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /api/event error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil event" },
      { status: 500 }
    );
  }
}

// ✅ Tambah event (admin only)
export async function POST(req: Request) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { judul, deskripsi, tanggal, lokasi } = await req.json();
    const event = await prisma.event.create({
      data: { judul, deskripsi, tanggal: new Date(tanggal), lokasi },
    });

    return NextResponse.json({ success: true, data: event });
  } catch (err) {
    console.error("POST /api/event error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal membuat event" },
      { status: 500 }
    );
  }
}
