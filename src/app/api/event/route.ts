import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface EventRequest {
  judul: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
}

// ✅ CREATE
export async function POST(req: Request) {
  try {
    const body: EventRequest = await req.json();
    if (!body.judul || !body.deskripsi || !body.tanggal || !body.lokasi) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi", data: null },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        judul: body.judul,
        deskripsi: body.deskripsi,
        tanggal: new Date(body.tanggal),
        lokasi: body.lokasi,
      },
    });

    return NextResponse.json(
      { success: true, message: "Event berhasil ditambahkan", data: event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tambah event:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}

// ✅ GET ALL
export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(
      { success: true, message: "Daftar event", data: events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ambil event:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
