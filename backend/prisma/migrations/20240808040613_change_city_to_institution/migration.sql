/*
  Warnings:

  - You are about to drop the column `cityId` on the `Program` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_cityId_fkey";

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "cityId" INTEGER;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "cityId";

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
