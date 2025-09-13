-- CreateTable
CREATE TABLE "public"."Visi" (
    "id" SERIAL NOT NULL,
    "teks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Misi" (
    "id" SERIAL NOT NULL,
    "teks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Misi_pkey" PRIMARY KEY ("id")
);
