// src/app/api/visimisi/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

interface Params {
  params: { id: string };
}

// GET visi misi by ID
export async function GET(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await prisma.visiMisi.findUnique({ where: { id } });

  if (!data) {
    return NextResponse.json({ success: false, message: "VisiMisi tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT update visi misi
export async function PUT(req: Request, { params }: Params) {
  const { error } = await requireAuth(req);
  if (error) return error;

  const id = Number(params.id);
  const body = (await req.json()) as { visi?: string; misi?: string };

  const exists = await prisma.visiMisi.findUnique({ where: { id } });
  if (!exists) {
    return NextResponse.json({ success: false, message: "VisiMisi tidak ditemukan" }, { status: 404 });
  }

  const data = await prisma.visiMisi.update({
    where: { id },
    data: {
      visi: body.visi ?? exists.visi,
      misi: body.misi ?? exists.misi,
    },
  });

  return NextResponse.json({ success: true, data });
}

// DELETE visi misi
export async function DELETE(req: Request, { params }: Params) {
  const { error } = await requireAuth(req);
  if (error) return error;

  const id = Number(params.id);
  await prisma.visiMisi.delete({ where: { id } });
  return NextResponse.json({ success: true, message: "VisiMisi berhasil dihapus" });
}
