/*
  Warnings:

  - The `union` column on the `ScheduleDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ScheduleDetails" DROP COLUMN "union",
ADD COLUMN     "union" BOOLEAN;
