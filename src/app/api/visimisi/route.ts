// src/app/api/visimisi/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET semua visi misi
export async function GET() {
  const data = await prisma.visiMisi.findMany();
  return NextResponse.json(data);
}

// POST tambah visi misi
export async function POST(req: Request) {
  const { error } = await requireAuth(req);
  if (error) return error;

  const body = (await req.json()) as { visi: string; misi: string };
  const data = await prisma.visiMisi.create({ data: body });
  return NextResponse.json({ success: true, data });
}
