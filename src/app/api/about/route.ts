// src/app/api/about/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { visi, misi, profile } = body;

    const about = await prisma.about.create({
      data: { visi, misi, profile },
    });

    return NextResponse.json({ success: true, data: about });
  } catch (err) {
    console.error("POST /about error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal membuat about" },
      { status: 500 }
    );
  }
}
