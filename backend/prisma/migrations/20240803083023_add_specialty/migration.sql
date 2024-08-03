-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "specialtyCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_specialtyCode_key" ON "Specialty"("specialtyCode");
