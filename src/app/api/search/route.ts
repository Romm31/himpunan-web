import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ benerin import
import { Berita, Event } from "@prisma/client"; // ✅ ambil tipe dari Prisma

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all"; // berita | event | all
    const kategoriId = searchParams.get("kategoriId");

    if (!q.trim()) {
      return NextResponse.json(
        { success: false, message: "Query pencarian kosong" },
        { status: 400 }
      );
    }

    let berita: Berita[] = [];
    let event: Event[] = [];

    if (type === "berita" || type === "all") {
      berita = await prisma.berita.findMany({
        where: {
          AND: [
            kategoriId ? { kategoriId: Number(kategoriId) } : {},
            {
              OR: [
                { judul: { contains: q, mode: "insensitive" } },
                { konten: { contains: q, mode: "insensitive" } },
              ],
            },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
    }

    if (type === "event" || type === "all") {
      event = await prisma.event.findMany({
        where: {
          OR: [
            { judul: { contains: q, mode: "insensitive" } },
            { deskripsi: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { tanggal: "desc" },
        take: 10,
      });
    }

    return NextResponse.json({
      success: true,
      data: { berita, event },
    });
  } catch (error) {
    console.error("Error search:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat search" },
      { status: 500 }
    );
  }
}
