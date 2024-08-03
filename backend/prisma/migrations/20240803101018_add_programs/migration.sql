-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_institutionId_specialtyId_name_key" ON "Program"("institutionId", "specialtyId", "name");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
