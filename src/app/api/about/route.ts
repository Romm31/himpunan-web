import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET about (ambil 1 record pertama)
export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (err: unknown) {
    console.error("❌ Error GET /api/about:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal mengambil data about", detail: message },
      { status: 500 }
    );
  }
}

// POST buat about baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visi, misi, profile } = body;

    if (!visi || !misi || !profile) {
      return NextResponse.json(
        { error: "Semua field wajib diisi (visi, misi, profile)" },
        { status: 400 }
      );
    }

    const about = await prisma.about.create({
      data: { visi, misi, profile },
    });

    return NextResponse.json(about, { status: 201 });
  } catch (err: unknown) {
    console.error("❌ Error POST /api/about:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal menambah about", detail: message },
      { status: 500 }
    );
  }
}
