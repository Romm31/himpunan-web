// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { jwtVerify } from "jose";

export const runtime = "nodejs"; // perlu akses fs

function ensureUploadDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ambil userId dari token (opsional, kalau gagal ya biarin null)
async function getUserIdFromAuthHeader(req: Request): Promise<number | null> {
  try {
    const auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) return null;
    const token = auth.slice(7).trim();
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const id = (payload as { id?: number }).id;
    return typeof id === "number" ? id : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file" },
        { status: 400 }
      );
    }

    // siapkan folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    ensureUploadDir(uploadDir);

    // buat nama file unik (hindari bentrok)
    const originalName = file.name || "upload";
    const safeBase = originalName.replace(/[^\w.\-]/g, "_");
    const ext = path.extname(safeBase) || "";
    const base = path.basename(safeBase, ext);
    const unique = `${base}-${Date.now()}${ext}`;
    const destPath = path.join(uploadDir, unique);

    // tulis ke disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destPath, buffer);

    // simpan metadata ke DB
    const userId = await getUserIdFromAuthHeader(req);
    const url = `/uploads/${unique}`;

    const record = await prisma.upload.create({
      data: {
        filename: unique,
        url,
        size: buffer.length,
        mimetype: file.type || "application/octet-stream",
        userId: userId ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "File berhasil diupload",
      data: record,     // ⬅️ metadata lengkap dari Prisma
      url,              // ⬅️ balikin URL langsung juga biar simple dipake
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: "Upload gagal", error: String(err) },
      { status: 500 }
    );
  }
}
