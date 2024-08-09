/*
  Warnings:

  - Added the required column `medicalDegree` to the `RankList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RankList" ADD COLUMN     "medicalDegree" "MedicalDegree" NOT NULL,
ALTER COLUMN "doneWithInterviews" DROP NOT NULL;
