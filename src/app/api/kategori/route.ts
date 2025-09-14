// src/app/api/kategori/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// ✅ Ambil semua kategori
export async function GET() {
  try {
    const kategori = await prisma.kategori.findMany({
      orderBy: { nama: "asc" },
    });
    return NextResponse.json(kategori);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
  }
}

// ✅ Tambah kategori (hanya admin)
export async function POST(req: Request) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { nama } = await req.json();

    if (!nama) {
      return NextResponse.json({ success: false, message: "Nama kategori wajib" }, { status: 400 });
    }

    const kategori = await prisma.kategori.create({
      data: { nama },
    });

    return NextResponse.json({ success: true, data: kategori });
  } catch (err) {
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 });
  }
}
