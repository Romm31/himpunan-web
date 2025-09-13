/*
  Warnings:

  - You are about to drop the `Misi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Misi";

-- DropTable
DROP TABLE "public"."Visi";

-- CreateTable
CREATE TABLE "public"."VisiMisi" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisiMisi_pkey" PRIMARY KEY ("id")
);
