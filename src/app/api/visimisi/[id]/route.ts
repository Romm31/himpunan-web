import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { visi, misi } = body;

  const data = await prisma.visiMisi.update({
    where: { id: Number(params.id) },
    data: { visi, misi },
  });

  return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.visiMisi.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Visi Misi dihapus" });
}
