/*
  Warnings:

  - The `comlex2Score` column on the `InterviewInvite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `comlex2Score` column on the `InterviewRejection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "InterviewInvite" DROP COLUMN "comlex2Score",
ADD COLUMN     "comlex2Score" INTEGER;

-- AlterTable
ALTER TABLE "InterviewRejection" DROP COLUMN "comlex2Score",
ADD COLUMN     "comlex2Score" INTEGER;
