-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institutionCode" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_institutionCode_key" ON "Institution"("institutionCode");
