import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Ambil 2 slide utama (order ASC biar 1,2 urut)
    const slidesUtama = await prisma.slide.findMany({
      orderBy: { order: "asc" },
      take: 2,
    });

    // Ambil 3 berita terbaru
    const beritaTerbaru = await prisma.berita.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        judul: true,
        gambarUrl: true,
        createdAt: true,
      },
    });

    // Ambil about terbaru (ambil yang paling akhir)
    const about = await prisma.about.findFirst({
      orderBy: { id: "desc" },
    });

    // Gabung slides utama + berita sebagai slide 3-5
    const slidesGabungan = [
      ...slidesUtama.map((s) => ({
        id: s.id,
        title: s.title,
        imageUrl: s.imageUrl,
        order: s.order,
        type: "custom", // custom slide buatan admin
      })),
      ...beritaTerbaru.map((b, idx) => ({
        id: b.id,
        title: b.judul,
        imageUrl: b.gambarUrl,
        order: idx + 3, // otomatis 3,4,5
        type: "berita", // slide berita
      })),
    ];

    return NextResponse.json({
      success: true,
      data: {
        slides: slidesGabungan,
        beritaTerbaru,
        about,
      },
    });
  } catch (err) {
    console.error("Homepage error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal ambil data homepage" },
      { status: 500 }
    );
  }
}
