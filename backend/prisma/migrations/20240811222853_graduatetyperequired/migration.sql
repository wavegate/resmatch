/*
  Warnings:

  - Made the column `graduateType` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "graduateType" SET NOT NULL,
ALTER COLUMN "graduateType" SET DEFAULT 'US';
