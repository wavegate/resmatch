/*
  Warnings:

  - You are about to drop the column `linked` on the `CityUserInput` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `Dropped` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `FameShameUserInput` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `FellowshipMatch` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `InterviewImpression` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `InterviewInvite` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `InterviewLogistics` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `InterviewRejection` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `InterviewWithdrawal` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `LOIResponse` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `M4InternImpression` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `Malignant` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `PostIVCommunication` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `RankList` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `ScheduleDetails` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `SecondLook` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `Suggestion` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `XorY` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CityUserInput" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Dropped" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "FameShameUserInput" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "FellowshipMatch" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InterviewImpression" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InterviewInvite" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InterviewLogistics" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InterviewRejection" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InterviewWithdrawal" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "LOIResponse" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "M4InternImpression" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Malignant" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "PostIVCommunication" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "RankList" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ScheduleDetails" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SecondLook" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Suggestion" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "XorY" DROP COLUMN "linked",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT true;
