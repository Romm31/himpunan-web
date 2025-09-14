// src/app/api/about/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

interface Params {
  params: { id: string };
}

// GET about by ID
export async function GET(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await prisma.about.findUnique({ where: { id } });

  if (!data) {
    return NextResponse.json({ success: false, message: "About tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT update about
export async function PUT(req: Request, { params }: Params) {
  const { error } = await requireAuth(req);
  if (error) return error;

  const id = Number(params.id);
  const body = (await req.json()) as { visi?: string; misi?: string; profile?: string };

  const exists = await prisma.about.findUnique({ where: { id } });
  if (!exists) {
    return NextResponse.json({ success: false, message: "About tidak ditemukan" }, { status: 404 });
  }

  const data = await prisma.about.update({
    where: { id },
    data: {
      visi: body.visi ?? exists.visi,
      misi: body.misi ?? exists.misi,
      profile: body.profile ?? exists.profile,
    },
  });

  return NextResponse.json({ success: true, data });
}

// DELETE about
export async function DELETE(req: Request, { params }: Params) {
  const { error } = await requireAuth(req);
  if (error) return error;

  const id = Number(params.id);
  await prisma.about.delete({ where: { id } });
  return NextResponse.json({ success: true, message: "About berhasil dihapus" });
}
