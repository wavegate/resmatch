/*
  Warnings:

  - A unique constraint covering the columns `[acgmeCode]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "acgmeCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Program_acgmeCode_key" ON "Program"("acgmeCode");
