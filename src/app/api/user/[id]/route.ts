// src/app/api/user/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { verifyToken } from "@/lib/auth";

// ✅ GET user by ID
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil user", error: String(err) },
      { status: 500 }
    );
  }
}

// ✅ PUT update user
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email, password, name } = await req.json();

    // Gunakan tipe aman, bukan any
    const data: Partial<{ email: string; password: string; name: string }> = {};
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) data.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: Number(params.id) },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User berhasil diupdate",
      data: user,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal update user", error: String(err) },
      { status: 500 }
    );
  }
}

// ✅ DELETE user
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: "User berhasil dihapus",
      data: deleted,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus user", error: String(err) },
      { status: 500 }
    );
  }
}
