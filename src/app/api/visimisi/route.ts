import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface VisiMisiRequest {
  visi: string;
  misi: string;
}

// ✅ CREATE
export async function POST(req: Request) {
  try {
    const body: VisiMisiRequest = await req.json();
    if (!body.visi || !body.misi) {
      return NextResponse.json(
        { success: false, message: "Visi dan misi wajib diisi", data: null },
        { status: 400 }
      );
    }

    const visimisi = await prisma.visiMisi.create({ data: body });
    return NextResponse.json(
      { success: true, message: "Visi misi berhasil ditambahkan", data: visimisi },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tambah visi misi:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}

// ✅ GET (ambil semua atau yang terbaru)
export async function GET() {
  try {
    const visimisi = await prisma.visiMisi.findMany();
    return NextResponse.json(
      { success: true, message: "Daftar visi misi", data: visimisi },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ambil visi misi:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
