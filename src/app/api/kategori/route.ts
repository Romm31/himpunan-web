import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface KategoriRequest {
  nama: string;
}

// ✅ CREATE
export async function POST(req: Request) {
  try {
    const body: KategoriRequest = await req.json();
    if (!body.nama || body.nama.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Nama kategori wajib diisi", data: null },
        { status: 400 }
      );
    }

    const kategori = await prisma.kategori.create({
      data: { nama: body.nama },
    });

    return NextResponse.json(
      { success: true, message: "Kategori berhasil ditambahkan", data: kategori },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tambah kategori:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}

// ✅ GET ALL
export async function GET() {
  try {
    const kategori = await prisma.kategori.findMany();
    return NextResponse.json(
      { success: true, message: "Daftar kategori", data: kategori },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ambil kategori:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
