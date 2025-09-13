import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.visiMisi.findFirst(); // camelCase sesuai Prisma
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { visi, misi } = body;

  const data = await prisma.visiMisi.create({
    data: { visi, misi },
  });

  return NextResponse.json(data, { status: 201 });
}
