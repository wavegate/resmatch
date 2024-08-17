/*
  Warnings:

  - You are about to drop the column `dateDropped` on the `Dropped` table. All the data in the column will be lost.
  - You are about to drop the column `inviteDateTime` on the `InterviewInvite` table. All the data in the column will be lost.
  - You are about to drop the `InterviewWithdrawal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Dropped` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `InterviewInvite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InterviewWithdrawal" DROP CONSTRAINT "InterviewWithdrawal_programId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewWithdrawal" DROP CONSTRAINT "InterviewWithdrawal_userId_fkey";

-- AlterTable
ALTER TABLE "Dropped" DROP COLUMN "dateDropped",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "InterviewInvite" DROP COLUMN "inviteDateTime",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "InterviewWithdrawal";
