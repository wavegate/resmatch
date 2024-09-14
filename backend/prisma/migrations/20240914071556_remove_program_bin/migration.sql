/*
  Warnings:

  - You are about to drop the column `binId` on the `Program` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_binId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "binId";
