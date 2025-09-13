import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface AboutRequest {
  visi: string;
  misi: string;
  profile: string;
}

// ✅ CREATE
export async function POST(req: Request) {
  try {
    const body: AboutRequest = await req.json();
    if (!body.visi || !body.misi || !body.profile) {
      return NextResponse.json(
        { success: false, message: "Visi, misi, dan profile wajib diisi", data: null },
        { status: 400 }
      );
    }

    const about = await prisma.about.create({ data: body });
    return NextResponse.json(
      { success: true, message: "About berhasil ditambahkan", data: about },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tambah about:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}

// ✅ GET (ambil yang terakhir / unique)
export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(
      { success: true, message: "About ditemukan", data: about },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ambil about:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
