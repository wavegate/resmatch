/*
  Warnings:

  - You are about to drop the column `anonymous` on the `InterviewInvite` table. All the data in the column will be lost.
  - Made the column `public` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CityUserInput" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Dropped" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "FameShameUserInput" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "FellowshipMatch" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewImpression" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewInvite" DROP COLUMN "anonymous",
ADD COLUMN     "linked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewLogistics" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewRejection" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewWithdrawal" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "LOIResponse" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "M4InternImpression" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Malignant" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "PostIVCommunication" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "RankList" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "ScheduleDetails" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SecondLook" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Suggestion" ALTER COLUMN "linked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "public" SET NOT NULL,
ALTER COLUMN "public" SET DEFAULT false;

-- AlterTable
ALTER TABLE "XorY" ALTER COLUMN "linked" SET DEFAULT false;
