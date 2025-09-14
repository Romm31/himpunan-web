// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User sudah ada" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    return NextResponse.json({ message: "User dibuat", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Register gagal" }, { status: 500 });
  }
}
