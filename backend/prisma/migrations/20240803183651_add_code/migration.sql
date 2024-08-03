/*
  Warnings:

  - Added the required column `nrmpProgramCode` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "nrmpProgramCode" TEXT NOT NULL;
