import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      return NextResponse.json({ error: "Server misconfig: JWT_SECRET tidak ada" }, { status: 500 });
    }

    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET));

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login gagal" }, { status: 500 });
  }
}
