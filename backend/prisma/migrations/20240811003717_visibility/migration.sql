/*
  Warnings:

  - Added the required column `linked` to the `CityUserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `Dropped` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `FameShameUserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `FellowshipMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `InterviewImpression` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `InterviewLogistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `InterviewRejection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `InterviewWithdrawal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `LOIResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `M4InternImpression` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `Malignant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `PostIVCommunication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `RankList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `ScheduleDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `SecondLook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `Suggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linked` to the `XorY` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CityUserInput" ADD COLUMN     "linked" BOOLEAN NOT NULL,
ALTER COLUMN "pros" DROP NOT NULL,
ALTER COLUMN "cons" DROP NOT NULL,
ALTER COLUMN "publicTransportation" DROP NOT NULL,
ALTER COLUMN "weather" DROP NOT NULL,
ALTER COLUMN "dating" DROP NOT NULL,
ALTER COLUMN "lgbtq" DROP NOT NULL,
ALTER COLUMN "diversity" DROP NOT NULL,
ALTER COLUMN "safetyCrime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Dropped" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "FameShameUserInput" ADD COLUMN     "linked" BOOLEAN NOT NULL,
ALTER COLUMN "fame" DROP NOT NULL,
ALTER COLUMN "shame" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FellowshipMatch" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "InterviewImpression" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "InterviewInvite" ALTER COLUMN "anonymous" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InterviewLogistics" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "InterviewRejection" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "InterviewWithdrawal" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "LOIResponse" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "M4InternImpression" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Malignant" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "PostIVCommunication" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "RankList" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ScheduleDetails" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SecondLook" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Suggestion" ADD COLUMN     "linked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "public" BOOLEAN;

-- AlterTable
ALTER TABLE "XorY" ADD COLUMN     "linked" BOOLEAN NOT NULL;
