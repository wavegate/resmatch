/*
  Warnings:

  - A unique constraint covering the columns `[nrmpProgramCode]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Program_nrmpProgramCode_key" ON "Program"("nrmpProgramCode");
